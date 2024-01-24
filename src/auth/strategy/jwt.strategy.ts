import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        private usersService: UsersService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'TopSecret'
        })
    }

    async validate(payload: { sub: string, email: string }) {
        const user = await this.usersService.getUserById(payload.sub);
        //TODO non elimina hash da user
        delete user.hash;
        return user;
    }
}