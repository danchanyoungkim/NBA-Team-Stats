const api_url = "https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2022?key=55ccc6c3c41240708737b94117caf3c4"
let dropDown = document.getElementById("dropDown")
let teamAbr = document.getElementById("teamAbr")




function teamData(team) {
    let h2Team = `<h2>${team.Name} - ${team.Team}</h2>`
        document.getElementById("teamAbr").innerHTML = h2Team


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
}


function getApi() {
    fetch(api_url).then(function(response){
       return response.json()
    }).then(function(info){
        console.log(info)
        info.forEach( team => {
          if (team.Name === dropDown.value) {
              teamData(team)
          } 
        });

    })
}

// Changes background colors according to team.
function changeBodyBg() {
    if (dropDown.value == "Atlanta Hawks") {
        document.getElementById("main-box").style.backgroundColor = "#E03A3E"
        document.body.style.backgroundColor = "#26282A"
        document.getElementById("header").style.backgroundColor = "#C1D32F"
    } else if (dropDown.value == "Boston Celtics") {
        document.getElementById("main-box").style.backgroundColor = "#007A33"
        document.body.style.backgroundColor = "#BA9653"
        document.getElementById("header").style.backgroundColor = "#963821"
    } else if (dropDown.value == "Brooklyn Nets") {
        document.getElementById("main-box").style.backgroundColor = "#000000"
        document.body.style.backgroundColor = "#FFFFFF"
        document.getElementById("header").style.backgroundColor = "#FFFFFF"
    } else if (dropDown.value == "Charlotte Hornets") {
        document.getElementById("main-box").style.backgroundColor = "#1D1160"
        document.body.style.backgroundColor = "#A1A1A4"
        document.getElementById("header").style.backgroundColor = "#00788C"
    } else if (dropDown.value == "Chicago Bulls") {
        document.getElementById("main-box").style.backgroundColor = "#CE1141"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#CE1141"
    } else if (dropDown.value == "Cleveland Cavaliers") {
        document.getElementById("main-box").style.backgroundColor = "#860038"
        document.body.style.backgroundColor = "#FDBB30"
        document.getElementById("header").style.backgroundColor = "#860038"
    } else if (dropDown.value == "Dallas Mavericks") {
        document.getElementById("main-box").style.backgroundColor = "#00538C"
        document.body.style.backgroundColor = "#B8C4CA"
        document.getElementById("header").style.backgroundColor = "#002B5E"
    } else if (dropDown.value == "Denver Nuggets") {
        document.getElementById("main-box").style.backgroundColor = "#0E2240"
        document.body.style.backgroundColor = "#1D428A"
        document.getElementById("header").style.backgroundColor = "#FEC524"
    } else if (dropDown.value == "Detroit Pistons") {
        document.getElementById("main-box").style.backgroundColor = "#C8102E"
        document.body.style.backgroundColor = "#BEC0C2"
        document.getElementById("header").style.backgroundColor = "#1D42BA"
    } else if (dropDown.value == "Golden State Warriors") {
        document.getElementById("main-box").style.backgroundColor = "#FFC72C"
        document.body.style.backgroundColor = "#1D428A"
        document.getElementById("header").style.backgroundColor = "#FFC72C"
    } else if (dropDown.value == "Houston Rockets") {
        document.getElementById("main-box").style.backgroundColor = "#CE1141"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#C4CED4"
    } else if (dropDown.value == "Indiana Pacers") {
        document.getElementById("main-box").style.backgroundColor = "#FDBB30"
        document.body.style.backgroundColor = "#BEC0C2"
        document.getElementById("header").style.backgroundColor = "#C1D32F"
    } else if (dropDown.value == "Los Angeles Clippers") {
        document.getElementById("main-box").style.backgroundColor = "#C8102E"
        document.body.style.backgroundColor = "#BEC0C2"
        document.getElementById("header").style.backgroundColor = "#1D428A"
    } else if (dropDown.value == "Los Angeles Lakers") {
        document.getElementById("main-box").style.backgroundColor = "#552583"
        document.body.style.backgroundColor = "#FDB927"
        document.getElementById("header").style.backgroundColor = "#000000"
        document.getElementById("heading").style.color = "#FFFFFF"
    } else if (dropDown.value == "Memphis Grizzlies") {
        document.getElementById("main-box").style.backgroundColor = "#5D76A9"
        document.body.style.backgroundColor = "#F5B112"
        document.getElementById("header").style.backgroundColor = "#12173F"
    } else if (dropDown.value == "Miami Heat") {
        document.getElementById("main-box").style.backgroundColor = "#98002E"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#98002E"
    } else if (dropDown.value == "Milwaukee Bucks") {
        document.getElementById("main-box").style.backgroundColor = "#00471B"
        document.body.style.backgroundColor = "#0077C0"
        document.getElementById("header").style.backgroundColor = "#EEE1C6"
    } else if (dropDown.value == "Minnesota Timberwolves") {
        document.getElementById("main-box").style.backgroundColor = "#0C2340"
        document.body.style.backgroundColor = "#9EA2A2"
        document.getElementById("header").style.backgroundColor = "#236192"
    } else if (dropDown.value == "New Orleans Pelicans") {
        document.getElementById("main-box").style.backgroundColor = "#0C2340"
        document.body.style.backgroundColor = "#85714D"
        document.getElementById("header").style.backgroundColor = "#C8102E"
    } else if (dropDown.value == "New York Knicks") {
        document.getElementById("main-box").style.backgroundColor = "#006BB6"
        document.body.style.backgroundColor = "#F58426"
        document.getElementById("header").style.backgroundColor = "#BEC0C2"
    } else if (dropDown.value == "Oklahoma City Thunder") {
        document.getElementById("main-box").style.backgroundColor = "#007AC1"
        document.body.style.backgroundColor = "#002D62"
        document.getElementById("header").style.backgroundColor = "#EF3B24"
    } else if (dropDown.value == "Orlando Magic") {
        document.getElementById("main-box").style.backgroundColor = "#0077C0"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#C4CED4"
    } else if (dropDown.value == "Philadelphia 76ers") {
        document.getElementById("main-box").style.backgroundColor = "#006BB6"
        document.body.style.backgroundColor = "#002B5C"
        document.getElementById("header").style.backgroundColor = "#ED174C"
    } else if (dropDown.value == "Phoenix Suns") {
        document.getElementById("main-box").style.backgroundColor = "#1D1160"
        document.body.style.backgroundColor = "#E56020"
        document.getElementById("header").style.backgroundColor = "#000000"
        document.getElementById("heading").style.color = "#FFFFFF"
    } else if (dropDown.value == "Portland Trail Blazers") {
        document.getElementById("main-box").style.backgroundColor = "#E03A3E"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#E03A3E"
    } else if (dropDown.value == "Sacramento Kings") {
        document.getElementById("main-box").style.backgroundColor = "#5A2D81"
        document.body.style.backgroundColor = "#000000"
        document.getElementById("header").style.backgroundColor = "#63727A"
    } else if (dropDown.value == "San Antonio Spurs") {
        document.getElementById("main-box").style.backgroundColor = "#C4CED4"
        document.body.style.backgroundColor = "#000000" 
        document.getElementById("header").style.backgroundColor = "#C4CED4"  
    } else if (dropDown.value == "Toronto Raptors") {
        document.getElementById("main-box").style.backgroundColor = "#BA0C2F"
        document.body.style.backgroundColor = "#000000"  
        document.getElementById("header").style.backgroundColor = "#A1A1A4" 
    } else if (dropDown.value == "Utah Jazz") {
        document.getElementById("main-box").style.backgroundColor = "#002B5C"
        document.body.style.backgroundColor = "#F9A01B"  
        document.getElementById("header").style.backgroundColor = "#00471B" 
    } else if (dropDown.value == "Washington Wizards") {
        document.getElementById("main-box").style.backgroundColor = "#002B5C"
        document.body.style.backgroundColor = "#C4CED4"   
        document.getElementById("header").style.backgroundColor = "#E31837"
    }
}
