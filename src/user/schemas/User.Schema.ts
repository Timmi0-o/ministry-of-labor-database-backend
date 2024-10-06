import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pc } from 'src/pc/schemas/Pc.Schema';

@Schema()
export class User {
  @Prop({ unique: true })
  userId: string;

  @Prop({})
  firstName: string;

  @Prop({})
  lastName: string;

  @Prop({ required: false, default: '' })
  patronymic: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pc',
        required: false,
        default: [],
      },
    ],
  })
  pc: Pc[];
}

export const UserSchema = SchemaFactory.createForClass(User);
