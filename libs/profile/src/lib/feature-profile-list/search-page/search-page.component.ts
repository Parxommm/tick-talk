import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { profileActions, selectFilteredProfiles } from '../../data';
import { Store } from '@ngrx/store';
import { InfiniteScrollTriggerComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }
}
