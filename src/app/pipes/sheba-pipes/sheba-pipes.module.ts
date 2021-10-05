import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HyphenStripPipe } from './hyphen-strip.pipe';
import {FilterPipe} from "./filter.pipe";
import { StripperPipe } from './stripper.pipe';

@NgModule({
  declarations: [HyphenStripPipe,FilterPipe, StripperPipe],
  imports: [
    CommonModule
  ],
    exports: [HyphenStripPipe, FilterPipe, StripperPipe]
})
export class ShebaPipesModule { }
