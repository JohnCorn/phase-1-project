/*
=== TODO ===
• Pull in date from MTA api
• Display each subway line
• Click on a line to see all the stations
• Click on a station to see the times
*/

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    GetDisplaySubwayLines();
  });

  function GetDisplaySubwayLines()
  {
    console.log("GetDisplaySubwayLines");
    let lineIcons = document.getElementById('LineIcons');
    // TODO: loop though all the lines and add icons to the LineIcons div
    // TODO: add event to each icon that calls GetDisplayStationNames
  }

  function GetDisplayStationNames()
  {
    console.log("GetDisplayStationNames");
    let stationNames = document.getElementById('StationNames');
    // Clear all the currently displayed stations
    stationNames.innerHTML = '';

    // TODO: fetch station names
    // Display each station, and update DOM
    // TODO: add event to each name that calls GetDisplayStationNames
  }

  function GetDisplayTrainTimes()
  {
    let trainTimes = document.getElementById('TrainTimes');
  }