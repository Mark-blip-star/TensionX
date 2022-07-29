import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io"
import {UserService} from "./user/user.service";
import {UserRoleEnum} from "./common/enums/user-role.enam";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{
  constructor(private readonly userService:UserService) {
  }
  logger:Logger = new Logger(`AppGateWay`)

  @WebSocketServer() wss:Server

  handleConnection(client: Socket) {
      this.logger.log(`Client connected ${client.id}`)
  }

  afterInit(server: any): any {
    this.logger.log(`Initialized socket server successfully`)
  }

  @SubscribeMessage('submitLoginForm')
  async handleMessage(client: Socket, data) {

    const user = await this.userService.findUserByEmail(data.email)
    let role;
    let inputRole;
     user.role === 'Guest'?role = 1:user.role === 'User'?role = 2:user.role === 'Supervisor'?role = 3:role = 4
     data.role === 'Guest'?inputRole = 1:data.role === 'User'?inputRole = 2:data.role === 'Supervisor'?inputRole = 3:inputRole = 4

    if(user.role == data.role){
      return this.wss.emit(`msgToClient`,`Welcome!This is a ${user.role} tab `)
    }else if(role > inputRole){
      return this.wss.emit(`msgToClient`,`Welcome!This is a ${data.role} tab `)
    }
      this.wss.emit(`msgToClient`,`Access denied`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`)
  }
}
