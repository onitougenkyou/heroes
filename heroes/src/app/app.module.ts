import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PlayerService } from './player.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlayerFormComponent } from './player-form/player-form.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
