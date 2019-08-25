import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './modules/home/home.module';
import { AboutModule } from './modules/about/about.module';
import { LoginModule } from './modules/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { StorageKey } from './shared/models/storage-key/storage-key';
import { NoContentComponent } from './404/not-found.component';
import { AccessDeniedComponent } from './403/access-denied.component';
import { ShellModule } from './modules/shell/shell.module';
import { MaterialConfirmDialogComponent, SnackBarComponent } from './shared/controls';
import { MaterialModule } from './shared/material.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
        tokenGetter: GetToken
      }
    }),
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    ShellModule,
    MaterialModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    NoContentComponent,
    AccessDeniedComponent,
    MaterialConfirmDialogComponent,
    SnackBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MaterialConfirmDialogComponent, SnackBarComponent]
})
export class AppModule {}

export function GetToken() {
  return localStorage.getItem(StorageKey.Token);
}
