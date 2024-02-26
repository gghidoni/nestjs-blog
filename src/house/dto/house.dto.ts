import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class HouseAddresDto {
    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House street' 
    })
    @IsNotEmpty()
    street?: string;

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House city' 
    })
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
    @IsNotEmpty()
    zipcode?: string;
}

class HouseFeaturesDto {
    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House bed' 
    })
    @IsNotEmpty()
    bed?: number;

    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House bath' 
    })
    @IsNotEmpty()
    bath?: number;

    @ApiProperty({ 
        required: false, 
        type: Number, 
        description: 'House size' 
    })
    @IsNotEmpty()
    size?: number;
}

export class HouseDto {

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House name' 
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        required: true, 
        type: String, 
        description: 'House description' 
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
        required: true, 
        type: Number, 
        description: 'House price' 
    })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ 
        required: true, 
        type: String, 
        enum: ['SALE', 'RENT', 'PRIVATE'],
        default: 'SALE', 
        description: 'House status' 
    })
    @IsNotEmpty()
    status: string;

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

