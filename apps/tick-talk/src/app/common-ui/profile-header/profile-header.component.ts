import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/profile';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  imports: [AvatarCircleComponent],
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
