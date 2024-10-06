import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePcDto } from './dtos/CreatePc.dto';
import { PcService } from './pc.service';

@Controller('pc')
export class PcController {
  constructor(private pcService: PcService) {}

  @Get()
  getAllPc() {
    return this.pcService.getAllPc();
  }

  @Post('create')
  createPc(@Body() createPcDto: CreatePcDto) {
    return this.pcService.createPc(createPcDto);
  }

  @Post('delete')
  deletePc(@Body('id') id: string) {
    return this.pcService.deletePc(id);
  }

  @Get('free')
  getFreePc() {
    return this.pcService.getFreePc();
  }
}
