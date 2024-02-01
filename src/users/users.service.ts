import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { UserSettingsService } from "src/user-settings/user-settings.service";

@Injectable()
export class UsersService {
    user;
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        ) {}

    async createUser({ settings, ...createUserDto}: CreateUserDto) {
      //  if (settings) {
        //    const newSettings = new this.userSettingsModel(settings);
          //  const savedSettings = await newSettings.save();
            //const newUser = new this.userModel({ ...createUserDto, settings: savedSettings._id });
           // return newUser.save();
    // }
      //  const newUser = new this.userModel(createUserDto);
       // return newUser.save();
    }

    getUsers() {
        return this.userModel.find({}, { hash: false }).populate(['settings', 'posts']);
    }

    getUserById(id: string) {
        return this.userModel.findById(id).populate(['settings', 'posts']);
    }

    async updateUser(userId: string, { settings, ...updateUserDto}: UpdateUserDto) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new HttpException('User not found', 404);
        if (settings) {
            let userSettings = await this.userSettingsModel.findById(user.settings);
            if (!userSettings) {
                userSettings = new this.userSettingsModel(settings);
                await userSettings.save();
                user.settings = userSettings;
                await user.save();
            } else {
                userSettings.set(settings);
                await userSettings.save();
            }
        }
        user.set(updateUserDto);
        await user.save();
        return user;
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}