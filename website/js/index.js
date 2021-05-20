let globalCats = []
let origem = null
let temperamento = null

const url = "http://localhost:9001/cats"

window.addEventListener('load', () => {

    fetchCats()
    selectCat()
    filter()
   
});

async function fetchCats() {
    const res = await fetch(url);
    const json = await res.json();
    
    const cats = json.map(( cats ) => {
      const {id, name, origin, temperament, description, img1, img2, img3} = cats;
      return {
        id,
        name,
        origin,
        temperament,
        description,
        img1,
        img2,
        img3
      }
    });

    globalCats = cats;
    //console.log(cats)
    //const asd = JSON.stringify(globalCats)
    //console.log(asd);

    renderCats()
    renderFilterOrigin()
    renderFilterTemperament()
}
 
function renderFilterOrigin() {

    let html = ""
    let cats = globalCats

    let origins = [];

    cats.forEach(cat => {
        origins.push(cat.origin);
    })
    
    origins = [...new Set(origins)];

    //console.log(origins);
  
    origins.forEach((origin) =>{

        const test =  `
            <option class="selectOr" value ="${origin}">${origin}</option>
        `;
        html += test
    })

    const temperament = document.querySelector('[data-js="selectOrigin"]')
    temperament.innerHTML += html
}

function renderFilterTemperament() {

    let html = ""
    let cats = globalCats

    const selectTemperament = cats.reduce((accumulator, cats) =>{
    accumulator += cats.temperament + ","
    
    return accumulator
    }, '')

   
    const separando = selectTemperament.split(",")
    const semRepetir = [...new Set(separando)];

    semRepetir.forEach((temperament) =>{

        const test =  `
            <option class="selectOr" value ="${temperament}">${temperament}</option>
        `;
        html += test
    })

    const temperament = document.querySelector('[data-js="selectTemperament"]')
    temperament.innerHTML += html

    //console.log(html)
}

function selectCat(){
        
    origem = Array.from(document.querySelectorAll('#selectOrigin')).map( cond => {
        return {
          condiction: cond.value
        }
    });

    temperamento = Array.from(document.querySelectorAll('#selectTemperament')).map( cond => {
        return {
          condiction: cond.value
        }
      });

    //console.log(origem, temperamento)
    
   renderCats(origem, temperamento)
}

function renderCats(origin, temperament) {
    const condictionOrigin = origem[0].condiction;
    const condictionTemperament = temperamento[0].condiction;
 
    let cats = [];

    if (!condictionOrigin && !condictionTemperament) {
        cats = [...globalCats];

    } else if (condictionOrigin && !condictionTemperament) {
        const filteredCats = globalCats
        .filter(cat => cat.origin === condictionOrigin);
        cats = [...filteredCats];

    } else if (!condictionOrigin && condictionTemperament) {
        const filteredCats = globalCats
        .filter(cat => cat.temperament.includes(condictionTemperament));
        cats = [...filteredCats];

    } else if (condictionOrigin && condictionTemperament) {
        const filteredCats = globalCats
        .filter(cat => cat.origin === condictionOrigin && cat.temperament.includes(condictionTemperament));
        cats = [...filteredCats];
    }
    
    
    const lisCats = cats.reduce((accumulator, cats) => {
        accumulator += `
            <div class="cardd" id="${cats.name}">
                <div class="face front">
                  <div class="content">
                    <div class="imgBx">
                      <img load="lazy" alt="${cats.name}" src="${cats.img1}">
                    </div>
                    <div class="contentBx">
                      <h3>${cats.name}</h3> 
                      <h3><span>${cats.origin}</span></h3>
                    </div>
                    <div class="temperamento">
                      <h3><span>${cats.temperament}</span></h3>
                    </div>
                  </div>
                </div>
                <div class="face back">
          
                  <div class="content">
                    <div class="imgBx">
                      <img  load="lazy" alt="${cats.name}" src="${cats.img2}">
                      <img class="" load="lazy" alt="${cats.name}" src="${cats.img3}">
                    </div>
                    <div class="descricao">${cats.description}</div>
                  </div>
                </div>
              </div>`
               
                return accumulator
            }, '')
            
    // console.log(lisCats);

    const ul = document.querySelector('[data-js="cats"]')
    ul.innerHTML = lisCats
    
}

function filter(){

    const searchText = document.querySelector('#filterName')

    searchText.addEventListener('keyup', function(e){
        const searchFilter =  e.target.value.toLowerCase().trim();
        let cards = document.querySelectorAll('.cardd');

        //console.log(cards);

        cards.forEach(card=>{
            if(card.id.toLowerCase().includes(searchFilter)){
                card.style.display = 'inline-block';
            }else{
                card.style.display = 'none';
            }
        });
    }
)}