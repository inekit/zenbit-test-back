import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'its a test task for zenbit. To test the functionlity please get :80 post or post :3000/form'//this.appService.getHello();
  }

}
