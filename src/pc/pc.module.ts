import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/User.Schema';
import { PcController } from './pc.controller';
import { PcService } from './pc.service';
import { Pc, PcSchema } from './schemas/Pc.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pc.name, schema: PcSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PcController],
  providers: [PcService],
})
export class PcModule {}
