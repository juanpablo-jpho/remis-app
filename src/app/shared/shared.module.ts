import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FiletourlPipe } from './pipes/filetourl.pipe';
import { ReftourlPipe } from './pipes/reftourl.pipe';

@NgModule({
  declarations: [
    FiletourlPipe,
    ReftourlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FiletourlPipe,
    ReftourlPipe
  ]
})
export class SharedModule { }
