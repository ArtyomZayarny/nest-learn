import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

   async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCreadentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        
        if (!username) {
            throw new UnauthorizedException('Invalid creadentials');
        }

      //  return 
    }
}
   