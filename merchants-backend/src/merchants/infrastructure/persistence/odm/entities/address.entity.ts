import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ autoCreate: false, _id: false })
export class AddressEntity extends Document {
  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  neighborhood: string;

  @Prop()
  street: string;

  @Prop()
  streetNumber: string;

  @Prop()
  zipCode: string;
}

export const AddressEntitySchema = SchemaFactory.createForClass(AddressEntity);
