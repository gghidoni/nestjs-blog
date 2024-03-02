import { Body, Controller, Delete, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseDto } from './dto/house.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/auth/decorator/valid-id.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('houses')
@ApiTags('houses')
export class HouseController {
    constructor(private houseService: HouseService){}

    @Get('')
    @ApiOperation({ summary: 'Get all houses'})
    getHouses() {
        return this.houseService.getHouses();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'House ID' })
    @ApiOperation({ summary: 'Get house by ID'})
    getHouseById(@ValidateObjectId() id: string) {
        return this.houseService.getHouseById(id);
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Post('store')
    @ApiCreatedResponse({ description: 'The house has been successfully created.' })
    @ApiOperation({ summary: 'Create new house'})
    store(@Body() dto: HouseDto) {
        return this.houseService.store(dto);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'House ID' })
    @ApiCreatedResponse({ description: 'The house has been successfully updated.' })
    @ApiOperation({ summary: 'Update house by ID'})
    update(@ValidateObjectId() id: string, @Body() dto: HouseDto) {
        return this.houseService.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'House ID' })
    @ApiCreatedResponse({ description: 'The house has been successfully deleted.' })
    @ApiOperation({ summary: 'Delete house by ID'})
    delete(@ValidateObjectId() id: string) {
        return this.houseService.delete(id);
    }

}
