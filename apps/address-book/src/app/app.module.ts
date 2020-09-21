import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@leng2/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddressBookUiModule } from '@leng2/address-book/ui';
import { RootStoreModule } from '@leng2/address-book/data-access';
import { AddressBookFeaturesModule } from '@leng2/address-book/features';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        AddressBookUiModule,
        AddressBookFeaturesModule,
        RootStoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }
