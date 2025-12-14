import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from '../../data';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';

@Component({
  selector: 'tt-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ profileId }) => profileId),
          switchMap(({ profileId }) =>
            this.chatsService.createChat(+profileId).pipe(
              switchMap((chat) => {
                this.router.navigate(['/chats', chat.id]);
                return of(null);
              })
            )
          )
        );
      }
      return this.chatsService.getChatById(+id);
    })
  );
}
