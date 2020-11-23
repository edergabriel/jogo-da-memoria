import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './pages/initial/initial.component';
import { HudComponent } from './components/hud/hud.component';
import { AdsenseModule } from 'ng2-adsense';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-5612489584188449',
      adSlot: 7956276830,
    }),
    AppModule,
    BrowserTransferStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
