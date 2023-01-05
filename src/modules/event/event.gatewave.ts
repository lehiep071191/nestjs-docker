import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Namespace, Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  namespace: 'socket-test',
})
export class EventGatewave implements OnGatewayConnection {
  @WebSocketServer() private server: Server;
  constructor(private authService: AuthService) {}

  async handleConnection(client: any, ...args: any[]) {
    console.log(client.id);
    await client.join();
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('receive_message', data);
  }
}
