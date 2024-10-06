import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Rom {
  @Prop({ unique: false })
  title: string;

  @Prop({ unique: false })
  qty: number;
}

export const RomSchema = SchemaFactory.createForClass(Rom);
