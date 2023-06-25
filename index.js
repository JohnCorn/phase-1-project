const data = () => {
    return {
        data:{
            isOpen: true,
        }
    }
}

let pokemonData = [];

window.addEventListener('keypress', event => ToggleScreen(event));

window.addEventListener("DOMContentLoaded", (event) => {
    //console.log("DOM fully loaded and parsed");
    SetUp();
  });

  function SetUp()
  {
    // Get all the URLs
    let urls = GetSetAllPokemonURL()
    .then(res => {
        let a = GetPokemonData(res)
        .then(data => 
        {
            for(let i = 0; i < data.length; i++)
            {
                console.log(data[i].sprite)
            }
        });
    })

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

  

  function ToggleScreen(event)
  {
    if (event.key == 'e'){
        data.isOpen = !data.isOpen;
        console.log(`data.isOpen`, data.isOpen);
    }
  }