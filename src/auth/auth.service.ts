import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { JwtPaylod } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

   async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void> {
       this.logger.debug(`User signUp with creads: ${JSON.stringify(authCredentialsDto)}`)
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCreadentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        
        if (!username) {
            throw new UnauthorizedException('Invalid creadentials');
        }
        const payload: JwtPaylod = {username};
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)
        return {accessToken}
    }
}
   