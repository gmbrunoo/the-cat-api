
let globalCats = []
let origem = null
let temperamento = null

const url = "http://localhost:9001/hats"

window.addEventListener('load', () => {

    fetchCats()   
});

async function fetchCats() {
    const res = await fetch(url);
    const json = await res.json();
    
    const cats = json.map(( cats ) => {
      const {id, url} = cats;
      return {
        id,
        url 
      }
    });

    globalCats = cats;
    renderCats()
}

function renderCats(origin, temperament) {
   
    let cats = globalCats

    console.log(cats)
    const lisCats = cats.reduce((accumulator, cats) => {
        accumulator += `
                <div class="cardd" id="${cats.id}">
                    <div class="face front">
                        <div class="content">
                            <div class="imgBx">
                                <img load="lazy" alt="${cats.id}" src="${cats.url}">
                            </div>
                        </div>
                    </div>
                </div>
                `
                return accumulator
            }, '')

    const ul = document.querySelector('[data-js="cats"]')
    ul.innerHTML = lisCats
}