import { Body, Controller, Post, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    return this.authService.signUp(authCreadentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCreadentialsDto: AuthCreadentialsDto): Promise<{accessToken:string}> {
        return this.authService.signIn(authCreadentialsDto)
    }
  
}
