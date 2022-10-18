import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxCaptchaModule} from  '@binssoft/ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent, DialogDelete } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { EditUserComponent } from './edit-user/edit-user.component'

import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatDialogModule } from '@angular/material/dialog';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RealestateDetailsComponent } from './realestate-details/realestate-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { MyRealestatesComponent } from './my-realestates/my-realestates.component';
import { EditRealestateComponent } from './edit-realestate/edit-realestate.component';
import { ChangeDataComponent } from './change-data/change-data.component';
import { AddFromJSONComponent } from './add-from-json/add-from-json.component';
import {MatStepperModule} from '@angular/material/stepper';

import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule, } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MicrolocationsComponent } from './microlocations/microlocations.component';
import { AddMicrolocationComponent } from './add-microlocation/add-microlocation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    AdminComponent,
    AddAgencyComponent,
    EditUserComponent,
    DialogDelete,
    AddRealEstateComponent,
    HomepageComponent,
    MenuComponent,
    RealestateDetailsComponent,
    SearchComponent,
    FavoritesComponent,
    AdvancedSearchComponent,
    MyRealestatesComponent,
    EditRealestateComponent,
    ChangeDataComponent,
    AddFromJSONComponent,
    MicrolocationsComponent,
    AddMicrolocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatDatepickerModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
