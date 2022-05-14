import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

class GuessDto {
	guess: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':guess')
  getGuess(@Param('guess') guess: string) {
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
