import { Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DatePipe } from '@angular/common';
import { Message } from '../../../../data';

@Component({
  selector: 'tt-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }

  message = input.required<Message>();
}
