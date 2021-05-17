let globalDevelopers = [];
let globalResults = [];

let resultsCount = 0;

let filterName = null;
let filterLanguages = null;
let filterCondictions = null;

let tabResults = null;

window.addEventListener('load', () => {
  tabResults = document.querySelector('#results');
  resultsCount = document.querySelector('.results-title-count');

  setCondictions();
  fetchDevelopers();
  handleFilterName();
  handleFilterButtons();
  handleCondictionButtons();
});

function handleFilterName() {
  document.querySelector("#filterName").addEventListener('change', ( ) => searchData());
}

function handleFilterButtons() {
  const filters = document.querySelectorAll('.languages');
  filters.forEach( filter => {
    filter.addEventListener('click', () => searchData());
  })
}

function handleCondictionButtons() {
  const condictions = document.querySelectorAll('.condiction');
  condictions.forEach( cond => {
    cond.addEventListener('click', () => searchData());
  })
}

function searchData() {
  setCondictions();
  const search = removeAcentos(filterName.value.trim().replace(/ /g,'').toLowerCase());
  const condiction = filterCondictions[0].condiction;
  const filter = filterLanguages.map( lang => lang.condiction);
  const hasSearch = search.length > 0;
  let results = globalDevelopers;

  if ( hasSearch ) {
    results = globalDevelopers.filter( developer => {
      const { pesquisa } = developer;
      const condic = new RegExp(search,'g');
      const tem = pesquisa.match(condic);
      return ( tem != null && tem.length > 0);
    });
  }

  results = results.filter( developer => {
    return hasLanguagesFiltered(condiction, developer );
  });

  globalResults = results;

  render();
  
}

function hasLanguagesFiltered(condiction, developer) {
  const langs =  filterLanguages.map( lang => lang.condiction);
  const count = developer.languages.reduce( (acum, curr) => {
      const tem = langs.some(lang => lang.toUpperCase() === curr.id.toUpperCase() );
      return tem ? ++acum : acum;
    }, 0);
  if ( condiction === "AND" ) {
    return langs.length === count;
  }
  return count !== 0;
}

function setCondictions() {
  filterName = document.querySelector('#filterName');
  
  filterLanguages = Array.from(document.querySelectorAll('.languages')).filter( cond => {
    return cond.checked === true;
  }).map( cond => {
    return {
      condiction: cond.value
    }
  });
  
  filterCondictions = Array.from(document.querySelectorAll('.condiction')).filter( cond => {
    return cond.checked === true;
  }).map( cond => {
    return {
      condiction: cond.value
    }
  });
  console.log(filterName, filterCondictions, filterLanguages);
}

async function fetchDevelopers() {
  const res = await fetch('http://localhost:3001/devs');
  const json = await res.json();
  
  const devs = json.map(( devs ) => {
    const { name, picture, programmingLanguages} = devs;
    return {
      name,
      picture,
      languages: programmingLanguages,
      pesquisa: removeAcentos(name.trim().replace(/ /g,'').toLowerCase())
    }
  });
  
  globalDevelopers = devs;

  searchData();
}

function render() {
  renderResults();
}

function renderDeveloperLanguages(developer) {
  return developer.reduce((acum, curr) => {
      const { id, language, experience } = curr;
      return acum += `
        <img class='img-language' src='../images/${language.toLowerCase()}.png' 
        alt='${id}'>
      `;
    }, '');
}

function renderResults() {
  let HTMLResults = "";

  resultsCount.innerHTML = globalResults.length;

  globalResults.forEach(( dev ) => {
    const { name, picture, languages } = dev;
    
    const langs = renderDeveloperLanguages(languages);

    const HTMLDeveloper = `
      <span class='developer'>
        <img class='img-developer' src='${picture}' alt='${name}'>
        <div class='devepoper-data'>
          <p class='developer-data-name'>${name}</p>
          <p>${langs}</p>
        </div>
      </span>
    `;
    HTMLResults += HTMLDeveloper;
  })

  tabResults.innerHTML = HTMLResults;
}






// async function fetchCats() {
//     const res = await fetch('https://api.thecatapi.com/v1/breeds');
//     const json = await res.json();
    
//     const cats = json.map(( cats ) => {
//       const { name, origin, temperament, description, reference_image_id} = cats;
//       return {
//         name,
//         origin,
//         temperament,
//         description,
//         reference_image_id
//       }
//     });

//     console.log(cats)
    
//     globalCats = cats;
// }
