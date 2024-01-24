"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
const console_1 = require("console");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userModel, jwt, config) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await new this.userModel({ email: dto.email, hash }).save();
            return this.signToken(user._id.toString(), user.email);
        }
        catch (error) {
            console.log(error);
            if (error.code) {
                if (error.code === 11000) {
                    throw new common_1.ForbiddenException('Email already exists');
                }
            }
        }
        throw console_1.error;
    }
    async signin(dto) {
        const user = await this.userModel.findOne({ email: dto.email }).exec();
        if (!user)
            throw new common_1.ForbiddenException('Credentials incorrect.');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials incorrect.');
        return this.signToken(user._id.toString(), user.email);
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        });
        return {
            access_token: token
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map