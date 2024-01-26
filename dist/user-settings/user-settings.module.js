"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const UserSettings_schema_1 = require("../schemas/UserSettings.schema");
const user_settings_controller_1 = require("./user-settings.controller");
const user_settings_service_1 = require("./user-settings.service");
let UserSettingsModule = class UserSettingsModule {
};
exports.UserSettingsModule = UserSettingsModule;
exports.UserSettingsModule = UserSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: User_schema_1.User.name,
                    schema: User_schema_1.UserSchema,
                },
                {
                    name: UserSettings_schema_1.UserSettings.name,
                    schema: UserSettings_schema_1.UserSettingsSchema
                }
            ]),
        ],
        controllers: [user_settings_controller_1.UserSettingsController],
        providers: [user_settings_service_1.UserSettingsService],
        exports: [user_settings_service_1.UserSettingsService]
    })
], UserSettingsModule);
//# sourceMappingURL=user-settings.module.js.map