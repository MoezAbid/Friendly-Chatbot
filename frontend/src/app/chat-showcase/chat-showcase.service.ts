import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Question } from "src/app/chat-showcase/Question";


@Injectable({
  providedIn: 'root'
})

export class ChatShowcaseService {
// https://testcbras.herokuapp.com/
  constructor(private http: HttpClient) { }
  apiUrl = "http://localhost:5005/webhooks/rest/webhook/";
  loadMessages(){
    return [];
  }

  askChatbot(question:Question): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = {
        "sender": "Client",
        "message": question
    }
    return this.http.post(this.apiUrl, body, {'headers':headers})
  }
}
