import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PcModule } from './pc/pc.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Timmi:RieBcYaEwEbhgUQi@cluster0.aie9jx7.mongodb.net/ministry',
      {
        tls: true,
        tlsInsecure: true, // Только для отладки, не используйте в продакшене
      },
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    PcModule,
    UserModule,
  ],
})
export class AppModule {}
