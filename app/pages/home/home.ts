import {Component, OnInit, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as io from "socket.io-client";


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit{
    socket: any;
    chatinp = '';
    chats = [];
    zone: any;

    constructor(private navController: NavController) {
    }

    ngOnInit(): any {
        this.zone = new NgZone(true);
        this.socket = io('http://localhost:3000');
        this.socket.on('message', (msg) => {
            this.zone.run(() => {
                this.chats.push(msg);
                console.log(this.chats);
            });
        });
    }

    static get parameters(){
        return [NgZone];
    }

    send(msg){
        if(msg != ''){
            this.socket.emit('message', msg);

        }
        this.chatinp = '';
    }
}
