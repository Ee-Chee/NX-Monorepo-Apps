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
    private selectAllUserAddressesSub: Subscription;
    private breakPointObserverSub: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private cdRef: ChangeDetectorRef,
        private breakpointObserver: BreakpointObserver,
        private store$: Store<RootStoreState.RootState>,
        private router: Router) { }

    ngAfterViewInit() {
        this.selectAllUserAddressesSub = this.store$.select(
            UserAddressStoreSelectors.selectAllUserAddresses
        ).subscribe(result => {
            // console.log(result); //result is not wrapped with entity id!
            this.dataSource = new MatTableDataSource(result);
            this.breakPointObserverSub = this.breakpointObserver.observe([
                '(min-width: 600px)'
            ]).subscribe(breakpoint => {
                this.isLargeScreen = breakpoint.matches;
                if (this.isLargeScreen) {
                    this.dataSource.paginator = this.paginator;
                } else {
                    this.cdRef.detectChanges(); //rerender as data is retrieved in dataSource
                    this.dataSource.paginator = null;
                }
            });
            //Observe if screen is more than 600px. Add pagination as true and remove as false in mobile view.
            //Responsive as resizing browser or accessing the page directly in mobile view
        });

        this.dataSource.filterPredicate = (data: UserAddress, filterValue: string) => (
            data.lastname.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.firstname.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.city.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.street.trim().toLowerCase().indexOf(filterValue) !== -1 ||
            data.address.postcode.trim().toLowerCase().indexOf(filterValue) !== -1
        )//custom filtering
    }
    //Paginator is marked with @ViewChild
    //Thus, the logic must be placed in ngAfterViewInit(after child views are initialized) and property paginator is set after subscribing data retrieved from store.
    //But this gives async problem (datasource is undefined while table is being built up), getting error: Expression has changed after it was checked.
    //Use ChangeDetectorRef Service to detect new changes made on Paginator
    //When a view uses the OnPush (checkOnce) change detection strategy, explicitly marks the view as changed so that it can be checked again.
    //Since only Paginator is marked with @ViewChild, Angular will only rerender when the changes made on Paginator (user changes the page size for example or component here equals it to null)
    //OnInit runs before AfterViewInit. Therefore OnInit shall not be used here in this component. AfterViewInit called once after Angular initializes the component's views and child views.
    //Two observables here are observing, piping new values as changes made but they do not make Angular rerenders!

    search(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // redirectToTodos(id: string) {
    //     this.router.navigate([`person/${id}/todos`]);
    //     // alternative way instead of using directive: (click)="redirectToTodos(element.id); $event.stopPropagation()"
    // }

    ngOnDestroy() {
        this.selectAllUserAddressesSub.unsubscribe();
        this.breakPointObserverSub.unsubscribe();
    }
}
