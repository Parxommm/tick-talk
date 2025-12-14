import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, ChatsResponse, Message } from '../interfaces/chat.interface';
import { ProfileService } from '@tt/profile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);
  me = inject(ProfileService).me;
  activeChatMessages = signal<Message[]>([]);

  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private readonly chatUrl = `${this.baseApiUrl}chat/`;
  private readonly messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.#http.post<Chat>(`${this.chatUrl}${userId}`, {});
  }

  getMyChats() {
    return this.#http.get<ChatsResponse[]>(`${this.chatUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${this.chatUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: this.me()?.id === message.userFromId,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            this.me()?.id === chat.userFirst.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      { params: { message } }
    );
  }
}
