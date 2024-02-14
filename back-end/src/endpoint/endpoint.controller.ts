import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EndpointService } from './endpoint.service';
@Controller('endpoint')
export class EndpointController {
    constructor(
        private readonly endpointService: EndpointService,
    ){}
    @UseGuards(JwtAuthGuard)
    @Get()
    async getResponse(@Request() req) {
        return this.endpointService.getRespose(req);
    }
}
