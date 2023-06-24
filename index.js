let fetchedData;
let burgerInfo;
let episodeInfo;
let dropdownIsOpen = false;


//#region Initialization
const handleEscape = e => {
    if (e.key ==='Esc'|| e.key === 'Escape')
        ToggleDropDown(false);
}

window.addEventListener("DOMContentLoaded", (event) => 
{    
    document.getElementById('dropdownBtn').addEventListener('click', event => {
        ToggleDropDown(!dropdownIsOpen);
    });

    document.addEventListener('keydown', handleEscape);

    burgerInfo  = document.getElementById('burgerInfo');
    episodeInfo = document.getElementById('episodeInfo');
    GetAllBurgers();
  });

function GetAllBurgers()
{
    let url = 'https://bobsburgers-api.herokuapp.com/burgerOfTheDay/';
    
    fetch(url,
    {
        method: "GET",
        headers:
        { 
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {

        fetchedData = data;
        // Loop though all the data and pull out the burger name and add it to the drop down
        for(let i = 0; i < fetchedData.length; i++)
        {
            const ddMenu = document.getElementById('ddMenu');

            let option = document.createElement('a');
            // <a href="#" class="block px-4 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white">Test 1</a>
            option.classList = "block px-4 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white";
            option.href = "#";
            let displayText = SplitName(data[i].name);

            option.innerText = displayText[0];
            ddMenu.append(option);

            option.addEventListener('click', event => {
                DropDownChange(i);
                ToggleDropDown(false);
            });
        }
    });
}
//#endregion

function DropDownChange(value)
{
    BurgerCardSetUp(fetchedData[value]);
    EpisodeCardSetUp(fetchedData[value]);
}

function BurgerCardSetUp(data)
{
    // clear out old info
    burgerInfo.innerHTML = '';    

    let burgerName = SplitName(data.name);

    // Set Up burger name
    let nameHeader =  document.createElement('h1');
    nameHeader.textContent = burgerName[0];
    burgerInfo.append(nameHeader);

    // Set Up burget details
    if (burgerName.length > 1)
    {
        let detailHeader =  document.createElement('h3');
        detailHeader.textContent = burgerName[1];
        burgerInfo.append(detailHeader);
    }

    // Set Up price
    let priceHeader =  document.createElement('h3');
    priceHeader.textContent = data.price;
    burgerInfo.append(priceHeader);
}

function EpisodeCardSetUp(burgerData)
{
    // clear out old info
    episodeInfo.innerHTML = '';

    fetch(burgerData.episodeUrl,
    {
        method: "GET",
        headers:
        { 
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(episodeData => {

        let titleHeader = document.createElement('h3');
        titleHeader.textContent = episodeData.name;
        episodeInfo.append(titleHeader);

        // Set Up episode title
        let seasonHeader = document.createElement('h3');
        seasonHeader.textContent = `Season: ${episodeData.season} Episode: ${episodeData.episode}`;
        episodeInfo.append(seasonHeader);

        let moreInfoBtn = document.createElement('button');
        moreInfoBtn.textContent = 'More Info';
        moreInfoBtn.addEventListener('click', event => {
            window.open(episodeData.episodeUrl);
        });
        episodeInfo.append(moreInfoBtn);
    } );
}

function SplitName(fullName)
{
    let nameArray = [];
    
    let splitName = fullName.split(" - ");
    nameArray.push(splitName[0].toUpperCase());

    if (splitName.length > 1)
        nameArray.push(splitName[1].toLowerCase());

    return nameArray;
}

function ToggleDropDown(isOpen)
{
    // dont toggle drop down if current state is called
    if (isOpen == dropdownIsOpen)
        return;

    dropdownIsOpen = isOpen;
    console.log(`dropDownIsOpen: `, isOpen);

    let ddMenu = document.getElementById('ddMenu');
    if(ddMenu.classList.contains('hidden'))
    {
        ddMenu.classList.remove('hidden');
    }else{
        ddMenu.classList.add('hidden');
    }
}