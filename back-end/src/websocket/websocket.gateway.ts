import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(6001)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clients: Record<string, WebSocket> = {};

  async handleConnection(client: Socket) {
    const sessionId = await this.generateSessionID();
    console.log(`Client connected with session ID: ${sessionId}`);
    this.clients[sessionId] = client;
  }

  handleDisconnect(client: WebSocket) {
    const sessionId = this.findSessionIdByClient(client);
    if (sessionId) {
      console.log(`Client disconnected with session ID: ${sessionId}`);
      delete this.clients[sessionId];
    }
  }


  @SubscribeMessage('video')
  handleVideo( @ConnectedSocket() client: WebSocket,@MessageBody() data: any): void {
    const buffer = Buffer.from(data, 'base64');
    for (const sessionId in this.clients) {
      if ( this.clients[sessionId] !== client && this.clients[sessionId].readyState === WebSocket.OPEN) {
         this.clients[sessionId].send(buffer);
      }
    }
  }

  private generateSessionID(): string {
    // Implement your unique session ID generation logic here
    return Math.random().toString(36).substr(2, 10);
  }

  private findSessionIdByClient(client: WebSocket): string | undefined {
    return Object.keys(this.clients).find(sessionId => this.clients[sessionId] === client);
  }
}


// import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server, WebSocket } from 'ws';

// @WebSocketGateway(6001)
// export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   handleConnection(client: WebSocket) {
//     console.log(`Client connected: ${client}`);
//   }

//   handleDisconnect(client: WebSocket) {
//     console.log(`Client disconnected: ${client}`);
//   }

//   @SubscribeMessage('video')
//   handleVideo(client: WebSocket, @MessageBody() data: ArrayBuffer): void {
//     // 영상 데이터를 다른 클라이언트에게 브로드캐스트
//     this.server.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   }

//   @SubscribeMessage('command')
//   handleMessage(client: WebSocket, @MessageBody() payload: any): void {
//     try {
//       const key = payload.key;
//       console.log(`Received key from client: ${key}`);
//       // 메시지 처리 로직을 추가합니다.
//     } catch (error) {
//       console.error('Error handling message:', error);
//       // 오류 처리 로직을 추가합니다.
//     }
//     this.server.clients.forEach((client) => {
//       if(client.readyState === WebSocket.OPEN){
//         client.send(payload);
//       }
//     });
//   }
// }
