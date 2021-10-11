
const body = document.querySelector('body'); 
const button = document.querySelector('button'); 
const wordContainer = document.querySelector('.word-container'); 
const word = document.createElement('h1'); 
const definition = document.createElement('p'); 
body.appendChild(wordContainer); 
wordContainer.appendChild(word); 
wordContainer.appendChild(definition); 

const randomWord = () => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => {
        return response.json(); 
    })
    .then(response => {
        word.textContent = response
        randomDefinition(word);
        wordContainer.classList.remove('display-none'); 
    })
    .catch(err => {
        console.log(err); 
        word.textContent = "No Word Available"
    }); 
}

const randomDefinition = (word) => {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=8b95977a-4461-458c-8855-94e2f7bb50a5`)
    .then(response => {
        return response.json(); 
    })
    .then(response => {
        console.log(response[0].shortdef[0]); 
        definition.classList.remove('error'); 
        definition.textContent = "Definition: " + response[0].shortdef[0]; 
    })
    .catch(err => {
       console.log(err); 
       definition.classList.add('error'); 
       definition.textContent = "No Definition Available"; 
    });

}

button.addEventListener('click', function(){
    randomWord(); 
})