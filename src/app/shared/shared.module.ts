import { NgModule } from '@angular/core';
import { ToolbarTitleComponent } from './components/toolbar-title/toolbar-title.component';

@NgModule({
  declarations: [
    ToolbarTitleComponent
  ],
  exports: [
    ToolbarTitleComponent
  ]
})
export class SharedModule { }
