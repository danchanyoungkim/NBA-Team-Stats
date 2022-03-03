const api_url = "https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2022?key=55ccc6c3c41240708737b94117caf3c4";

let dropDown = document.getElementById("dropDown");
let api_key = "l2pGA5pLy15WM8j3iHPwzwh3CgaxPYfG";
let ticketMasterUrl =
  "https://app.ticketmaster.com/discovery/v2/events.json?keyword=Chicago%20Bulls&apikey=l2pGA5pLy15WM8j3iHPwzwh3CgaxPYfG";
let eventList = document.getElementById("event-list");
let playerList = document.getElementById("player-list")

// function getTicketmaster(teamName){
// fetch ticket master api and get all events for selected team.(teamName)
// loop through the array of events.
// for each event create an li tag with a heading tag & two p tags.
// update text of heading and p-tags with event name, description? and date.
// append the list item to our emply list in html
// }

function getTicketmaster() {
  fetch(ticketMasterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      let events = data._embedded.events;
      for (let i = 0; i < events.length; i++) {
        let eventName = events[i].name;
        let eventDate = events[i].dates.start.localDate;
        let eventUrl = events[i].url;

        let eventLi = document.createElement("li");
        let eventNameEl = document.createElement("h3");
        let eventDateEl = document.createElement("p");
        let eventUrlEl = document.createElement("a");

        eventNameEl.textContent = eventName;
        eventDateEl.textContent = eventDate;
        eventUrlEl.textContent = "Buy Tickets!";
        eventUrlEl.setAttribute("href", eventUrl);

        eventLi.append(eventNameEl);
        eventLi.append(eventDateEl);
        eventLi.append(eventUrlEl);

        eventList.append(eventLi);
      }

    });
}
getTicketmaster();

dropDown.addEventListener("change", function () {
  getApi(api_url).then(function (info) {
    info.forEach((team) => {
      if (team.Name === dropDown.value) {
        teamData(team);
      }
    });
  });

});

let teamAbr = document.getElementById("teamAbr");

function teamData(team) {
  let h2Team = `<h2>${team.Name} - ${team.Team}</h2>`;
  document.getElementById("teamAbr").innerHTML = h2Team;
  let tableColumns = `<tr>
        <th>Games</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Shot %</th>
        <th>Free Throw %</th>
        <th>Rebounds</th>
        <th>Assists</th>
        <th>Steals</th>
        <th>Blocked Shots</th>
    </tr>`;

  let stats = `<tr>
        <td>${team.Games}</td>
        <td>${team.Wins}</td>
        <td>${team.Losses}</td>
        <td>${team.FieldGoalsPercentage}</td>
        <td>${team.FreeThrowsPercentage}</td>
        <td>${team.Rebounds}</td>
        <td>${team.Assists}</td>
        <td>${team.Steals}</td>
        <td>${team.BlockedShots}</td>
        </tr>`;
    tableColumns += stats
    document.getElementById("teamStats").innerHTML = tableColumns;

    
    // List of players per team selected in dropdown.
    const apiUrl3 = "https://api.sportsdata.io/v3/nba/scores/json/Players/"+(team.Team)+"?key=13be218e384a4c4db81b4be3782d2c16"
        getApi(apiUrl3).then(function (data) {
            playerList.innerHTML = "";
            let playerColumns2 = document.createElement("tr");
            let players = document.createElement("th");
            let playerNum = document.createElement("th");
            let playerPos = document.createElement("th");
            let playerHeight = document.createElement("th");
            let playerWeight = document.createElement("th");
            let playerBd = document.createElement("th");
            let playerExp = document.createElement("th");
            let playerCollege = document.createElement("th");
            let playerSalary = document.createElement("th");
            players.textContent = "Player"
            playerNum.textContent = "#"
            playerPos.textContent = "Pos"
            playerHeight.textContent = "Height"
            playerWeight.textContent = "Weight"
            playerBd.textContent = "Birthdate"
            playerExp.textContent = "Exp (Year)"
            playerCollege.textContent = "College"
            playerSalary.textContent = "Salary ($)"
            playerColumns2.append(players, playerNum, playerPos, playerHeight, playerWeight, playerBd, playerExp, playerCollege, playerSalary)
            playerList.append(playerColumns2);
            data.forEach(player => {
                
                // If value equals null for either jersey or salary, then display text "N/A".
                let nullJersey = player.Jersey;
                let nullSalary = player.Salary;
                    if (nullJersey == null) {
                        // If true, then "N/A" will replace the value in the table.
                        player.Jersey = "N/A";
                    }    
                    if (nullSalary == null) {
                        player.Salary = "N/A";
                    };
                
                // Converts inches to feet and inches for player.Height from apiUrl13.
                player.Height = (parseInt(player.Height/12) + "'" + Math.round(player.Height%12,1)+'"')

                // Removes last 9 characters (unneeded) for player.BirthDate from apiUrl3.
                player.BirthDate = player.BirthDate.substring(0,player.BirthDate.length-9);
                
                // If value equals 0 for years of experience in NBA, then display text "Rookie".
                let numYear = player.Experience;
                    if (numYear == 0) {
                        player.Experience = "Rookie";
                    };

                player.Salary = player.Salary.toLocaleString('en-US')
            
                let playerColumns3 = document.createElement("tr");
                let statName = document.createElement("td");
                let statNum = document.createElement("td");
                let statPos = document.createElement("td");
                let statHeight = document.createElement("td");
                let statWeight = document.createElement("td");
                let statBd = document.createElement("td");
                let statExp = document.createElement("td");
                let statCollege = document.createElement("td");
                let statSalary = document.createElement("td");
                statName.textContent = `${player.YahooName}`
                statNum.textContent = `${player.Jersey}`
                statPos.textContent = `${player.Position}`
                statHeight.textContent = `${player.Height}`
                statWeight.textContent = `${player.Weight}`
                statBd.textContent = `${player.BirthDate}`
                statExp.textContent = `${player.Experience}`
                statCollege.textContent = `${player.College}`
                statSalary.textContent = `${player.Salary}`
                playerColumns3.append(statName, statNum, statPos, statHeight, statWeight, statBd, statExp, statCollege, statSalary)

                playerList.append(playerColumns3) 
            
        });
    });
}

function getApi(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
}

// Changes from NBA logo to team logo depending on dropdown chosen.
function inputImage() {
  document.getElementById("image").src =
    "./assets/images/" + dropDown.value + ".png";
}

// Changes multiple background colors according to team selected.
function changeBodyBg() {
  function colorChange(mainColor, bodyColor, headerColor, headingColor) {
    // Color for middle column box with stats.
    document.getElementById("main-box").style.backgroundColor = mainColor;
    // Color for whole page background.
    document.body.style.backgroundColor = bodyColor;
    // Color for header background.
    document.getElementById("header").style.backgroundColor = headerColor;
  }

  // Switch case to increase productivity.
  switch (dropDown.value) {
    case "Atlanta Hawks":
      colorChange("#E03A3E", "#26282A", "#C1D32F", "#000000");
      break;
    case "Boston Celtics":
      colorChange("#007A33", "#BA9653", "#963821", "#000000");
      break;
    case "Brooklyn Nets":
      colorChange("#000000", "#FFFFFF", "#000000", "#FFFFFF");
      break;
    case "Charlotte Hornets":
      colorChange("#1D1160", "#A1A1A4", "#00788C", "#000000");
      break;
    case "Chicago Bulls":
      colorChange("#CE1141", "#000000", "#CE1141", "#000000");
      break;
    case "Cleveland Cavaliers":
      colorChange("#860038", "#FDBB30", "#860038", "#000000");
      break;
    case "Dallas Mavericks":
      colorChange("#00538C", "#B8C4CA", "#002B5E", "#000000");
      break;
    case "Denver Nuggets":
      colorChange("#0E2240", "#1D428A", "#FEC524", "#000000");
      break;
    case "Detroit Pistons":
      colorChange("#C8102E", "#BEC0C2", "#1D42BA", "#000000");
      break;
    case "Golden State Warriors":
      colorChange("#FFC72C", "#1D428A", "#FFC72C", "#000000");
      break;
    case "Houston Rockets":
      colorChange("#CE1141", "#000000", "#C4CED4", "#000000");
      break;
    case "Indiana Pacers":
      colorChange("#002D62", "#FDBB30", "#BEC0C2", "#000000");
      break;
    case "Los Angeles Clippers":
      colorChange("#C8102E", "#BEC0C2", "#1D428A", "#000000");
      break;
    case "Los Angeles Lakers":
      colorChange("#000000", "#552583", "#FDB927", "#000000");
      break;
    case "Memphis Grizzlies":
      colorChange("#5D76A9", "#12173F", "#5D76A9", "#FFFFFF");
      break;
    case "Miami Heat":
      colorChange("#98002E", "#000000", "#98002E", "#000000");
      break;
    case "Milwaukee Bucks":
      colorChange("#00471B", "#0077C0", "#EEE1C6", "#000000");
      break;
    case "Minnesota Timberwolves":
      colorChange("#0C2340", "#9EA2A2", "#236192", "#000000");
      break;
    case "New Orleans Pelicans":
      colorChange("#0C2340", "#85714D", "#C8102E", "#000000");
      break;
    case "New York Knicks":
      colorChange("#006BB6", "#F58426", "#BEC0C2", "#000000");
      break;
    case "Oklahoma City Thunder":
      colorChange("#007AC1", "#002D62", "#EF3B24", "#000000");
      break;
    case "Orlando Magic":
      colorChange("#0077C0", "#000000", "#C4CED4", "#000000");
      break;
    case "Philadelphia 76ers":
      colorChange("#006BB6", "#002B5C", "#ED174C", "#000000");
      break;
    case "Phoenix Suns":
      colorChange("#1D1160", "#E56020", "#000000", "#FFFFFF");
      break;
    case "Portland Trail Blazers":
      colorChange("#E03A3E", "#000000", "#E03A3E", "#000000");
      break;
    case "Sacramento Kings":
      colorChange("#000000", "#5A2D81", "#63727A", "#000000");
      break;
    case "San Antonio Spurs":
      colorChange("#C4CED4", "#000000", "#C4CED4", "#000000");
      break;
    case "Toronto Raptors":
      colorChange("#BA0C2F", "#000000", "#A1A1A4", "#000000");
      break;
    case "Utah Jazz":
      colorChange("#F9A01B", "#002B5C", "#00471B", "#000000");
      break;
    case "Washington Wizards":
      colorChange("#002B5C", "#C4CED4", "#E31837", "#000000");
      break;
  }
}