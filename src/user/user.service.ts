import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pc } from 'src/pc/schemas/Pc.Schema';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from './schemas/User.Schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Pc.name) private pcModel: Model<Pc>,
  ) {}

  async getAllUsers() {
    const users = this.userModel.find().populate('pc').exec();
    if (!users) {
      throw new HttpException('Нет пользователей!', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ userId: createUserDto.userId });
    if (user) {
      throw new HttpException(
        'Такой пользователь уже есть!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new HttpException(
        'Такого пользователя нет!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  async addPcToUser(idUser: string, idPc: string) {
    const pc = await this.pcModel.findOne({ _id: idPc }).exec();
    if (!pc) {
      throw new HttpException('Такого PC нет!', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne({ _id: idUser }).exec();
    if (!user) {
      throw new HttpException(
        'Такого пользователя нет!',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.pc.push(pc);
    return user.save();
  }

  async deletePcToUser(idUser: string) {
    const user = await this.userModel.findOne({ _id: idUser }).exec();
    if (!user) {
      throw new HttpException(
        'Такого пользователя нет!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.pc) {
      throw new HttpException('У пользователя нет PC!', HttpStatus.BAD_REQUEST);
    }

    return await this.userModel
      .updateOne({ _id: idUser }, { $set: { pc: [] } })
      .exec();
  }
}
