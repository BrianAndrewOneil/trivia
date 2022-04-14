//The user selects a category and receives a trivia question, multiple choice.

document.querySelector('#buttonQuestion').addEventListener('click', getTrivia)
function getTrivia(){
    //clear the previous answer choices and correct answer
    document.querySelector('span').innerHTML = ""
    document.querySelector('#correctAnswer').innerHTML = ""
    
    //get the category from the dom
    let category = document.querySelector('#categorySelection').value
    
    fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`)
    .then( res => res.json())
    .then( data => {
        console.log(data)
        let difficulty = data.results[0].difficulty
        let question = htmlDecode(data.results[0].question)
        let answer = htmlDecode(data.results[0].correct_answer)

        document.querySelector('#difficulty').innerText = (`Difficulty Level: ${difficulty}`)
        document.querySelector('#question').innerText = (`Question: ${question}`)  
        
        //prepare the answer choices list. add the CR to the incorrect answers, then randomize order.
        answerChoices = (data.results[0].incorrect_answers)
        answerChoices.push(data.results[0].correct_answer)
        answerChoices = randomizeChoices(answerChoices)
        
        //Write to the dom the answer choices in a list
        for (let i=0; i<answerChoices.length; i++){
            document.querySelector('span').innerHTML += (`<li>${answerChoices[i]}</li>`)
        }
        
        document.querySelector('#buttonAnswer').style.display = 'block'
        document.querySelector('#buttonAnswer').addEventListener('click', showAnswer)
        function showAnswer(){
            document.querySelector('#correctAnswer').innerText = (`The answer is: ${answer}`)
        }

    })
    .catch(err => {
        console.log(`error ${err}`)  
    });
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function randomizeChoices(array){
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }