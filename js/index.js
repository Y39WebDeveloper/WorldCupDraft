let teamName = document.getElementById('team');
let teamContinent = document.getElementById('continent');
let teamLvl = document.getElementById('lvl');
let addTEamBtn = document.getElementById('addTeam');
let doneBtn = document.getElementById('done');
let teams = [];

//UI Variables
let pots = document.querySelectorAll(".levels .level .teams");
let note = '';
let continentsInfo = [
    { id: 'uefa', name: 'Europe', place: 13 },
    { id: 'caf', name: 'Africa', place: 5 },
    { id: 'conmebol', name: 'South America', place: 5 },
    { id: 'afc', name: 'Asia', place: 5 },
    { id: 'concacaf', name: 'North America', place: 3 },
    { id: 'ofc', name: 'Oceania', place: 1 },
];


// Classes
class Team{
    constructor(name, continent, lvl){
        this.name = name;
        this.continent = continent;
        this.lvl = lvl;
    }
}
addTEamBtn.addEventListener('click', addTeam);

// Create & Add Team
function addTeam(){
    if(teamName.value){
        let team = new Team(teamName.value, teamContinent.value, teamLvl.value);
    
        if (checkLvl(team.lvl, teams.length) && checkContitnent(team.continent, teams.length)) {   
            teams.push(team);
        }
    }
    
    // UI
    if(teams.length >= 32){
        addTEamBtn.style.display = 'none';
        doneBtn.style.display = 'block';
    }else{
        addTEamBtn.style.display = 'block';
        doneBtn.style.display = 'none';
    }
    showTeam();
    document.querySelector(".note p").innerHTML = note;
}

//UI
function showTeam(){
    for (let i = 0; i < 4; i++) {
        pots[i].innerHTML = "";
    }
    for (let i = 0; i < teams.length; i++) {
        pots[teams[i].lvl - 1].innerHTML += `<li class='${teams[i].continent}'>${teams[i].name}<span onclick="deletTeam(${i})" id="delete">X</span></li>`;
    }
}


// Check LVL
function checkLvl(lvl, lenght){
    let check = true;
    let count = 0;
    for(let i = 0; i < lenght; i++){
        if(lvl == teams[i].lvl){
            count++;
        }
    }
    if(count < 8){
        check = true;
        note = '';
    }else{
        note = "You cant't add more team is this level";
        check = false;
    }
    return check;
}


// Check Contitnent
function checkContitnent(continent,lenght){
    let continentInfo;
    for(let i = 0; i < continentsInfo.length; i++){
        if(continent == continentsInfo[i].id){
            continentInfo = continentsInfo[i];
            break;
        }
    }
    let check = true;
    let count = 0;
    for(let i = 0; i < lenght; i++){
        if(continent == teams[i].continent){
            count++;
        }
    }
    if(count < continentInfo.place){
        check = true;
        note = '';
    }else{
        check = false;
        note = `You cant't add more team from ${continentInfo.name}`;
    }
    return check;
}

// Delete Team
function deletTeam(i) {
    teams.splice(i, 1);
    addTEamBtn.style.display = 'block';
    doneBtn.style.display = 'none';
    showTeam();
}



// Save Teams in Local Storage

doneBtn.addEventListener('click', () => {
    localStorage.setItem('teams', JSON.stringify(teams));
});