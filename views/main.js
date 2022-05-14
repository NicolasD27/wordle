
const app = new Vue({
	el: '#app',
	data: {
		title: 'Wordle',
		guess: "",
        response: [],
        previousGuesses: [],
        step: 0,
        score: 0,
        letters: document.querySelectorAll(".letter-container")
		
	},
	methods: {
		sendGuess() {
            fetch(`http://localhost:3000/${guess}`)
            .then(res => {
                console.log(res)
                response = res;
                score = 0
                response.forEach((el, i) => {
                    if (el == 0)
                        letters[step * 5 + i].classList.add("red")
                    else if (el == 1)
                        letters[step * 5 + i].classList.add("yellow")
                    else if (el == 2)
                    {
                        score++;
                        letters[step * 5 + i].classList.add("green")
                    }
                })

                previousGuesses.push(guess);
                if (score == 5)
                {
                    document.querySelector(".game-container")
                }
                guess = ""
                step++;
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


