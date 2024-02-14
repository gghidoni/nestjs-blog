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

    async store(dto: HouseDto) {
        const house = await this.houseModel.create(dto);
        return house;
    }
}
