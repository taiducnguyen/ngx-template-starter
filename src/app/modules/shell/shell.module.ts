import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, NgbModule, RouterModule],
  declarations: [HeaderComponent, NavigationComponent, FooterComponent, ShellComponent]
})
export class ShellModule {}
