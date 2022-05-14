import { Body, Controller, Get, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

class GuessDto {
  guess: string;
}

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':day/:guess')
  getGuessOffset(
    @Param('guess') guess: string,
    @Param('day') day: string,
  ): number[] {
    return this.appService.getGuess(guess, +day);
  }

  @Get(':guess')
  getGuess(@Param('guess') guess: string): number[] {
    return this.appService.getGuess(guess);
  }

  @Get()
  queryGuess(@Query() query: GuessDto): number[] {
    return this.appService.getGuess(query.guess);
  }

  @Post()
  postGuess(@Body() guess: string): number[] {
    return this.appService.getGuess(guess);
  }


}
