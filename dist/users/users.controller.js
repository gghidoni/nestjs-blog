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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const mongoose_1 = require("mongoose");
const UpdateUser_dto_1 = require("./dto/UpdateUser.dto");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
const User_schema_1 = require("../schemas/User.schema");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    getUsers() {
        return this.usersService.getUsers();
    }
    getMe(user) {
        return user;
    }
    async getUserById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('User not found', 404);
        const findUser = await this.usersService.getUserById(id);
        if (!findUser)
            throw new common_1.HttpException('User not found', 404);
        return findUser;
    }
    async upddateUser(id, updateUserDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 400);
        const updatedUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updatedUser)
            throw new common_1.HttpException('User not found', 404);
        return updatedUser;
    }
    async deleteUser(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 400);
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser)
            throw new common_1.HttpException('User not found', 404);
        return deletedUser;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_schema_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "upddateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map