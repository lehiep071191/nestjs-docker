import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
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
  logger = new Logger(EventGatewave.name)
  async handleConnection(client: Socket, ...args: any[]) {
    const bearerToken = client.handshake.auth?.token || client.handshake.headers?.authorization
      if(!bearerToken) {
        client.disconnect(true)
        throw new WsException('Authen failed')
      }
      const token = bearerToken.split(" ")[1]
    try {
      const user = await this.authService.verifyToken(token)
      if(user) {
        await client.join(user.id);
        this.logger.verbose(`client ${client.id} has join ${user.id}`)
      } else {
        client.disconnect(true)
      
      }
      
    } catch (e) {
      client.disconnect(true)
      this.logger.error(e)
    }
    
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: any) {
    this.server.emit('receive_message', data);
  }
}
