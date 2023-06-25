let pokemonData = [];

window.addEventListener("DOMContentLoaded", (event) => {
    //console.log("DOM fully loaded and parsed");
    SetUp();

    document.getElementById('closeBtn').addEventListener('click', event => ToggleSlide(false));

  });

  function SetUp()
  {
    // TODO: add notes
    let urls = GetSetAllPokemonURL()
    .then(res => {
        let a = GetPokemonData(res)
        .then(data => {
          pokemonData = data;
          DisplayCards(pokemonData)
        });
    })
  }

  function DisplayCards(pokeData)
  {
    const cardLayout = document.getElementById('CardLayout');

    for(let i = 0; i < pokeData.length; i++)
    {
        // create div to hold the card
        const cardHolder = document.createElement('div');
        cardHolder.classList ="p-6 rounded-3xl border-4 border-white bg-neutral-100 flex gap-5 items-center shadow-xl"
        + " hover:shadow-xl hover:shadow-black transition-shadow duration-250 ease-out"
        + " hover:scale-105 transition-scale duration-250  ease-out cursor-pointer";

        const card = document.createElement('div');
        card.classList ="relative flex justify-center";
        cardHolder.append(card);       

        // TODO: might want to off load this to another method???
        // create background for portait
        const portraitHolder = document.createElement('div');
        portraitHolder.classList = 'h-16 w-16 overflow-hidden rounded-full bg-black flex items-center justify-center'

        // create portrait image 
        const portraitImage = document.createElement('img');
        portraitImage.src = pokeData[i].sprites.front_default;
        portraitImage.classList = 'h-9/10 w-9/10 object-cover';

        portraitHolder.append(portraitImage);
        card.append(portraitHolder);

        // create name header
        const nameHolder = document.createElement('div');
        nameHolder.className = 'rounded-full'
        nameHolder.style = 'background-color: #194c89;'

        const nameHeader = document.createElement('h1');
        nameHeader.textContent = pokeData[i].name;

        card.append(nameHolder);
        nameHolder.append(nameHeader);
        
        // add event listner for when it's clicked
        card.addEventListener('click', event => {
          SlideCardSetUp(i);
          ToggleSlide(true)
        });

        cardLayout.append(cardHolder);
    }
  }
  
  async function GetSetAllPokemonURL()
  {
    let a = await fetch(`https://pokeapi.co/api/v2/pokemon/`,
        {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
        })
        .then(res => res.json())
        .then (data => {
            return data
        });

        return a;
  }

  async function GetPokemonData(pokemon)
  {
    let p =[];
    for(let i = 0; i < pokemon.results.length; i++)
    {
        let a = await fetch(pokemon.results[i].url,
        {
        method: "GET",
        header: {
          "Content-Type": "application/json",
            },
        })
        .then(res => res.json());
        //.then(data => console.log(data));

        p.push(a);

    }
    return p;
  }

  function SlideCardSetUp(index)
  {
    console.log(`setting up:`, pokemonData[index].name);


    document.getElementById('innerName').textContent = pokemonData[index].name;

    document.getElementById('innerPortrait').src = pokemonData[index].sprites.front_default;
   
    // TODO: add nect and last buttons
  }

  function ToggleSlide(isOpen)
  {
    if (!isOpen)
    {
        document.getElementById('overlay').classList.add('hidden');
        document.getElementById('slideCard').classList.add('hidden');       
    }else
    {
        document.getElementById('overlay').classList.remove('hidden');
        document.getElementById('slideCard').classList.remove('hidden');
    }
  }