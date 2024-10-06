import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pc, PcSchema } from 'src/pc/schemas/Pc.Schema';
import { User, UserSchema } from './schemas/User.Schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Pc.name, schema: PcSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
