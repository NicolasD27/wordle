
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
        letters: document.querySelectorAll(".letter-container")
		
	},
	methods: {
		sendGuess() {
            console.log(this.guess)
            fetch(`http://localhost:3000/${this.guess}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.response = res;
                this.score = 0
                this.previousGuesses.push(this.guess);
                this.previousResponses.push(this.response)
                this.response.forEach((element, i) => {
                    this.letters[0].classList.add("red")

                    console.log(element, " ", this.step * 5 + i)
                    if (element == 0)
                    {
                        console.log("here")
                        this.letters[this.step * 5 + i].classList.add("red")
                    }
                    else if (element == 2)
                        this.letters[this.step * 5 + i].classList.add("yellow")
                    else if (element == 1)
                    {
                        this.score++;
                        this.letters[this.step * 5 + i].classList.add("green")
                    }
                });
                    
                
            

                if (this.score == 5)
                {
                    this.previousGuesses = []
                    this.previousResponses = []
                    document.querySelector(".game-container")
                }
                this.guess = ""
                this.step++;
            })
            .catch(err => {
                console.log(err)
            })
        }
	},
	created() {
        console.log("created")
	}
});


