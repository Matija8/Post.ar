import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentComponent } from './components/sent/sent.component';
import { StarredComponent } from './components/starred/starred.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { BadURLComponent } from './components/bad-url/bad-url.component';

import { AuthGuard } from './services/auth.guard';
import { LoggedInGuard } from './services/logged-in.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: '/inbox',
    pathMatch: 'full'
  },
  { path: 'inbox',
    canActivate: [AuthGuard],
    component: InboxComponent
  },
  { path: 'sent',
    canActivate: [AuthGuard],
    component: SentComponent
  },
  { path: 'starred',
    canActivate: [AuthGuard],
    component: StarredComponent
  },
  { path: 'drafts',
    canActivate: [AuthGuard],
    component: DraftsComponent
  },
  { path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  // path: inbox/:id i isto za ostale
  { path: '**', component: BadURLComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
