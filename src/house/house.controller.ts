import { Body, Controller, Get, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseDto } from './dto/house.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/auth/decorator/valid-id.decorator';

@Controller('houses')
@ApiTags('houses')
export class HouseController {
    constructor(private houseService: HouseService){}

    @Get()
    getHouses() {
        return this.houseService.getHouses();
    }

    @Post('store')
    @ApiCreatedResponse({ description: 'The house has been successfully created.' })
    store(@Body() dto: HouseDto) {
        return this.houseService.store(dto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse({ description: 'The house has been successfully updated.' })
    update(@ValidateObjectId() id: string, @Body() dto: HouseDto) {
        return this.houseService.update(id, dto);
    }

}
