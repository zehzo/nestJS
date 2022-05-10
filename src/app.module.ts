import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:<password>@cluster0.fitqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
