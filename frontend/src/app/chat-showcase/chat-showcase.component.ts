import { Component } from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';

@Component({
  selector: 'app-chat-showcase',
  templateUrl: './chat-showcase.component.html',
  providers: [ ChatShowcaseService ],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class ChatShowcaseComponent {

  messages: any[];

  constructor(protected chatShowcaseService: ChatShowcaseService) {
    this.messages = this.chatShowcaseService.loadMessages();
  }

  sendMessage(event: any) {
    this.messages.push({
      reply:true,
      text: event.message,
      date: new Date(),
      user: {
        name: 'Sent by you on',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

    this.chatShowcaseService.askChatbot(event.message)
      .subscribe(data => {
        let botReply = data[0].text;
        let botReplyMessage = {
          reply:false,
          text: botReply,
          date:  new Date(),
          user: {
            name: 'Sent by chatbot on ',
            avatar: "https://i.imgur.com/X7pWonu.jpg",
          },
        }
        if (botReply) {
          setTimeout(() => { this.messages.push(botReplyMessage) }, 500);
        }
      })      
  }
}