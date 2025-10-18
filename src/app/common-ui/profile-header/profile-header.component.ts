import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  imports: [AvatarCircleComponent],
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
