import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarousselComponent } from './caroussel/caroussel.component';
import { IdentityCardComponent } from './identity-card/identity-card.component';



@NgModule({
  declarations: [HomeComponent, CarousselComponent, IdentityCardComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
