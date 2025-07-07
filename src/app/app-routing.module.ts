import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},  
  {path:'register', component: RegistrationComponent},
  {
    canActivate:[authGuard],
    path:'admin',loadChildren: ()=> import('./admin/admin.module').then((m)=> m.AdminModule)
  },
  {
    canActivate:[authGuard],
    path:'blog',loadChildren: ()=> import('./blog-module/blog-module.module').then((m)=> m.BlogModuleModule)
  },
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
