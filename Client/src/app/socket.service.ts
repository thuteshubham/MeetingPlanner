import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  private socket = io('http://localhost:3002');

  join(userId) {
    this.socket.emit('set-user', userId);
  }

  getNotification() {
    let observable = new Observable<string>(observer => {
      this.socket.on('get-notification', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }
}
