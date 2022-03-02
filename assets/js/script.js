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



let widgets = document.querySelector("#widgets");
console.log(widgets);
