import {NgModule} from '@angular/core';
import {
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatDatepickerModule, MatSelectModule, MatSlideToggleModule,
    MatTableModule, MatNativeDateModule, MatMenuModule

} from '@angular/material';

@NgModule({
  imports : [MatButtonModule, MatCheckboxModule , MatToolbarModule , MatSidenavModule ,
    MatIconModule , MatListModule , MatMenuModule, MatCardModule , MatFormFieldModule , MatInputModule
  , MatGridListModule , MatDatepickerModule , MatSelectModule ,
      MatSlideToggleModule , MatTableModule, MatCheckboxModule , MatNativeDateModule ],
  exports : [MatButtonModule, MatCheckboxModule , MatToolbarModule , MatSidenavModule ,
    MatIconModule , MatListModule , MatCardModule, MatMenuModule, MatFormFieldModule , MatInputModule,
    MatGridListModule , MatDatepickerModule ,
      MatSelectModule , MatSlideToggleModule , MatTableModule , MatCheckboxModule , MatNativeDateModule]
})
export class MaterialModule { }
