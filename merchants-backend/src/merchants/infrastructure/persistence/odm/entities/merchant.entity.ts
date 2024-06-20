import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { Address } from '@merchants/domain/object-values/address';

@Schema({ collection: 'merchants', timestamps: true })
export class MerchantEntity extends Document {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  logoUrl: string;

  @Prop()
  sector: string;

  @Prop(Address)
  address: Address;

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const MerchantEntitySchema =
  SchemaFactory.createForClass(MerchantEntity);
