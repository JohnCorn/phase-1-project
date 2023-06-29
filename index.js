let pokemonData = [];

window.addEventListener("resize", () =>
{
  console.log(`h:${window.innerHeight}, w:${window.innerWidth}`);
});


window.addEventListener("DOMContentLoaded", (event) => 
{
    let a = GetPokemonData()
    .then(res => {
      pokemonData = res;
      DisplayCards();
    });

    document.getElementById('closeBtn').addEventListener('click', event => ToggleSlide(false));
  });

  async function GetPokemonData()
  {
    let p =[];
    for(let i = 1; i <= 20; i++)
    {
        let a = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`,
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

  //#region static card display
  function DisplayCards()
  {
    const cardLayout = document.getElementById('CardLayout');

    pokemonData.forEach((n, i) => 
    {
      const cardInfo = CreateCardGroup(cardLayout, i);

      // create and setups up background and image for portait
      const portraitHolder =  CreatePortraitHolder(n);    
      cardInfo.append(portraitHolder);

      // create name header
      const namePlate = CreateNamePlate(n);
      cardInfo.append(namePlate);
    });
  }

  function CreateCardGroup(cardLayout, index)
  {
    // create div to hold the card
    const cardHolder = document.createElement('div');
    cardLayout.append(cardHolder);

    const card = document.createElement('div');
    card.classList =
      "p-6 rounded-3xl border-4 border-white bg-neutral-100 flex gap-5 items-center shadow-xl"
    + " hover:shadow-xl hover:shadow-black transition-shadow duration-250 ease-out"
    + " cursor-pointer hover:p-4"
    + " hover:-translate-y-2 hover:border-8 hover:border-orange-300 hover:bg-yellow-100 ";
    cardHolder.append(card);    
    
    // add event listner for when it's clicked
    card.addEventListener('click', event => {
      PopOutCardSetUp(index);
      ToggleSlide(true)
    });

    const cardInfo = document.createElement('div');
    cardInfo.classList ="relative flex justify-center";
    card.append(cardInfo);

    return cardInfo;
  }
  
  function CreateNamePlate(pokeData)
  {
    const nameHolder = document.createElement('div');
    nameHolder.classList ='object-contain';

    const nameBackground = document.createElement('div');
    nameBackground.classList = 'bg-gray-500 text-white font-semibold rounded-full px-3 py-0.5'
    //nameBackground.style = 'background-color: #194c89;'
    nameHolder.append(nameBackground);

    const nameHeader = document.createElement('span');
    nameHeader.textContent = pokeData.species.name;
    nameBackground.append(nameHeader);

    return nameHolder;
  }

  // TODO: find a better name for the parameter
  function CreatePortraitHolder(pokeData)
  {
    const portraitHolder = document.createElement('div');
    portraitHolder.classList = 'h-16 w-16 overflow-hidden rounded-full bg-gray-300 flex items-center justify-center'

    // create portrait image 
    const portraitImage = document.createElement('img');
    portraitImage.src = pokeData.sprites.front_default;
    portraitImage.classList = 'h-9/10 w-9/10 object-cover';

    portraitHolder.append(portraitImage);

    return portraitHolder;
  }
  //#endregion

  //#region  PopOut
  function PopOutCardSetUp(index)
  {
    document.getElementById('innerName').textContent = pokemonData[index].name;
    document.getElementById('innerPortrait').src = pokemonData[index].sprites.front_default;  
    
    const typeHolder = document.getElementById('TypeHolder');

    // clear out old values
    typeHolder.innerHTML ='';

    for(let i = 0; i < pokemonData[index].types.length; i++)
    {
      let typeName = pokemonData[index].types[i].type.name;

      const holder = document.createElement('div');
      const typeColor = GetTypeColorString(typeName);

      holder.classList =`text-center rounded-full text-white ${typeColor} font-semibold`;
      const typeText = document.createElement('span');
      typeText.innerText = pokemonData[index].types[i].type.name;

      holder.append(typeText);
      typeHolder.append(holder);
    }

    // Move sets
    const moveHolder = document.getElementById('moveHolder');

    // clear out old values
    moveHolder.innerHTML = '';

    for(let i = 0; i < pokemonData[index].moves.length; i++)
    {
      const move = document.createElement('li');
      move.textContent = pokemonData[index].moves[i].move.name;
      moveHolder.append(move);

      if (i >= 9)
        break;
    }
  }

  function GetTypeColorString(typeString)
  {
    let colorString = "bg-gray-500"
    switch(typeString)
    {
      case('normal'):
      colorString = "bg-yellow-500";
      break;

      case('fire'):
      colorString = "bg-orange-500";
      break;

      case('water'):
      colorString = "bg-blue-500";
      break;

      case('grass'):
      colorString = "bg-green-500";
      break;
     
      case('poison'):
      colorString = "bg-purple-500";
      break;

      case('flying'):
      colorString = "bg-rose-500";
      break;

      case('bug'):
      colorString = "bg-lime-500";
      break;

      default:
        break;
    }

    return colorString;
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
  //#endregion