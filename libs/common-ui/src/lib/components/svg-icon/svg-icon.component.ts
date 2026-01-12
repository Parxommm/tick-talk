import { Component, Input } from '@angular/core';
import { getAssetPath } from '@tt/shared';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [],
})
export class SvgIconComponent {
  @Input() icon = '';
  get href() {
    // Use relative path - Angular will automatically prepend baseHref
    return `${getAssetPath(`svg/${this.icon}.svg`)}#${this.icon}`;
  }
}
