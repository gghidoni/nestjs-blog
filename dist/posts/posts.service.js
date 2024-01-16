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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Post_schema_1 = require("../schemas/Post.schema");
const User_schema_1 = require("../schemas/User.schema");
let PostsService = class PostsService {
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async createPost({ userId, ...createPostDto }) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser)
            throw new common_1.HttpException('User Not Found', 404);
        const newPost = new this.postModel({ ...createPostDto, user: userId });
        const savedPost = await newPost.save();
        await findUser.updateOne({
            $push: {
                posts: savedPost._id,
            },
        });
        return savedPost;
    }
    findPostById() { }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map