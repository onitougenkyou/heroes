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
import { PlayerService } from './services/player.service';
import { MonsterService } from './services/monster.service';

import { ClassAddFormComponent } from './class-add-form/class-add-form.component';
import { HomeComponent } from './home/home.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { MonsterAddFormComponent } from './monster-add-form/monster-add-form.component';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'player/add', component: ClassAddFormComponent },
  { path: 'player/:id', component: ClassDetailsComponent },
  { path: 'players', component: PersoClassListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'monster/add', component: MonsterAddFormComponent },
  { path: 'monsters', component: MonsterListComponent },
  { path: 'monster/:id', component: MonsterDetailsComponent }
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
    RegisterComponent,
    AdministrationComponent,
    MonsterAddFormComponent,
    MonsterListComponent,
    MonsterDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClassService, AuthService, PlayerService, MonsterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
