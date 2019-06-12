import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { SharedDirectives } from './share-directives';
import { SharedControls } from './share-controls';
import { SharedPipes } from './share-pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedDirectives, SharedControls, SharedPipes, LoaderComponent],
  exports: [SharedDirectives, SharedControls, SharedPipes, LoaderComponent]
})
export class SharedModule {}
