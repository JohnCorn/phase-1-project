/*
=== TODO ===
• Pull in date from MTA api
• Display each subway line
• Click on a line to see all the stations
• Click on a station to see the times
*/

let fetchedData;

//#region SetUp
window.addEventListener("DOMContentLoaded", (event) => 
{    
    const dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('change', event => DropDownChange(event.target.value));

    GetAllBurgers(dropdown);
  });

function GetAllBurgers(dropdown)
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
            let option = document.createElement('option');
            option.value = i;

            let displayText = SplitName(data[i].name);
            option.innerText = displayText[0];

            dropdown.append(option);
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
    let burgerInfo = document.getElementById('burgerInfo');

    // clear out old info
    burgerInfo.innerHTML = '';    

    let burgerName = SplitName(data.name);

    // Set Up burger name
    let nameHeader =  document.createElement('h1');
    nameHeader.textContent = burgerName[0];
    infoCard.append(nameHeader);

    // Set Up burget details
    if (burgerName.length > 1)
    {
        let detailHeader =  document.createElement('h3');
        detailHeader.textContent = burgerName[1];
        infoCard.append(detailHeader);
    }

    // Set Up price
    let priceHeader =  document.createElement('h3');
    priceHeader.textContent = data.price;
    infoCard.append(priceHeader);
}

function EpisodeCardSetUp(data)
{
    let episodeInfo = document.getElementById('episodeInfo');

    // clear out old info
    episodeInfo.innerHTML = '';
    /*TODO:
    - season
    -eposide #
    -eposide title?
    - more info btn
    */
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