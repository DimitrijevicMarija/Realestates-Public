import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AddFromJSONComponent } from './add-from-json/add-from-json.component';
import { AddMicrolocationComponent } from './add-microlocation/add-microlocation.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { AdminComponent } from './admin/admin.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { ChangeDataComponent } from './change-data/change-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditRealestateComponent } from './edit-realestate/edit-realestate.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MicrolocationsComponent } from './microlocations/microlocations.component';
import { MyRealestatesComponent } from './my-realestates/my-realestates.component';
import { RealestateDetailsComponent } from './realestate-details/realestate-details.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'changePassword', component:ChangePasswordComponent},
  {path:'admin', component:AdminComponent},
  {path: 'addAgency', component: AddAgencyComponent},
  {path: 'editUser', component: EditUserComponent},
  {path: 'addRealestate', component: AddRealEstateComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'realestateDetails', component: RealestateDetailsComponent},
  {path: 'search', component: SearchComponent}, 
  {path: 'favorites', component: FavoritesComponent},
  {path: 'advancedSearch', component: AdvancedSearchComponent},
  {path: 'myRealestates', component: MyRealestatesComponent},
  {path: 'editRealestate', component: EditRealestateComponent},
  {path: 'changeData', component: ChangeDataComponent},
  {path: 'addFromJSON', component: AddFromJSONComponent},
  {path: 'microlocations', component: MicrolocationsComponent},
  {path: 'addMicrolocation', component: AddMicrolocationComponent},

  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
