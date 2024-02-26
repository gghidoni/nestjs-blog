import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class House {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop()
    price: number;

    @Prop({required: true, type: String, enum: ['SALE', 'RENT', 'PRIVATE']})
    status: {
        type: String,
        enum: ['SALE', 'RENT', 'PRIVATE'],
        default: 'SALE'
    }

    @Prop({ 
        required: true,
        type: {
            street: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: String }
        }
    })
    address: {
        street?: string,
        city: string,
        state: string,
        zipcode?: string
    };

    @Prop({ 
        required: true,
        type: {
            bed: { type: Number },
            bath: { type: Number },
            size: { type: Number }
        }
    })
    features: {
        bed?: number,
        bath?: number,
        size?: number
    };
}

export const HouseSchema = SchemaFactory.createForClass(House);