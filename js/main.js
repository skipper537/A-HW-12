const LOADER = document.getElementById('stage');
const HEADER = document.querySelector('header');
const PEOPLES = document.querySelector('.peoples ');
const PEOPLES__HEADER = document.querySelector('.peoples__header ');
const PLANETS__HEADER = document.querySelector('.planets__header ');
const PLANETS = document.querySelector('.planets');
const PAGINAT = document.querySelector('.pagination');
const PREV = document.querySelector('.prev');
const NEXT = document.querySelector('.next');
const PAGE = document.querySelector('.page');
const WOOKIE_TRANSLATE = document.querySelector('.wookie__translate');
let currentFilm = 2;
let currentPage = 1;
let wookieChek = false;
PEOPLES__HEADER.innerHTML = 'Film №' + currentFilm;

setTimeout(() => {
   LOADER.classList.add('disactive');
   PAGINAT.classList.remove('disactive');
   PEOPLES__HEADER.classList.remove('disactive');
   PLANETS__HEADER.classList.remove('disactive');
   HEADER.classList.remove('disactive');
   loadPerson();
   currentTranslate()
}, 10_000)

async function loadPerson() {
   await axios(`https://swapi.dev/api/films/${currentFilm}`)
      .then((response) => {

         response.data.characters.map((link) => {
            axios(link)
               .then((response) => {
                  let arr = response.data.url.split('/');
                  let id = arr[5];
                  PEOPLES.insertAdjacentHTML("afterbegin",
                     ` 
                     <div class="person">
                     <img class = "person__img"  src="https://starwars-visualguide.com/assets/img/characters/${id}.jpg">
                        <p class= "Name:" > ${response.data.name} </p >
                     <p class="Birth year:">${response.data.birth_year} </p>
                     <p class="Gender:">${response.data.gender} </p>
                     </div >
                        `
                  )
               })
         })
      })
}
document.querySelector('.input__button').addEventListener('click', () => {
   currentFilm = document.querySelector('.number-film').value;
   PEOPLES.innerHTML = '';
   PEOPLES__HEADER.innerHTML = '';
   PEOPLES__HEADER.innerHTML = 'Film №' + currentFilm;
   loadPerson(currentFilm);

})
async function loadPlanet() {

   await axios(`https://swapi.dev/api/planets/?page=${currentPage}`)
      .then((response) => {

         response.data.results.map(({ name }) => {
            PLANETS.insertAdjacentHTML("afterbegin",
               `
            <div  class = " planet" >
             ${name} 
            </div>
            `
            )
         })
      })

}
async function loadWookiePlanet() {
   const params = new URLSearchParams([["format", "wookiee"]]);

   await axios(`https://swapi.dev/api/planets/?page=${currentPage}`, { params })
      .then((response) => {
         let planets = response.data
         if (typeof planets === "string") {
            planets = JSON.parse(planets.replace(`whhuanan`, ` "whhuanan" `))
         }
         planets.rcwochuanaoc.map(({ whrascwo }) => {
            PLANETS.insertAdjacentHTML("afterbegin",
               `
            <div  class = " planet" >
             ${whrascwo} 
            </div>
            `
            )
         })
      })
}
function currentTranslate() {
   if (wookieChek) {
      return loadWookiePlanet();
   } else
      resizeTo = loadPlanet();
}
WOOKIE_TRANSLATE.addEventListener('click', () => {
   if (wookieChek) {
      wookieChek = false;
      WOOKIE_TRANSLATE.innerHTML = '';
      WOOKIE_TRANSLATE.innerHTML = 'Wookie';
      PLANETS.innerHTML = '';
      currentTranslate();
   } else {
      wookieChek = true;
      WOOKIE_TRANSLATE.innerHTML = '';
      WOOKIE_TRANSLATE.innerHTML = 'English';
      PLANETS.innerHTML = '';
      currentTranslate();
   }
})
NEXT.addEventListener('click', () => {
   currentPage++;
   PLANETS.innerHTML = '';
   PAGE.innerHTML = '';
   PAGE.innerHTML = currentPage;
   currentTranslate()
})
setInterval(() => {
   if (currentPage === 1) {
      PREV.classList.add('disactive');
   } else
      PREV.classList.remove('disactive');
   if (currentPage === 5) {
      NEXT.classList.add('disactive');
   } else
      NEXT.classList.remove('disactive');

}, 100)
PREV.addEventListener('click', () => {
   currentPage--;
   PLANETS.innerHTML = '';
   PAGE.innerHTML = currentPage;
   currentTranslate()
})