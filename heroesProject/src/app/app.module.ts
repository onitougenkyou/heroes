import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChoiceComponent } from './choice/choice.component';
import { PersoClassListComponent } from './perso-class-list/perso-class-list.component';

import { ClassService } from './services/class.service';
import { AuthService } from './services/auth.service';

import { ClassAddFormComponent } from './class-add-form/class-add-form.component';
import { HomeComponent } from './home/home.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'player/add', component: ClassAddFormComponent },
  { path: 'players/:id', component: ClassDetailsComponent },
  { path: 'player', component: PersoClassListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    PersoClassListComponent,
    ClassAddFormComponent,
    HomeComponent,
    ClassDetailsComponent,
    AboutComponent,
    AuthenticationComponent,
    ProfilComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClassService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
