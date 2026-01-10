import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';

export interface ProfileState {
  profilers: Profile[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileFilters: Record<string, any>;
  page: number;
  size: number;
  loading: boolean;
}

export const initialProfileState: ProfileState = {
  profilers: [],
  profileFilters: {},
  page: 1,
  size: 10,
  loading: false,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialProfileState,

    on(profileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profilers: state.profilers.concat(payload.profiles),
      loading: false,
    })),

    on(profileActions.filterEvents, (state, payload) => ({
      ...state,
      profilers: [],
      profileFilters: payload.filters,
      page: 1,
      loading: true,
    })),

    on(profileActions.setPage, (state, payload) => {
      let page = payload.page;

      if (!page) page = state.page + 1;

      return {
        ...state,
        page,
        loading: true,
      };
    })
  ),
});
