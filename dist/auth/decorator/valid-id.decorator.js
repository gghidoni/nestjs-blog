"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateObjectId = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
exports.ValidateObjectId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new common_1.HttpException('User not found', 404);
    }
    return id;
});
//# sourceMappingURL=valid-id.decorator.js.map