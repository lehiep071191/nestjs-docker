import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection, WsException, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';


@WebSocketGateway({
    namespace: 'notification'
})

export class NotificationGatewave implements OnGatewayConnection {
    @WebSocketServer() private server: Server;
    constructor(private authService: AuthService) {}
    logger = new Logger(NotificationGatewave.name)

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

    async testSocket() {
        setInterval(() => {
            this.server.emit('test', {test: 'test-event'})
        }, 1000)
    }
    
}