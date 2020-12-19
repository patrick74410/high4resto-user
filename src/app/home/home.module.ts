import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogModule } from '../blog/blog.module';
import { SharedModule } from '../shared.module';
import { CarousselComponent } from './caroussel/caroussel.component';
import { HomeComponent } from './home.component';
import { IdentityCardComponent } from './identity-card/identity-card.component';

@NgModule({
    declarations: [HomeComponent, CarousselComponent, IdentityCardComponent],
    imports: [CommonModule, SharedModule, BlogModule],
})
export class HomeModule { }
