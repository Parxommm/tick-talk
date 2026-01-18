import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
import { GlobalStoreService, Pageble } from '@tt/shared';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);
  #globalStore = inject(GlobalStoreService);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.#globalStore.me.set(res);
      })
    );
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getSubscriptionsShortList(subsAmount = 5) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscriptions/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getSubscriptions() {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscriptions/`)
      .pipe(map((res) => res.items));
  }

  getAccountById(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post(`${this.baseApiUrl}account/upload_image`, fd);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      { params }
    );
  }
}
