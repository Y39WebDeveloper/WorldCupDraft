let addBtn = document.getElementById("addBtn");
let teamName = document.getElementById("team");
let teamContinent = document.getElementById("continent");
let teamLevel = document.getElementById("lvl");
let pots = document.querySelectorAll(".levels .level .teams");
let teams = [];
let note = "";

addBtn.onclick = addTeam;
function addTeam() {
    let newTeam = {
        name: teamName.value,
        continent: teamContinent.value,
        lvl: teamLevel.value,
    };

    let lvlCount = 0;

    for (i = 0; i < teams.length; i++) {
        if (newTeam.lvl == teams[i].lvl) { lvlCount++; }
    }

    let teamUefa = checkTeam(checkNumberContinent(teams, "europe", 13), lvlCount);
    let teamCaf = checkTeam(checkNumberContinent(teams, "africa", 5), lvlCount);
    let teamConmebol = checkTeam(checkNumberContinent(teams, "south_america", 5), lvlCount);
    let teamConcacaf = checkTeam(checkNumberContinent(teams, "north_america", 3), lvlCount);
    let teamAfc = checkTeam(checkNumberContinent(teams, "asia", 4), lvlCount);
    let teamOfc = checkTeam(checkNumberContinent(teams, "oceania", 2), lvlCount);

    switch (newTeam.continent) {
        case "europe":
            createTeam(teamUefa[0], newTeam, teamUefa[1]);
            break;
        case "africa":
            createTeam(teamCaf[0], newTeam, teamCaf[1]);
            break;
        case "asia":
            createTeam(teamAfc[0], newTeam, teamAfc[1]);
            break;
        case "south_america":
            createTeam(teamConmebol[0], newTeam, teamConmebol[1]);
            break;
        case "north_america":
            createTeam(teamConcacaf[0], newTeam, teamConcacaf[1]);
            break;
        case "oceania":
            createTeam(teamOfc[0], newTeam, teamOfc[1]);
            break;
    }
    showteam();
}

function showteam() {
    for (let i = 0; i < 4; i++) {
        pots[i].innerHTML = "";
    }
    for (let i = 0; i < teams.length; i++) {
        pots[teams[i].lvl - 1].innerHTML += `<li>${teams[i].name}<span onclick="deletTeam(${i})" id="delete">X</span></li>`;
    }
}

function checkNumberContinent(teams, continent, continentCounter) {
    let counter = 0;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].continent == continent) {
            counter++;
        }
    }
    return [continent, counter, continentCounter];
}

function checkTeam(checkNumberContinent, lvlCount) {
    let check = true;
    if (lvlCount >= 8) {
        check = false;
        note = "You can't add more teams in this level";
    } else if (checkNumberContinent[1] >= checkNumberContinent[2]){
        check = false;
        note = `You can't add more than ${checkNumberContinent[1]} teams from ${checkNumberContinent[0]}`;
    }else{check = true}
    return [check, note];
}

function createTeam(cheking, team, note) {
    if (cheking == true) {
        teams.push(team);
        document.querySelector(".note p").innerHTML = "";
    } else {
        document.querySelector(".note p").innerHTML = note;
    }
}

function deletTeam(i) {
    teams.splice(i, 1);
    showteam();
}