import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentComponent } from './components/sent/sent.component';
import { StarredComponent } from './components/starred/starred.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'inbox', component: InboxComponent },
  { path: 'sent', component: SentComponent },
  { path: 'starred', component: StarredComponent },
  { path: 'drafts', component: DraftsComponent },
  // path: inbox/:id i isto za ostale
  {
    path: '',
    redirectTo: '/inbox',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
