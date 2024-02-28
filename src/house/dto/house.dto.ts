import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { HouseStatus } from "../enums/house.status";

class HouseAddresDto {
    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House street' 
    })
    @IsString()
    @IsNotEmpty()
    street?: string;

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House city' 
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House state' 
    })
    @IsNotEmpty()
    state: string;

    @ApiProperty({ 
        required: false, 
        type: String, 
        description: 'House zipcode' 
    })
    @IsString()
    @IsNotEmpty()
    zipcode?: string;
}

class HouseFeaturesDto {
    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House bed' 
    })
    @IsNumber()
    @IsNotEmpty()
    bed?: number;

    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House bath' 
    })
    @IsNumber()
    @IsNotEmpty()
    bath?: number;

    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House size' 
    })
    @IsNumber()
    @IsNotEmpty()
    size?: number;
}

export class HouseDto {

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House name' 
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House description' 
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
        required: true, 
        type: Number, 
        description: 'House price' 
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ 
        required: true, 
        enum: HouseStatus,  
        description: 'House status' 
    })
    @IsEnum(HouseStatus)
    @IsNotEmpty()
    status: HouseStatus;

    @ApiProperty({ 
        required: true, 
        type: HouseAddresDto, 
        description: 'House address' 
    })
    @IsNotEmpty()
    address: HouseAddresDto;

    @ApiProperty({ 
        required: true, 
        type: HouseFeaturesDto, 
        description: 'House features' 
    })
    @IsNotEmpty()
    features: HouseFeaturesDto
}

