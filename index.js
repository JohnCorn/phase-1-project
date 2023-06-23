/*
=== TODO ===
• Pull in date from MTA api
• Display each subway line
• Click on a line to see all the stations
• Click on a station to see the times
*/

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    GetDisplayStationNames();
  });

  

  function GetDisplayStationNames()
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

        for(let i = 0; i < data.length; i++)
        {
            console.log(data[i].name);
        }
    });
}