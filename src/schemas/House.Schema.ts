import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class HouseAddress {
    @Prop()
    street?: string;

    @Prop({required: true})
    city: string;

    @Prop({required: true})
    state: string;

    @Prop()
    zipcode?: string;
}

@Schema()
export class House {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true, type: HouseAddress})
    address: HouseAddress;

    @Prop({required: true, type: Object})
    features: {
        bed?: number;
        bath?: number;
        size?: number;
    }
}

export const HouseSchema = SchemaFactory.createForClass(House);