import { BadRequestException, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private dict: Set<string>;
  async onApplicationBootstrap() {
    console.log("init words");
    this.dict = new Set();

    const fileStream = fs.createReadStream('shuffled.txt');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      this.dict.add(line);
    }
  }
	
  private getTodaysWord(offset: number): string {
    const now = new Date();
    const day = Math.floor(((+now/(1000*60*60*24)) + offset) % this.dict.size);
    console.log(day);
    let count = 0;
    for (let item of this.dict) {
      if (count === day) {
        console.log(item);
        return item;
      }
      count++;
    }
  }

	getGuess(guess: string, day: number = 0) {
    const answer = this.getTodaysWord(day);
    if (guess.length != 5) {
      throw new BadRequestException('Words must be 5 letters');
    } else if (!this.dict.has(guess)) {
      throw new BadRequestException('Not a valid word');
    }
    const score = [0, 0, 0, 0, 0];
    
    let expected = new Map();
    let i = 0;
    while (i < 5) {
      let c = answer[i];
      if (expected.has(c)) {
        expected.set(c, expected.get(c) + 1);
      } else {
        expected.set(c, 1);
      }
      ++i;
    }
    
    i = 0;
    while (i < 5) {
      if (guess[i] === answer[i]) {
        let c = guess[i];
        score[i] = 1;
        expected.set(c, expected.get(c) - 1);
      }
      i++;
    }

    i = 0;
    while (i < 5) {
      let c = guess[i];
      if (c !== answer[i] && expected.has(c) && expected.get(c) > 0) {
        score[i] = 2;
        expected.set(c, expected.get(c) - 1);
      }
      i++;
    }

	  return score;
  }
}
