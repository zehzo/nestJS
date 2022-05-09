import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criaJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criaJogadorDto);
  }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<Jogador[]> {
    if (email) {
      this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }
}
