import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { ChatsResponse } from '../../data';

@Component({
  selector: 'tt-chats-btn',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<ChatsResponse>();
}
