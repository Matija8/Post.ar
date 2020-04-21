import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app-root/app.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { MainComponent } from './components/ui/main/main.component';
import { MailListComponent } from './components/mail-view/mail-list/mail-list.component';
import { MailItemComponent } from './components/mail-view/mail-item/mail-item.component';
import { OpenMailItemComponent } from './components/mail-view/open-mail-item/open-mail-item.component';
import { InboxComponent } from './components/folders/inbox/inbox.component';
import { SentComponent } from './components/folders/sent/sent.component';
import { DraftsComponent } from './components/folders/drafts/drafts.component';
import { StarredComponent } from './components/folders/starred/starred.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BadURLComponent } from './components/bad-url/bad-url.component';
import { ComposeComponent } from './components/compose/compose-controller/compose.component';
import { ComposeItemComponent } from './components/compose/compose-item/compose-item.component';

import { AuthService } from './services/mail-services/auth.service';
import { GetMailService } from './services/mail-services/get-mail.service';
import { ChangeThemeService } from './services/ui-services/change-theme.service';

import { AuthGuard } from './services/guards/auth.guard';
import { LoggedInGuard } from './services/guards/logged-in.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MailListComponent,
    MailItemComponent,
    InboxComponent,
    SentComponent,
    DraftsComponent,
    StarredComponent,
    LoginComponent,
    RegisterComponent,
    ComposeComponent,
    SidebarComponent,
    MainComponent,
    BadURLComponent,
    ComposeItemComponent,
    OpenMailItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    GetMailService,
    ChangeThemeService,
    AuthGuard,
    LoggedInGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
