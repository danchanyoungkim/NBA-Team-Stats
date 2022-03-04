const api_url = "https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2022?key=55ccc6c3c41240708737b94117caf3c4";

let dropDown = document.getElementById("dropDown");
let api_key = "l2pGA5pLy15WM8j3iHPwzwh3CgaxPYfG";
let ticketMasterUrl =
  "https://app.ticketmaster.com/discovery/v2/events.json?keyword=Chicago%20Bulls&apikey=l2pGA5pLy15WM8j3iHPwzwh3CgaxPYfG";
let eventList = document.getElementById("event-list");
let playerList = document.getElementById("player-list")
let savedSearch = document.getElementById("searched-team")

// function getTicketmaster(teamName){
// fetch ticket master api and get all events for selected team.(teamName)
// loop through the array of events.
// for each event create an li tag with a heading tag & two p tags.
// update text of heading and p-tags with event name, description? and date.
// append the list item to our emply list in html
// }
dropDown.addEventListener("change", function(event) {
  event.preventDefault();
  let searchSavedTeam = localStorage.getItem("savedTeam");
  let savedTeam = []
  if (searchSavedTeam === null){
    savedTeam = []
  } else{
    savedTeam = JSON.parse(localStorage.getItem("savedTeam"));
  }
  let selected = dropDown.value
  savedTeam.push(selected)
  localStorage.setItem("savedTeam", JSON.stringify(savedTeam));

showSaved();
})

function showSaved() {
  savedSearch.innerHTML = ""
  let saved = JSON.parse(localStorage.getItem("savedTeam"));
  saved.forEach(function (team) {
    let li = document.createElement("li");
    li.setAttribute("class", "recentTeam")
    li.textContent = team
    savedSearch.append(li)
  })
}



function getTicketmaster() {
  fetch(ticketMasterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      let events = data._embedded.events;
      for (let i = 0; i < 10; i++) {
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
            // Table list for categories.
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
            // Texts written in the table list.
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
                        // If null, then "N/A" will replace the value in the table.
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

                // Adds commas every three digits in the salary box.
                player.Salary = player.Salary.toLocaleString('en-US')
                
                // Table list for stats for all players in a team.
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
  function colorChange(mainColor, bodyColor, textSelect, navColor, navText, navTexts) {
    // Color for middle column box with stats.
    document.getElementById("main-box").style.backgroundColor = mainColor;
    // Color for whole page background.
    document.body.style.backgroundColor = bodyColor;
    // Color for text above dropdown.
    document.getElementById("text-select").style.color = textSelect;
    // Color for navbar.
    document.getElementById("nav-color").style.backgroundColor = navColor;
    // Color for text in navbar.
    document.getElementById("nav-text").style.color = navText;
    document.getElementById("nav-texts").style.color = navTexts;
  }

  // Switch case to increase productivity.
  switch (dropDown.value) {
    case "Atlanta Hawks":
      colorChange("#E03A3E", "#26282A", "#FFFFFF", "#26282A", "#FFFFFF", "#FFFFFF");
      break;
    case "Boston Celtics":
      colorChange("#007A33", "#BA9653", "#FFFFFF", "#BA9653", "#FFFFFF", "#FFFFFF");
      break;
    case "Brooklyn Nets":
      colorChange("#000000", "#FFFFFF", "#000000", "#FFFFFF", "#000000", "#000000");
      break;
    case "Charlotte Hornets":
      colorChange("#1D1160", "#A1A1A4", "#FFFFFF", "#A1A1A4", "#FFFFFF", "#FFFFFF");
      break;
    case "Chicago Bulls":
      colorChange("#CE1141", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Cleveland Cavaliers":
      colorChange("#860038", "#FDBB30", "#000000", "#FDBB30", "#000000", "#000000");
      break;
    case "Dallas Mavericks":
      colorChange("#00538C", "#B8C4CA", "#000000", "#B8C4CA", "#000000", "#000000");
      break;
    case "Denver Nuggets":
      colorChange("#0E2240", "#1D428A", "#FFFFFF", "#1D428A", "#FFFFFF", "#FFFFFF");
      break;
    case "Detroit Pistons":
      colorChange("#C8102E", "#BEC0C2", "#000000", "#BEC0C2", "#000000", "#000000");
      break;
    case "Golden State Warriors":
      colorChange("#FFC72C", "#1D428A", "#FFFFFF", "#1D428A", "#FFFFFF", "#FFFFFF");
      break;
    case "Houston Rockets":
      colorChange("#CE1141", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Indiana Pacers":
      colorChange("#002D62", "#FDBB30", "#000000", "#FDBB30", "#000000", "#000000");
      break;
    case "Los Angeles Clippers":
      colorChange("#C8102E", "#BEC0C2", "#000000", "#BEC0C2", "#000000", "#000000");
      break;
    case "Los Angeles Lakers":
      colorChange("#000000", "#552583", "#FFFFFF", "#552583", "#FFFFFF", "#FFFFFF");
      break;
    case "Memphis Grizzlies":
      colorChange("#5D76A9", "#12173F", "#FFFFFF", "#12173F", "#FFFFFF", "#FFFFFF");
      break;
    case "Miami Heat":
      colorChange("#98002E", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Milwaukee Bucks":
      colorChange("#00471B", "#0077C0", "#FFFFFF", "#0077C0", "#FFFFFF", "#FFFFFF");
      break;
    case "Minnesota Timberwolves":
      colorChange("#0C2340", "#9EA2A2", "#FFFFFF", "#9EA2A2", "#FFFFFF", "#FFFFFF");
      break;
    case "New Orleans Pelicans":
      colorChange("#0C2340", "#85714D", "#FFFFFF", "#85714D", "#FFFFFF", "#FFFFFF");
      break;
    case "New York Knicks":
      colorChange("#006BB6", "#F58426", "#FFFFFF", "#F58426", "#FFFFFF", "#FFFFFF");
      break;
    case "Oklahoma City Thunder":
      colorChange("#007AC1", "#002D62", "#FFFFFF", "#002D62", "#FFFFFF", "#FFFFFF");
      break;
    case "Orlando Magic":
      colorChange("#0077C0", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Philadelphia 76ers":
      colorChange("#006BB6", "#002B5C", "#FFFFFF", "#002B5C", "#FFFFFF", "#FFFFFF");
      break;
    case "Phoenix Suns":
      colorChange("#1D1160", "#E56020", "#FFFFFF", "#E56020", "#FFFFFF", "#FFFFFF");
      break;
    case "Portland Trail Blazers":
      colorChange("#E03A3E", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Sacramento Kings":
      colorChange("#000000", "#5A2D81", "#FFFFFF", "#5A2D81", "#FFFFFF", "#FFFFFF");
      break;
    case "San Antonio Spurs":
      colorChange("#C4CED4", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Toronto Raptors":
      colorChange("#BA0C2F", "#000000", "#FFFFFF", "#000000", "#FFFFFF", "#FFFFFF");
      break;
    case "Utah Jazz":
      colorChange("#F9A01B", "#002B5C", "#FFFFFF", "#002B5C", "#FFFFFF", "#FFFFFF");
      break;
    case "Washington Wizards":
      colorChange("#002B5C", "#C4CED4", "#000000", "#C4CED4", "#000000", "#000000");
      break;
  }
}