import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ProfileService } from '@tt/profile';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule, AvatarCircleComponent, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  postText = '';

  @Output() created = new EventEmitter<String>();

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', `${textarea.scrollHeight}px`);
  }

  onCreatePost() {
    if (!this.postText) {
      return;
    }
    this.created.emit(this.postText);
    this.postText = '';
  }
}
