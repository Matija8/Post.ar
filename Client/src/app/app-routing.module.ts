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
import { FolderGuard } from './services/guards/folder.guard';


const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    redirectTo: '/inbox',
    pathMatch: 'full'
  },
  { path: 'inbox',
    canActivate: [FolderGuard],
    component: InboxComponent,
    data: {folderName: 'inbox'}
  },
  { path: 'sent',
    canActivate: [FolderGuard],
    component: SentComponent,
    data: {folderName: 'sent'}
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
  { path: 'drafts/:msgId',
    canActivate: [AuthGuard],
    component: DraftsComponent
  },
  { path: ':folder/:msgId',
    canActivate: [AuthGuard],
    component: OpenMailItemComponent
  },
  { path: '**', component: BadURLComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
