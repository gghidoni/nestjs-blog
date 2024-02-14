import { Body, Controller, Post } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseDto } from './dto/house.dto';

@Controller('houses')
export class HouseController {

    constructor(private houseService: HouseService){}

    @Post('store')
    store(@Body() dto: HouseDto) {
        return this.houseService.store(dto);
    }

}
