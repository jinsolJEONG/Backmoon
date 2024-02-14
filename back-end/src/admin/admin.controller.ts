import { Controller, Get, Query, Param, Request, ForbiddenException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DogsService } from 'src/dogs/dog/dogs.service';
import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';

@Controller('/api/admin/')
export class AdminController {
    constructor(
        private readonly dogService: DogsService,
        private readonly userService: UserService,
        private readonly adminService: AdminService
        ) {}
    @Get('/dogs')
    @UseGuards(JwtAuthGuard)
    async getDogs(@Query('page') page: number = 1, @Query('pageSize') pageSize:number = 100,@Request() req):Promise<any> {
        const isAdmin = req.user.Admin;
        if(isAdmin){
        const Dogs = await this.dogService.getDogs();
        const totalItem = await this.dogService.getDogsCount();
        if(isNaN(page)||isNaN(pageSize)){
        page=1;
        pageSize=totalItem;
        }
        const startIndex = (page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Dog = Dogs.slice(startIndex,endIndex);
        return {totalItem,Dog};
    } else {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: [`사용자 정보가 일치하지 않습니다.`],
            error: 'Forbidden',
          });
    }
    }
    @Get('/users')
    @UseGuards(JwtAuthGuard)
    async getUser(@Query('page') page: number = 1, @Query('pageSize') pageSize:number = 100, @Request() req):Promise<any> {
        const isAdmin = req.user.Admin;
        if(isAdmin){
        const users = (await this.userService.findAll()).reverse();
        const totalItem = await this.userService.findAllCount();
        if(isNaN(page)||isNaN(pageSize)){
        page=1;
        pageSize=totalItem;
        }
        const startIndex = (page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        const user = users.slice(startIndex,endIndex);
        return {totalItem,user};
        } else {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: [`사용자 정보가 일치하지 않습니다.`],
            error: 'Forbidden',
          });
        }
    }
    @Get('/user/:id')
    @UseGuards(JwtAuthGuard)
    async getOneUser(@Param('id') ID: string, @Request() req)  {
        console.log('1');
        const isAdmin = req.user.Admin;
        if(isAdmin) {
        console.log('2');
        const user = await this.userService.findOne(ID);
        return user;
        } else {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: [`사용자 정보가 일치하지 않습니다.`],
            error: 'Forbidden',
        });
        }
    }
    @Get('/reservation')
    @UseGuards(JwtAuthGuard)
    async getReservation(@Query('page') page: number = 1, @Query('pageSize') pageSize:number = 100, @Request() req) {
        const isAdmin = req.user.Admin;
        if(isAdmin) {
        const reservations = (await this.adminService.findAllReservation()).reverse();
        const totalItem = await this.adminService.findAllReservationCount();
        if(isNaN(page)||isNaN(pageSize)){
        page=1;
        pageSize=totalItem;
        }
        const startIndex = (page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        const reservation = reservations.slice(startIndex,endIndex);
        return {totalItem,reservation};
        } else {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: [`사용자 정보가 일치하지 않습니다.`],
            error: 'Forbidden',
        });
        }
    }
}
