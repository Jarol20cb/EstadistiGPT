import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoAgrupadosComponent } from './components/calculadoras/frecuencias/no-agrupados/no-agrupados.component';
import { ArbolComponent } from './components/calculadoras/arbol/arbol.component';
import { AgrupadosComponent } from './components/calculadoras/frecuencias/agrupados/agrupados.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'frecuencias-agrupadas', component: NoAgrupadosComponent },
  { path: 'frecuencias-no-agrupadas', component: AgrupadosComponent },
  { path: 'diagrama-arbol', component: ArbolComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
