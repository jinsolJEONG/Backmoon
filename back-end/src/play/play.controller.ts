import { Body, Controller,Post } from '@nestjs/common';
import { PlayService } from './play.service';

@Controller('remoteplay')
export class PlayController {
    constructor(private readonly playService: PlayService) {}
    @Post()
    sendCommand(@Body() CommandData:{command}) {
        return this.playService.sendCommand(CommandData);
    }

}
