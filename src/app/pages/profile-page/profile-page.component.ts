import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  activatedRoute = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  profile$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccountById(id);
    })
  );
}
