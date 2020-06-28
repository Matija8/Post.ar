// Angular.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components.
import { AppComponent } from './components/app-root/app.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { MainComponent } from './components/ui/main/main.component';
import { MailListComponent } from './components/mail-view/mail-list/mail-list.component';
import { MailItemComponent } from './components/mail-view/mail-item/mail-item.component';
import { OpenMailItemComponent } from './components/mail-view/open-mail-item/open-mail-item.component';
import { InboxComponent } from './components/folders/inbox/inbox.component';
import { SentComponent } from './components/folders/sent/sent.component';
import { StarredComponent } from './components/folders/starred/starred.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BadURLComponent } from './components/bad-url/bad-url.component';
import { ComposeComponent } from './components/compose/compose-controller/compose.component';
import { ComposeItemComponent } from './components/compose/compose-item/compose-item.component';
import { TrashComponent } from './components/folders/trashed/trash.component';
import { TrashItemComponent } from './components/folders/trashed/trashed-item/trash-item.component';
import { DraftsComponent } from './components/folders/drafts/drafts.component';
import { DraftItemComponent } from './components/folders/drafts/draft-item/draft-item.component';
import { AllComponent } from './components/folders/all/all.component';
import { ListTipComponent } from './components/mail-view/list-tip/list-tip.component';

// Mail services.
import { AuthService } from './services/mail-services/auth.service';
import { GetMailService } from './services/mail-services/get-mail.service';
import { TagMailService } from './services/mail-services/tag-mail.service';
import { DraftMailService } from './services/mail-services/draft-mail.service';

// Ui services.
import { ChangeThemeService } from './services/ui-services/change-theme.service';
import { OpenComposeService } from './services/ui-services/open-compose.service';

// Other services.
import { CookieService } from 'ngx-cookie-service';

// Guards.
import { LoggedInGuard } from './services/guards/logged-in.guard';
import { FolderGuard } from './services/guards/folder.guard';
import { AuthFirstGuard } from './services/guards/auth-first.guard';

// Angular material.
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectedIconComponent } from './components/mail-view/selected-icon/selected-icon.component';



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
    OpenMailItemComponent,
    TrashComponent,
    TrashItemComponent,
    DraftItemComponent,
    AllComponent,
    ListTipComponent,
    SelectedIconComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  providers: [
    AuthService,
    GetMailService,
    TagMailService,
    DraftMailService,
    ChangeThemeService,
    OpenComposeService,
    CookieService,
    LoggedInGuard,
    FolderGuard,
    AuthFirstGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
