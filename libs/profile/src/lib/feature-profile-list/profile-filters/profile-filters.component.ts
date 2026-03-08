import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { profileActions, ProfileService } from '../../data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((formValue) =>
        this.store.dispatch(profileActions.filterEvents({ filters: formValue }))
      );
  }

  ngOnInit(): void {
    const stack = this.activatedRoute.snapshot.queryParamMap.get('stack');
    if (stack) {
      this.searchForm.patchValue({ stack }, { emitEvent: false });
    }
    this.store.dispatch(
      profileActions.filterEvents({
        filters: this.searchForm.value as { firstName: string; lastName: string; stack: string },
      })
    );
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
