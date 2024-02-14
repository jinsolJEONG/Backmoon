import { Injectable } from '@nestjs/common';

@Injectable()
export class EndpointService {
    async getRespose(req) {
        const user = req.user;

        if(user.Admin){
            console.log('Admin');
        } else {
            console.log('User');
        }
    }
}