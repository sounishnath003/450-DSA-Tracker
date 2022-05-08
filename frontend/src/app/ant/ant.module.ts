import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

const modules = [CommonModule, NzButtonModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class AntModule {}
