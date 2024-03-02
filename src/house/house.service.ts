import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from 'src/schemas/House.Schema';
import { HouseDto } from './dto/house.dto';

@Injectable()
export class HouseService {
    constructor(
        @InjectModel(House.name) private houseModel: Model<House>,
    ) {}

    async getHouses() {
        const houses = await this.houseModel.find();
        return houses;
    }

    async getHouseById(id: string) {
        const house = await this.houseModel.findById(id);
        return house;
    }

    async store(dto: HouseDto) {
        const house = await this.houseModel.create(dto);
        return house;
    }

    async update(id: string, dto: HouseDto) {
        const house = await this.houseModel.findByIdAndUpdate(id, dto, { new: true });
        return house;
    }

    async delete(id: string) {
        const house = await this.houseModel.findByIdAndDelete(id);
        return house;
    }
}
