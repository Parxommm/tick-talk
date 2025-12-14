import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';

export interface ProfileState {
  profilers: Profile[];
  profileFilters: Record<string, any>;
}

export const initialProfileState: ProfileState = {
  profilers: [],
  profileFilters: {},
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialProfileState,
    on(profileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profilers: payload.profiles,
    }))
  ),
});
