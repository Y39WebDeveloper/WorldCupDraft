let addBtn = document.getElementById("addBtn");
let teamName = document.getElementById("team");
let teamCont = document.getElementById("cont");
let teamLevel = document.getElementById("lvl");
let pots = document.querySelectorAll(".levels .level .teams");
let teams = [];

addBtn.onclick = addTeam;
function addTeam(){
    let newTeam = {
        name: teamName.value,
        cont: teamCont.value,
        lvl: teamLevel.value,
    };
    
    let lvlCount = 0;

    for(i = 0; i < teams.length; i++){
        if(newTeam.lvl == teams[i].lvl){lvlCount++;}
    }


    let teamUefa = checkTeam(checkNumberCont(teams, "uefa", 13), lvlCount);
    let teamCaf = checkTeam(checkNumberCont(teams, "caf", 5), lvlCount);
    let teamConmebol = checkTeam(checkNumberCont(teams, "conmebol", 5), lvlCount);
    let teamConcacaf = checkTeam(checkNumberCont(teams, "concacaf", 4), lvlCount);
    let teamAfc = checkTeam(checkNumberCont(teams, "afc-ofc", 5), lvlCount);

    switch (newTeam.cont) {
        case "uefa":
            createTeam(teamUefa, newTeam);
            break;
        case "caf":
            createTeam(teamCaf, newTeam);
            break;
        case "afc-ofc":
            createTeam(teamAfc, newTeam);
            break;
        case "conmebol":
            createTeam(teamConmebol, newTeam);
            break;
        case "concacaf":
            createTeam(teamConcacaf, newTeam);
            break;
    }

    console.log(teams);
    showteam();
}

function showteam(){
    for(let i=0; i<4; i++){
        pots[i].innerHTML = "";
    }
    for(let i=0; i < teams.length; i++){
        pots[teams[i].lvl-1].innerHTML += `<li>${teams[i].name}</li>`;
    }
}

function checkNumberCont(teams, cont, contCounter){
    let counter = 0;
    for(let i=0; i < teams.length; i++){
        if (teams[i].cont == cont){
            counter++;
        }
    }
    return [cont, counter, contCounter];
}

function checkTeam(checkNumberCont, lvlCount){
    let check = true;
    if (lvlCount >= 8 || checkNumberCont[1] >= checkNumberCont[2]){
        check = false;
    } else {check = true}
    return check;
}

function createTeam(cheking, team){
    if (cheking == true) {
        teams.push(team);
        document.querySelector(".note p").innerHTML = "";
    }else{
        document.querySelector(".note p").innerHTML = "You can't add more teams from current country !!!";
    }
}