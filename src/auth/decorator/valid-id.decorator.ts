import { BadRequestException, ExecutionContext, HttpException, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import mongoose from "mongoose";

export const ValidateObjectId = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        const id = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('User not found', 404);
          }
          return id;
    }
)