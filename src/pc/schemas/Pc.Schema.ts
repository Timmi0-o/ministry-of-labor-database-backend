import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rom, RomSchema } from './Rom.Schema';

@Schema()
export class Pc {
  @Prop({ unique: true })
  registrationNumber: string;

  @Prop({ default: 'PC', required: false, unique: false })
  type: string;

  @Prop()
  manufacturer: string;

  @Prop()
  motherboard: string;

  @Prop()
  ram: number;

  @Prop({ type: [RomSchema], unique: false, required: true })
  rom: Rom[];

  @Prop()
  cpu: string;

  @Prop()
  gpu: string;
}

export const PcSchema = SchemaFactory.createForClass(Pc);
