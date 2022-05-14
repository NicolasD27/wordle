import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

class GuessDto {
	guess: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
  test() {
    return [0, 1, 2, 2, 2];
  }
  
  @Get(':day/:guess')
  getGuessOffset(@Param('guess') guess: string, @Param('day') day: string) {
    return this.appService.getGuess(guess, +day);
  }

  @Get(':guess')
  getGuess(@Param('guess') guess: string): number[] {
    return this.appService.getGuess(guess);
  }

  @Get()
  queryGuess(@Query() query: GuessDto) {
	  return this.appService.getGuess(query.guess);
  }

  @Post()
  postGuess(@Body() guess: string) {
	return this.appService.getGuess(guess);
  }

  

  
}
