import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NoAgrupadosComponent } from './components/calculadoras/frecuencias/no-agrupados/no-agrupados.component';
import { AgrupadosComponent } from './components/calculadoras/frecuencias/agrupados/agrupados.component';
import { FormsModule } from '@angular/forms';
import { ArbolComponent } from './components/calculadoras/arbol/arbol.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NoAgrupadosComponent,
    AgrupadosComponent,
    ArbolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
