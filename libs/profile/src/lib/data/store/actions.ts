import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'set page': props<{ page?: number }>(),
  },
});
