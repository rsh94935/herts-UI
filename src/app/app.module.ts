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
import { CarJourneyMapComponent } from './car-journey-map/car-journey-map.component';
import { CarJourneyLocationRatingComponent } from './car-journey-location-rating/car-journey-location-rating.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DuoButtonsComponent } from './duo-buttons/duo-buttons.component';
import { SingleButtonComponent } from './single-button/single-button.component';
import { TrainOptionsComponent } from './train-options/train-options.component';
import { TrainSelectLocationsComponent } from './train-select-locations/train-select-locations.component';
import { TrainJourneyMapComponent } from './train-journey-map/train-journey-map.component';
import { TrainJourneyLocationRatingComponent } from './train-journey-location-rating/train-journey-location-rating.component';

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
    ChecklistComponent,
    CarJourneyMapComponent,
    CarJourneyLocationRatingComponent,
    PaginatorComponent,
    DuoButtonsComponent,
    SingleButtonComponent,
    TrainOptionsComponent,
    TrainSelectLocationsComponent,
    TrainJourneyMapComponent,
    TrainJourneyLocationRatingComponent
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
      {path: 'car-journey-map', component: CarJourneyMapComponent},
      {path: 'car-journey-location-rating', component: CarJourneyLocationRatingComponent},
      {path: 'train-plan', component: TrainPlanComponent},
      {path: 'train-options', component: TrainOptionsComponent},
      {path: 'train-select-locations', component: TrainSelectLocationsComponent},
      {path: 'train-journey-map', component: TrainJourneyMapComponent},
      {path: 'train-journey-location-rating', component: TrainJourneyLocationRatingComponent},
      {path: '', redirectTo: '/splash', pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
