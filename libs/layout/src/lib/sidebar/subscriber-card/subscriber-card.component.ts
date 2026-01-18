import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '@tt/interfaces/profile';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'tt-subscriber-card',
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
