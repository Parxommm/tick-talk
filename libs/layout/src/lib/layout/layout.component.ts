import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SvgIconComponent } from '@tt/common-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, SidebarComponent, SvgIconComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSidebarOpen = signal<boolean>(window.innerWidth > 768);

  constructor() {
    // Слушаем событие закрытия меню из sidebar
    window.addEventListener('closeSidebar', () => {
      if (window.innerWidth <= 768) {
        this.closeSidebar();
      }
    });

    // Обновляем состояние при изменении размера окна
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.isSidebarOpen.set(true);
      } else if (window.innerWidth <= 768 && this.isSidebarOpen()) {
        // Закрываем меню при переходе с десктопа на мобильный
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
