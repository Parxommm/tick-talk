import {
  Component,
  effect,
  inject,
  input,
  signal,
  viewChild,
  ElementRef,
  afterNextRender,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Post, PostComment, PostService } from '../../data';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'tt-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>();

  postService = inject(PostService);
  globalStore = inject(GlobalStoreService);

  commentsWrapperRef = viewChild<ElementRef<HTMLElement>>('commentsWrapper');

  comments = signal<PostComment[]>([]);
  deleting = signal(false);

  get canDelete(): boolean {
    const p = this.post();
    const me = this.globalStore.me();
    return !!p && !!me && p.author?.id === me.id;
  }

  constructor() {
    effect(() => {
      const p = this.post();
      this.comments.set(p?.comments ?? []);
    });
    effect(() => {
      this.comments();
      this.scrollCommentsToBottom();
    });
    afterNextRender(() => this.scrollCommentsToBottom());
  }

  private scrollCommentsToBottom(): void {
    setTimeout(() => {
      const el = this.commentsWrapperRef()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()?.id ?? 0)
    );
    this.comments.set(comments);
    this.scrollCommentsToBottom();
  }

  async onDelete() {
    const postId = this.post()?.id;
    if (postId == null || this.deleting()) return;
    this.deleting.set(true);
    try {
      await firstValueFrom(this.postService.deletePost(postId));
    } finally {
      this.deleting.set(false);
    }
  }
}
