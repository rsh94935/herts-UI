import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SignupComponent } from './signup/signup.component';
import { SplashComponent } from './splash/splash.component';
import { TrainPlanComponent } from './train-plan/train-plan.component';
import { CarPlanComponent } from './car-plan/car-plan.component';
import { CarOptionsComponent } from './car-options/car-options.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { StatsComponent } from './stats/stats.component';
import { CarSelectLocationsComponent } from './car-select-locations/car-select-locations.component';
import { ChecklistComponent } from './checklist/checklist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PreferencesComponent,
    SplashComponent,
    TrainPlanComponent,
    CarPlanComponent,
    CarOptionsComponent,
    DropdownComponent,
    StatsComponent,
    CarSelectLocationsComponent,
    ChecklistComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'splash', component: SplashComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'preferences', component: PreferencesComponent},
      {path: 'car-plan', component: CarPlanComponent},
      {path: 'car-options', component: CarOptionsComponent},
      {path: 'car-select-locations', component: CarSelectLocationsComponent},
      {path: 'train-plan', component: TrainPlanComponent},
      {path: '', redirectTo: '/splash', pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
