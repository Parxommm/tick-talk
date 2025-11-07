import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Chat, ChatsResponse, Message } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);

  private readonly baseApiUrl = environment.baseApiUrl;
  private readonly chatUrl = `${this.baseApiUrl}chat/`;
  private readonly messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.#http.post<Chat>(`${this.chatUrl}${userId}`, {});
  }

  getMyChats() {
    return this.#http.get<ChatsResponse[]>(`${this.chatUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${this.chatUrl}${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      { params: { message } }
    );
  }
}
