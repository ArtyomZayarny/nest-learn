import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body() authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    return this.authService.signUp(authCreadentialsDto);
    }
}
