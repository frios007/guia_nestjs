import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(data: LoginDto) {
    const usuario = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!usuario) throw new NotFoundException('El usuario no existe');

    if (!(await compare(data.password, usuario.password)))
      throw new UnauthorizedException('Contrasena incorrecta');

    return this.jwtService.sign({
      id: usuario.id,
      email: usuario.email,
    });
  }
}
