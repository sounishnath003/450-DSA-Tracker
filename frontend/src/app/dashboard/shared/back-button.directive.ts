import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[backButton]',
})
export class BackButtonDirective {
  constructor(private location: Location) {}

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
