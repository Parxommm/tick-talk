import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Post, PostComment, PostService } from '../../data';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';

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
export class PostComponent implements OnInit {
  post = input<Post>();

  postService = inject(PostService);

  comments = signal<PostComment[]>([]);

  async ngOnInit(): Promise<void> {
    this.comments.set(this.post()?.comments ?? []);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()?.id ?? 0)
    );
    this.comments.set(comments);
  }
}
