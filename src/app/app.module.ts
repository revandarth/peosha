import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import 'hammerjs/hammer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    LazyLoadModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
