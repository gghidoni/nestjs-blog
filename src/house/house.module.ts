import { Module } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseController } from "./house.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { House, HouseSchema } from "src/schemas/House.Schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: House.name,
                schema: HouseSchema
            }
        ])
    ],
    controllers: [HouseController],
    providers: [HouseService],
    exports: []
})

export class HouseModule {}