import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  effect,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostService } from '../../data/services/post.service';
import { firstValueFrom } from 'rxjs';
import { PostComponent } from '../posts/post.component';

@Component({
  selector: 'tt-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  profileId = input<number>();
  isMyProfile = input<boolean>(false);

  feed = this.postService.posts;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    effect(() => {
      const id = this.profileId();
      if (id) {
        firstValueFrom(this.postService.fetchPostsByProfileId(id));
      } else {
        firstValueFrom(this.postService.fetchPosts());
      }
    });
    effect(() => {
      this.feed();
      this.resizeFeed();
    });
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const host = this.hostElement.nativeElement as HTMLElement;
    const hasPosts = this.feed().length > 0;

    if (hasPosts) {
      const { top } = host.getBoundingClientRect();
      const height = window.innerHeight - top - 24 - 24;
      host.classList.remove('post-feed--empty');
      this.r2.setStyle(host, 'height', `${height}px`);
    } else {
      host.classList.add('post-feed--empty');
      this.r2.setStyle(host, 'height', 'auto');
    }
  }
}
