import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {
  profileActions,
  selectFilteredProfiles,
  selectProfileLoading,
} from '../../data';
import { Store } from '@ngrx/store';
import { InfiniteScrollTriggerComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
    SvgIconComponent,
    CommonModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  loading = this.store.selectSignal(selectProfileLoading);

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }
}
