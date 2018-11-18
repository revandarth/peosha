import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import {  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,MatChipsModule,MatDatepickerModule,
          MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,
          MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,MatRadioModule,MatRippleModule,
          MatSelectModule, MatSidenavModule,MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule, MatTableModule,
          MatTabsModule, MatToolbarModule, MatTooltipModule,MatFormFieldModule } from '@angular/material';
import { UserService } from "./../services/user/user.service";
import { HttpService } from "./../services/http.service";
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,FlexLayoutModule,MatAutocompleteModule,
     MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatExpansionModule,
     MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,
     MatRadioModule, MatRippleModule,MatSelectModule, MatSidenavModule,MatSliderModule, MatSlideToggleModule,
     MatSnackBarModule, MatSortModule, MatTableModule,MatTabsModule, MatToolbarModule, MatTooltipModule,MatFormFieldModule
  ],exports: [
    CommonModule,FlexLayoutModule,MatAutocompleteModule,FormsModule,ReactiveFormsModule,MatButtonModule,
    MatButtonToggleModule,MatCardModule,MatCheckboxModule,MatChipsModule,MatDatepickerModule,
    MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,
    MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule,MatSelectModule, MatSidenavModule,MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatTableModule,MatTabsModule, MatToolbarModule, MatTooltipModule,MatFormFieldModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
     return {
      ngModule: SharedModule,
      providers: [CookieService,HttpService,UserService]
    };
  }
}
