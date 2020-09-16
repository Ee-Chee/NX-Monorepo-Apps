import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { SharedModule } from '@leng2/shared';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [HeaderComponent, LayoutComponent, SideNavigationComponent],
    exports: [HeaderComponent, LayoutComponent, SideNavigationComponent],
})
export class AddressBookUiModule { }
// if shared module is exported here, then it can be removed from core module.
