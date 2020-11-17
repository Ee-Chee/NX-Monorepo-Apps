import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import moment from 'moment'; //make date formatting easier
import { RootStoreState, UserAddressStoreActions, UserAddressStoreSelectors } from '@leng2/address-book/data-access';

import { UserAddress, postcodesData, genders, validationMessages } from '@leng2/address-book/utilities';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit, OnDestroy {
    minDate: Date;
    maxDate: Date;
    userDetailsForm: FormGroup;
    addressFormGroup: FormGroup;
    cities: string[];
    // disableCityControl: boolean = true;
    filteredPostcodes: Observable<string[]>;
    mappedFormObject: UserAddress;
    toggleUpdateDelete = false;

    genders = genders;
    validationMessages = validationMessages;

    private subscription: Subscription;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private store$: Store<RootStoreState.RootState>) {
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 120, 0, 1);
        this.maxDate = new Date(currentYear - 1, 11, 31);
    }

    ngOnInit(): void {
        this.createForm(); //form must be created first
        if (this.route.snapshot.paramMap.get('id')) {
            this.subscription = this.store$.select(
                UserAddressStoreSelectors.selectUserAddressById(this.route.snapshot.paramMap.get('id'))
            ).subscribe(result => {
                if (result !== null) {
                    const splitBirthdayInt = result.birthday.split(".").map(elem => parseInt(elem));
                    this.userDetailsForm.patchValue({
                        firstname: result.firstname,
                        lastname: result.lastname,
                        gender: result.gender,
                        birthday: moment(new Date(splitBirthdayInt[2], splitBirthdayInt[1] - 1, splitBirthdayInt[0])),
                        address: {
                            street: result.address.street,
                            number: result.address.number,
                            postcode: result.address.postcode,
                            city: result.address.city
                        }
                    });
                    this.toggleUpdateDelete = true;
                }
            });
        };

        this.filteredPostcodes = this.addressFormGroup.get('postcode').valueChanges.pipe(
            startWith(''),
            map(value => value.length < 2 ? [] : this.filter(value))
        );
        //no options shown on empty input/on focus 
        //kicks in only if 2+ characters typed
        //filtering always starts at first position, index 0 of the string.
        //limits to 10 different results, no duplicates
    }

    createForm() {
        this.addressFormGroup = new FormGroup({
            street: new FormControl('', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(5),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])),
            number: new FormControl('', Validators.compose([
                Validators.pattern('^[1-9][0-9]*$'),
                Validators.required
            ])),
            postcode: new FormControl('', Validators.compose([
                Validators.maxLength(5),
                Validators.minLength(5),
                Validators.pattern('^[0-9]+$'),
                Validators.required,
                this.postcodeValidator
            ])),
            city: new FormControl({ value: '', disabled: true }, Validators.required),
        });
        // or use fb service

        this.userDetailsForm = this.fb.group({
            firstname: ['', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(2),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])],
            lastname: ['', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(2),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])],
            gender: ['Other', Validators.required],
            birthday: ['', Validators.required],
            address: this.addressFormGroup
        })
    }

    filter(value: string): string[] {
        return (postcodesData as any).filter(obj =>
            obj.zipcode.indexOf(value) == 0
        ).map(obj => obj.zipcode).reduce(
            (unique, zipcode) => (unique.includes(zipcode) ? unique : [...unique, zipcode]), [])
            .slice(0, 10)
    }

    postcodeValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
        // this.userDetailsForm.get('address').get('city').disable();
        if (control.value.length == 5) {
            this.cities = (postcodesData as any).filter(obj =>
                obj.zipcode == control.value
            ).map(obj => obj.place); //where cities are set

            if (this.cities.length == 0) {
                return { notFound: true }//customize validation
            } else {
                this.userDetailsForm.get('address').get('city').enable();
                return null;
            }
        }
    }
    // with AbstractControl, formcontrol of postcode is passed

    onSubmitUserDetails(formObject) {
        this.mappedFormObject = {
            firstname: formObject.firstname,
            lastname: formObject.lastname,
            gender: formObject.gender,
            birthday: formObject.birthday.format('DD.MM.YYYY'),
            address: formObject.address
        }; //Birthday has Moment interface. Shall be converted to string using format method

        if (this.toggleUpdateDelete) {
            this.mappedFormObject.id = this.route.snapshot.paramMap.get('id');
            this.store$.dispatch(
                new UserAddressStoreActions.UpdateInfoAction({ item: this.mappedFormObject })
            );
        } else {
            this.store$.dispatch(
                new UserAddressStoreActions.CreateUserAction({ item: this.mappedFormObject })
            );
        }
    }

    onCancel() {
        this.router.navigate(['']);
    }

    onDelete() {
        this.store$.dispatch(
            new UserAddressStoreActions.DeleteUserAction({ id: this.route.snapshot.paramMap.get('id') })
        );
    }

    ngOnDestroy() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.subscription.unsubscribe();
        }
    }
}
