import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule,MatTabsModule,MatInputModule,MatIconModule,MatToolbarModule,MatFormFieldModule,MatChipsModule,
         MatSliderModule,MatButtonModule,MatProgressBarModule,MatListModule,MatMenuModule} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatSliderModule,
    MatMenuModule,
    MatProgressBarModule,
    HttpClientModule
   ],
  exports: [HeaderComponent,RouterModule],
  providers: [CookieService]
})
export class CoreModule { }
