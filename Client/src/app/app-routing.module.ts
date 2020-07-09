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
import { TrashComponent } from './components/folders/trashed/trash.component';
import { AuthFirstGuard } from './services/guards/auth-first.guard';
import { AllComponent } from './components/folders/all/all.component';
import { OpenDeletedMailItemComponent } from './components/mail-view/open-deleted-mail-item/open-deleted-mail-item.component';


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
    component: TrashComponent,
    data: {folderName: 'trash'}
  },
  {
    path: 'trash/:msgId',
    canActivate: [FolderGuard],
    component: OpenDeletedMailItemComponent,
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
    data: {folderName: 'starred'}
  },
  { path: 'starred/:msgId',
    canActivate: [FolderGuard],
    component: OpenMailItemComponent,
    data: {folderName: 'starred'}
  },

  { path: 'all',
    canActivate: [FolderGuard],
    component: AllComponent,
    data: {folderName: 'all'}
  },
  { path: 'all/:msgId',
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
