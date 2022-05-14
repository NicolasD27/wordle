
const app = new Vue({
	el: '#app',
	data: {
		title: 'Wordle',
		guess: "",
        response: [],
        previousGuesses: [],
        previousResponses: [],
        step: 0,
        score: 0,
        letters: document.querySelectorAll(".letter-container"),
        day: 0,
        error: false
		
	},
	methods: {
		sendGuess() {
            console.log(this.guess)
            if (this.score < 5 && this.step < 6) {
                fetch(`http://localhost:3000/${this.day}/${this.guess}`)
                .then(res => res.json())
                .then(res => {
                    if (res.statusCode && res.statusCode != 200) {
                        this.guess = ""
                        this.error = true;
                        setTimeout(() => {
                            this.error = false
                        }, 300)
                    }
                    else {

                        console.log(res)
                        this.response = res;
                        this.score = 0
                        this.previousGuesses.push(this.guess.toUpperCase());
                        this.previousResponses.push(this.response)
                        this.response.forEach((element, i) => {
                            if (element == 1)
                            this.score++;
                        });
                        this.guess = ""
                        this.step++;
                    }
                })
            }
            else if (this.step >= 6) {
                this.error = true;
                setTimeout(() => {
                    this.error = false
                }, 300)
            }
            
            
        },
        nextWord() {
            this.previousGuesses = []
            this.previousResponses = []
            this.day++;
            this.score = 0;
        }
	},
	created() {
        console.log("created")
	}
});


