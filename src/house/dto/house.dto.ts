import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class HouseAddresDto {
    @ApiProperty({ required: true, type: String, description: 'House street' })
    @IsNotEmpty()
    street?: string;

    @ApiProperty({ required: true, type: String, description: 'House city' })
    @IsNotEmpty()
    city: string;

    @ApiProperty({ required: true, type: String, description: 'House state' })
    @IsNotEmpty()
    state: string;

    @ApiProperty({ required: false, type: String, description: 'House zipcode' })
    @IsNotEmpty()
    zipcode?: string;
}

export class HouseDto {

    @ApiProperty({ required: true, type: String, description: 'House name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true, type: String, description: 'House description' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ required: true, type: HouseAddresDto, description: 'House address' })
    @IsNotEmpty()
    address: HouseAddresDto;

    @ApiProperty({ required: true, type: Object, description: 'House features' })
    @IsNotEmpty()
    features: {
        bed?: number;
        bath?: number;
        size?: number;
    }
}

