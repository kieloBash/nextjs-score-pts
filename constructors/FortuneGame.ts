export interface GameType {
  mistakes: number;
}

class FortuneGame {
  mistakes: number;

  constructor(initialMistakes: number = 0) {
    this.mistakes = initialMistakes;
  }

  increaseMistakes(): void {
    this.mistakes += 1;
  }

  resetMistakes(): void {
    this.mistakes = 0;
  }

  getMistakes(): number {
    return this.mistakes;
  }
}

export default FortuneGame;
