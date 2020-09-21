import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RootStoreState, UserAddressStoreSelectors } from '@leng2/address-book/data-access';

import { UserAddress } from '@leng2/address-book/utilities';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['index', 'name', 'address', 'todos'];
    dataSource: MatTableDataSource<UserAddress>;
    isLargeScreen: Boolean;
    private subscription1: Subscription;
    private subscription2: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private cdRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private store$: Store<RootStoreState.RootState>, private router: Router) { }

    ngAfterViewInit() {
        this.cdRef.detectChanges(); //eliminate error: Expression has changed after it was checked
        this.subscription1 = this.store$.select(
            UserAddressStoreSelectors.selectAllUserAddresses
        ).subscribe(result => {
            // console.log(result); //result is not wrapped with entity id!
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
        });

        this.subscription2 = this.breakpointObserver.observe([
            '(min-width: 600px)'
        ]).subscribe(result => {
            this.isLargeScreen = result.matches;
            if (result.matches) {
                this.dataSource.paginator = this.paginator;
            } else {
                this.dataSource.paginator = null;
            }
        }); //Observe if screen is more than 600px. Add pagination as true and remove as false on mobile view.

        this.dataSource.filterPredicate = (data: UserAddress, filterValue: string) => (
            data.lastname.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.firstname.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.city.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.street.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.postcode.trim().toLowerCase().indexOf(filterValue) !== -1
        )//custom filtering
    }
    //Paginator is marked with @ViewChild and thus will not be loaded until ngAfterViewInit() is called. 
    //The logic must be placed in ngAfterViewInit and property paginator is set after subscribing data retrieved from store. 
    //OnInit runs before AfterViewInit. Therefore OnInit shall not be used here in this component. 
    //But this gives async problem (datasource is undefined while table is being built up), getting error: Expression has changed after it was checked.
    //Use ChangeDetectorRef Service to detect new changes.
    //When a view uses the OnPush (checkOnce) change detection strategy, explicitly marks the view as changed so that it can be checked again.

    search(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    redirectToTodos(id: string) {
        this.router.navigate([`person/${id}/todos`]);
        // alternative way instead of using directive: (click)="redirectToTodos(element.id); $event.stopPropagation()"
    }

    ngOnDestroy() {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }
}
