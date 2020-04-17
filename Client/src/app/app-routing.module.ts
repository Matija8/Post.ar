import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InboxComponent } from './components/folders/inbox/inbox.component';
import { SentComponent } from './components/folders/sent/sent.component';
import { StarredComponent } from './components/folders/starred/starred.component';
import { DraftsComponent } from './components/folders/drafts/drafts.component';
import { BadURLComponent } from './components/bad-url/bad-url.component';
import { OpenMailItemComponent } from './components/mail-view/open-mail-item/open-mail-item.component';

import { AuthGuard } from './services/guards/auth.guard';
import { LoggedInGuard } from './services/guards/logged-in.guard';


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
  { path: 'inbox/:id',
    canActivate: [AuthGuard],
    component: OpenMailItemComponent
  },
  { path: 'sent',
    canActivate: [AuthGuard],
    component: SentComponent
  },
  { path: 'sent/:id',
    canActivate: [AuthGuard],
    component: OpenMailItemComponent
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
