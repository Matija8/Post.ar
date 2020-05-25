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

import { LoggedInGuard } from './services/guards/logged-in.guard';
import { FolderGuard } from './services/guards/folder.guard';
import { TrashedComponent } from './components/folders/trashed/trashed.component';
import { AuthFirstGuard } from './services/guards/auth-first.guard';


const routes: Routes = [
  { path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent
  },
  { path: 'register',
    canActivate: [AuthFirstGuard],
    component: RegisterComponent
  },
  { path: '',
    redirectTo: '/inbox',
    pathMatch: 'full'
  },

  // 'Regular' Folders
  { path: 'inbox',
    canActivate: [FolderGuard],
    component: InboxComponent,
    data: {folderName: 'inbox'}
  },
  { path: 'inbox/:msgId',
    canActivate: [FolderGuard],
    component: OpenMailItemComponent,
    data: {folderName: 'inbox'}
  },

  { path: 'sent',
    canActivate: [FolderGuard],
    component: SentComponent,
    data: {folderName: 'sent'}
  },
  { path: 'sent/:msgId',
    canActivate: [FolderGuard],
    component: OpenMailItemComponent,
    data: {folderName: 'sent'}
  },

  {
    path: 'trash',
    canActivate: [FolderGuard],
    component: TrashedComponent,
    data: {folderName: 'trash'}
  },
  {
    path: 'trash/:msgId',
    canActivate: [FolderGuard],
    component: OpenMailItemComponent,
    data: {folderName: 'trash'}
  },

  { path: 'drafts',
    canActivate: [FolderGuard],
    component: DraftsComponent,
    data: {folderName: 'drafts'}
  },

// 'Aggregate' Folders

  { path: 'starred',
    canActivate: [FolderGuard],
    component: StarredComponent,
    data: {folderName: 'all'}
  },
  { path: 'starred/:msgId',
    canActivate: [FolderGuard],
    component: OpenMailItemComponent,
    data: {folderName: 'all'}
  },

  // Other
  { path: '**', component: BadURLComponent,
    canActivate: [AuthFirstGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
