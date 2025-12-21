import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';

export interface ProfileState {
  profilers: Profile[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileFilters: Record<string, any>;
  page: number;
  size: number;
}

export const initialProfileState: ProfileState = {
  profilers: [],
  profileFilters: {},
  page: 1,
  size: 10,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialProfileState,

    on(profileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profilers: state.profilers.concat(payload.profiles),
    })),

    on(profileActions.filterEvents, (state, payload) => ({
      ...state,
      profilers: [],
      profileFilters: payload.filters,
      page: 1,
    })),

    on(profileActions.setPage, (state, payload) => {
      let page = payload.page;

      if (!page) page = state.page + 1;

      return {
        ...state,
        page,
      };
    })
  ),
});
