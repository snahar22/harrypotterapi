const characterChoice = document.getElementById('userInput');
const characterList = document.getElementById('listOfCharacters');
let allCharacters = [];

characterChoice.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);

const filteredThrough = allCharacters.filter((character) => {
    // console.log(Object.keys(character))
    const hasSearchTerm = (Object.keys(character)).find(key => {
      return typeof(character[key]) === 'string' &&
      character[key].toLowerCase().includes(searchString);
    })
    return Boolean(hasSearchTerm);
  });
    showCharacters(filteredThrough);
});

const userAction = async () => {
 const response = await
     fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(output => {
     allCharacters = output;
   // console.log(allCharacters);
    showCharacters(allCharacters);
})
   .catch((error) => {
   console.log('error');
})
}

const showCharacters = (characters) => {
  const sortData = characters.map((character) => {
    return `
    <li class="character">
    <h2>${character.name}</h2><br/>
    <p>Gender:${character.gender}<br/>
    Alive:${character.alive}<br/>
    House:${character.house}<br/>
    Date Of Birth:${character.dateOfBirth}<br/>
    Year:;${character.yearOfBirth}<br/>
    Ancestry:${character.ancestry}<br/>
    EyeColour:${character.eyeColour}<br/>
    Patronus:${character.patronus}<br/>
    Actor:${character.actor}</p>
    <img src="${character.image}"></img>
    </li>
    `;
  })
  .join('');
  characterList.innerHTML = sortData;
};

userAction();