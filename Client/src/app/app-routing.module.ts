import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { BadURLComponent } from './components/bad-url/bad-url.component';

import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: '/inbox',
    pathMatch: 'full'
  },
  { path: 'inbox',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  { path: 'sent',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  { path: 'starred',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  { path: 'drafts',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // path: inbox/:id i isto za ostale
  { path: '**', component: BadURLComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
