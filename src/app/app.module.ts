import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SignupComponent } from './signup/signup.component';
import { SplashComponent } from './splash/splash.component';
import { TrainPlanComponent } from './train-plan/train-plan.component';
import { CarPlanComponent } from './car-plan/car-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PreferencesComponent,
    SplashComponent,
    TrainPlanComponent,
    CarPlanComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'splash', component: SplashComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'preferences', component: PreferencesComponent},
      {path: 'car-plan', component: CarPlanComponent},
      {path: 'train-plan', component: TrainPlanComponent},
      {path: '', redirectTo: '/splash', pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
