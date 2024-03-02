import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { UserModule } from "src/users/users.module";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe({whitelist: true}))
    @ApiCreatedResponse({description: 'User registration'})
    @ApiOperation({summary: 'User registration'})
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @ApiOkResponse({description: 'User login'})
    @ApiUnauthorizedResponse({description: 'Invalid credentials'})
    @ApiOperation({summary: 'User login'})
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}