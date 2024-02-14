import { Injectable } from '@nestjs/common';
var app = require("express")();
var http = require("http").createServer(app);
var io = require('socket.io')(http);

var port = 3000;
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
