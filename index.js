const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


let articleHearts = document.querySelectorAll(".like");
const body = document.querySelector('body')
const ol = document.querySelector('ol')
const find_word_buttn = document.querySelector('#find_word')
const form_to_search = document.querySelector('#form_to_search')
const container = document.querySelector('.container')

let selectedDef = ''
let partOfSpeech = ''
let word = ''
let examples = []
let wordPronounce = ''
let exampleArr = []
let wordImg = ''
let imgArr=[]
let word_id=''
const find_users_word_button = document.querySelector("#find_users_word")
const loginUserButton = document.querySelector("#loginUserButton")
const createUserButton = document.querySelector("#createUserButton")
const loginUserSection = document.querySelector("#loginUserSection")
const createUserSection = document.querySelector("#createUserSection")

loginUserButton.addEventListener("click", renderLoginForm)

function renderLoginForm(event) {
    loginUserSection.innerHTML = `
  <form id="loginUserForm" class="homeForm">
  <input id="loginUserFormInput" type="text" name="loginUser" placeholder ="name" autocomplete="off" />
  <button id="loginUserSubmitButton" type="submit"> Login User </button>
  </form>
  `
    let loginUserSubmitButton = document.querySelector("#loginUserSubmitButton")

    loginUserSubmitButton.addEventListener("submit", event => {
        event.preventDefault()

        let name = document.querySelector("#loginUserFormInput").value

        fetch(`http://localhost:3000/users`)
            .then(resp => resp.json())
            .then(renderUser)
    })
}
createUserButton.addEventListener("click", renderCreateForm)

function renderCreateForm(event) {

    event.preventDefault()
    
    //ol.innerHTML=''
    
    createUserSection.innerHTML = `
  <form id="createUserForm" class="homeForm">
  <input id="createUserFormInputName" type="text" name="name" placeholder="Name" autocomplete="off" />
  <input id="createUserFormInputEmail" type="text" name="email" placeholder="E-mail" autocomplete="off" />
  <input id="createUserFormInputPassword" type="text" name="password" placeholder="Password" autocomplete="off" />
  <button id="createUserSubmitButton" type="submit"> Create User </button>
  </form> 
  `
    let createUserSubmitButton = document.querySelector("#createUserSubmitButton")

    createUserSubmitButton.addEventListener("submit", event => {
        event.preventDefault()
        console.log("CreateUserSubmit")
        let name = document.querySelector("#createUserFormInputName").value
        let email = document.querySelector("#createUserFormInputEmail").value
        let password = document.querySelector("#createUserFromInputPassword").value
        
        fetch(`http://localhost:3000/users`,{
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(resp => resp.json())
            .then(console.log)
    })
}
function renderUser() {
    console.log("Slap the current user on dom! See comment below.")
    // document.querySelector("#renderCurrentUser")
}

function fetchImg() {
    const key = "13585259-8c63b3b95ff4e2aedcd1c4d03"
    fetch(`https://pixabay.com/api?q=${word}&key=${key}`)
        .then(res => res.json())
        .then(res => {
            imgArr = res.hits
            console.log(imgArr)
            wordImg = imgArr[[Math.floor(Math.random() * imgArr.length)]].largeImageURL})
}
let user_id=1
find_users_word_button.addEventListener('click', fetchMyWords)

function fetchMyWords() {
    ol.innerHTML = ''
    fetch(`http://localhost:3000/my_words`, {
        method: 'POST',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            id: user_id,
           
        })
    })
        .then(res => res.json())
        .then(wordsObj => wordsObj.forEach(slapMyWordsOnDOM))
}

function slapMyWordsOnDOM(wordObj){

    
    ol.innerHTML += `<li class='my-Word' data-id=${wordObj.id}><div>${wordObj.name}</div><div>${wordObj.definition}</div></li>`

}

ol.addEventListener('click', showMyWord)

function showMyWord(event){
    event.preventDefault()
    if (event.target.parentElement.className =='my-Word' ){
        fetchMyWord(event)
    }
}

function fetchMyWord(event){
    ol.innerHTML = ''
let word_id=event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/words/${word_id}`)
        .then(resp => resp.json())
        .then(slapMyWordOnDOM)
}
function slapMyWordOnDOM(wordObj){
    body.background = wordObj.imgurl
    ol.innerHTML += `<p class='my-Word' data-id=${wordObj.id}><h2>${wordObj.name}</h2></p>
    <p>${wordObj.definition}</p>
    <p>${wordObj.example}</p>
   
    `
   
   
}
function bodyImg(image) {
   
        wordImg = image
        body.background = wordImg
   
       
   
}     
let currentInterval
function slapOneOnTheDom(wordObj) {
    exampleArr=[]
    if (Object.keys(wordObj)[0] != 'success') {
       
        bodyImg(wordImg)
        word = wordObj.word
        wordPronounce = wordObj.pronunciation.all

        ol.innerHTML = ''

        ol.innerHTML += `<h2>${word[0].toUpperCase() +
            word.slice(1)} [${wordPronounce}] - definition:</h2> `

        const li = document.createElement('li')

        partOfSpeech = ''

        wordObj.results.forEach(res => {
            partOfSpeech = res.partOfSpeech
            ol.innerHTML += ` <li> <div class='word-def'>${res.definition[0].toUpperCase() +
                res.definition.slice(1)}</div><div class='word-speech-part'>${partOfSpeech}</div></li>`

            if (res.examples) {
                examples = res.examples

                examples.forEach(ex => {
                    ol.lastElementChild.innerHTML += `Example:<div class='word-example'>  ${ex[0].toUpperCase() + ex.slice(1)}</div>
                 `
                })

            }


            ol.lastElementChild.innerHTML += `<div class="like">Like! <span class="like-glyph">&#x2661;</span></div>`
            ol.lastElementChild.style.cursor = "pointer"
        })
    
        imgArr.forEach(img => {
            
            if (currentInterval){clearInterval(currentInterval)}
            currentInterval = setInterval(function(){
                wordImg = imgArr[[Math.floor(Math.random() * imgArr.length)]].largeImageURL
                console.log(imgArr.length)
                body.background = wordImg;
            }, 4000);
        });
    }

    else {
        
         ol.innerHTML = `${wordObj.message}!!!`
        body.background = "https://sarahspetcare.net/wp-content/uploads/2019/08/surprised-looking-dog_1600.jpg"
        

    }
  
  
}

ol.addEventListener('click', likeCallback)

// for (let glyph of articleHearts) {
//     glyph.addEventListener("click", likeCallback);
// }

function likeCallback(event) {
    event.preventDefault()
    let heart = event.target
    let li = event.target.parentElement.parentElement
    
    if (event.target.className == 'like-glyph') {
        if (heart.innerText != FULL_HEART){
        heart.innerText = FULL_HEART;
        heart.style.color = 'red';

        selectedDef = li.querySelector('.word-def').innerText

        partOfSpeech = li.querySelector('.word-speech-part').innerText
        examples = li.querySelectorAll('.word-example')


        // console.log(word)
        // console.log(wordPronounce)
        // console.log(partOfSpeech)
        // console.log(selectedDef)
        // console.log(examples)
        if (examples.length>0) {
            
             examples.forEach(ex => {
                 
                exampleArr.push(ex.innerText)
                 
            })
            //  console.log(`${exampleArr}`)
        }
        let word_inst = {
            name: word,
            imgurl: wordImg,
            definition: selectedDef,
            example: JSON.stringify(exampleArr),
            user_id: 1
        }
        // let data = new FormData();
        // data.append('json', JSON.stringify(word_inst))
        fetch('http://localhost:3000/words', {
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(word_inst)


        })
            .then(res => res.json())

            .then(res=> {word_id=res.id})
         }

        else if (heart.innerText == FULL_HEART){

            heart.innerText = EMPTY_HEART;
            heart.style.color = 'wight';

            fetch(`http://localhost:3000/words/${word_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(console.log)

        }
        }
        
}

form_to_search.addEventListener('submit', fetch_requested_word)

    function fetch_requested_word(event) {
        event.preventDefault()
        word = event.target.title.value
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
            headers: {
                "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
                "X-RapidAPI-Key": "aa20248760msh1c4f23b66ef7462p148d17jsn43c5769c9e8b"
            }
        })
        .then(response => response.json())
        .then(slapOneOnTheDom)

        fetchImg()

}

      
