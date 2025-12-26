import { Component, inject, OnInit, signal, input, HostBinding } from '@angular/core';
import { SvgIconComponent, ImgUrlPipe } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '@tt/profile';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@tt/auth';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'tt-sidebar',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  globalStore = inject(GlobalStoreService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  isOpen = input<boolean>(true);

  @HostBinding('class.open')
  get isOpenClass() {
    return this.isOpen();
  }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  logout() {
    // Очищаем данные пользователя
    this.profileService.me.set(null);
    this.profileService.filteredProfiles.set([]);
    this.globalStore.me.set(null);

    // Выполняем выход (очистка токенов, cookies и перенаправление на login)
    this.authService.logout();
  }

  closeOnMobile() {
    // Закрываем меню на мобильных устройствах при клике на ссылку
    if (window.innerWidth <= 768 && this.isOpen()) {
      // Используем событие для закрытия через родительский компонент
      const event = new CustomEvent('closeSidebar');
      window.dispatchEvent(event);
    }
  }
}
