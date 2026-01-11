import { Component, computed, inject, signal } from '@angular/core';
import { SvgIconComponent, DndDirective } from '@tt/common-ui';
import { ProfileService } from '../../data/index';

@Component({
  selector: 'tt-avatar-upload',
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  profileService = inject(ProfileService);

  avatar: File | null = null;
  uploadedPreview = signal<string | null>(null);

  private readonly BASE_URL = 'https://icherniakov.ru/yt-course/';

  preview = computed(() => {
    // Если пользователь загрузил файл, используем его превью
    const uploaded = this.uploadedPreview();
    if (uploaded) {
      return uploaded;
    }

    // Иначе используем аватар из профиля или заглушку
    const profile = this.profileService.me();
    const avatarUrl = profile?.avatarUrl;

    if (avatarUrl) {
      return this.BASE_URL + avatarUrl;
    }

    return '/assets/images/avatar-placeholder.png';
  });

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.uploadedPreview.set(event.target?.result?.toString() || null);
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
