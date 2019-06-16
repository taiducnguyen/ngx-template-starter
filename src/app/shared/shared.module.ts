import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedDirectives } from './share-directives';
import { SharedControls } from './share-controls';
import { SharedPipes } from './share-pipes';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedDirectives, SharedControls, SharedPipes, LoadingComponent],
  exports: [SharedDirectives, SharedControls, SharedPipes, LoadingComponent]
})
export class SharedModule {}
