import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/User.schema";
import { Model, MongooseError } from "mongoose";
import * as argon from 'argon2';
import { error } from "console";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwt: JwtService,
        private config: ConfigService
        ) {}

    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await new this.userModel({ email: dto.email, hash}).save();
            //return this.signToken(user.id, user.email);
            return this.signToken(user._id.toString(), user.email);
        } catch (error) {
            console.log(error)
            if (error.code) {
                if (error.code === 11000) {
                    throw new ForbiddenException('Email already exists');
                }
            }
        }
        throw error;
    }
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.userModel.findOne({ email: dto.email }).exec();
        // if the user doesn't exist throw an exception
        if (!user)
            throw new ForbiddenException('Credentials incorrect.');
        // compare the password
        const pwMatches = await argon.verify(user.hash, dto.password);
        // if the password is incorrect throw an exception
        if (!pwMatches)
            throw new ForbiddenException('Credentials incorrect.');
       
        //return this.signToken(user.id, user.email);
        return this.signToken(user._id.toString(), user.email);
    }

    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        });
        return {
            access_token: token
        }
    }
}