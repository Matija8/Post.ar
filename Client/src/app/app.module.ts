import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentComponent } from './components/sent/sent.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { StarredComponent } from './components/starred/starred.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './services/auth.guard';
import { BadURLComponent } from './components/bad-url/bad-url.component';
import { ChangeThemeService } from './services/change-theme.service';
import { ComposeComponent } from './components/compose/compose.component';
import { ComposeItemComponent } from './components/compose-item/compose-item.component';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './services/mail-services/get-mail.service';

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
    ComposeItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ChangeThemeService,
    CookieService,
    GetMailService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
