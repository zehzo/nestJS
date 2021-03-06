import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(criaJogadorDto);
    } else {
      this.criar(criaJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
    // return this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    return await this.jogadorModel.remove({ email }).exec();
    /*
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
    */
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);

    return await jogadorCriado.save();

    /* const { nome, telefoneCelular, email } = criaJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'saidjiasjd.zxczsd',
    };

    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);

    this.jogadores.push(jogador);*/
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
    /*
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
    */
  }
}
