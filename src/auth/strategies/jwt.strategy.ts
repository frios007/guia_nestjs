import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'dsaihkljasahsdabskldaklbfblskhf23908uy8y249ht34h73bfgfg38748348',
    });
  }

  async validate(payload: { id: number; email: string }) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
