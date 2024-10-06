import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/User.Schema';
import { CreatePcDto } from './dtos/CreatePc.dto';
import { Pc } from './schemas/Pc.Schema';

@Injectable()
export class PcService {
  constructor(
    @InjectModel(Pc.name) private pcModel: Model<Pc>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getAllPc() {
    try {
      const pc = await this.pcModel.find().exec();
      if (pc.length === 0) {
        throw new HttpException('Нет компьютеров!', 404);
      }
      return pc;
    } catch (error) {
      throw error;
    }
  }

  async createPc(createPcDto: CreatePcDto) {
    try {
      const pc = await this.pcModel.findOne({
        registrationNumber: createPcDto.registrationNumber,
      });
      if (pc) {
        throw new HttpException('Такой PC уже есть!', HttpStatus.BAD_REQUEST);
      }
      const newPc = new this.pcModel(createPcDto);
      console.log('newPc', newPc);
      return newPc.save();
    } catch (error) {
      throw error;
    }
  }

  async deletePc(id: string) {
    try {
      const pc = this.pcModel.findOne({ _id: id });
      if (!pc) {
        throw new HttpException('Такого PC нет!', HttpStatus.BAD_REQUEST);
      }
      return this.pcModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  async getFreePc() {
    try {
      const pcInUsers = await this.userModel.find().distinct('pc').exec();

      if (!pcInUsers) {
        throw new HttpException('Нет занятых PC!', HttpStatus.NOT_FOUND);
      }
      return await this.pcModel.find({ _id: { $nin: pcInUsers } }).exec();
    } catch (error) {
      throw error;
    }
  }
}
