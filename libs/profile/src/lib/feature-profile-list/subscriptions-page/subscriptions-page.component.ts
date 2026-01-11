import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileService } from '../../data';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-subscriptions-page',
  imports: [ProfileCardComponent, AsyncPipe, SvgIconComponent],
  templateUrl: './subscriptions-page.component.html',
  styleUrl: './subscriptions-page.component.scss',
})
export class SubscriptionsPageComponent {
  profileService = inject(ProfileService);
  subscriptions$ = this.profileService.getSubscriptions();
}
