let teams = Array.from(JSON.parse(localStorage.teams));
let draftBtn = document.getElementById('draft');
let continentsInfo = [
    { id: 'uefa', name: 'Europe', count: 2 },
    { id: 'caf', name: 'Africa', count: 1 },
    { id: 'conmebol', name: 'South America', count: 1 },
    { id: 'afc', name: 'Asia', count: 1 },
    { id: 'concacaf', name: 'North America', count: 1 },
    { id: 'ofc', name: 'Oceania', count: 1 },
];
let note = '';
class Group{
    constructor(){
        this.teams = [];
    }
    addTeam(team){
        if (this.checkContinent(team.continent) && this.chekLvl(team.lvl) && this.checkPlace()) {
            this.teams.push(team);
            return true
        }else{
            return false;
        }
    }
    //Chek : max 1 Team from each continent (2 from europe)
    checkContinent(continent){
        let continentInfo;
        for(let i = 0; i < continentsInfo.length; i++){
            if(continent == continentsInfo[i].id){
                continentInfo = continentsInfo[i];
                break;
            }
        }
        let check = true;
        let count = 0;
        for(let i = 0; i < this.teams.length; i++){
            if(continent == this.teams[i].continent){
                count++;
            }
        }
        if (count < continentInfo.count) {
            check = true;
            note = '';
        }else{
            check = false;
            note = `You cant't add more team from ${continentInfo.name}`;
        }
        return check;
    }
    // Check Number of place in group max=4
    checkPlace(){
        let check = true;
        if(this.teams.length >= 4){
            check = false;
            note = 'Full Group'
        }else{
            note = '';
        }
        return check;
    }
    // Check : 1 team from each level
    chekLvl(lvl){
        let check = true;
        let count = 0;
        for(let i = 0; i < this.teams.length; i++){
            if(lvl == this.teams[i].lvl){
                count++;
            }
            if(count < 1){
                check = true;
                note = '';
            }else{
                note = "You cant't add more team from this level in this group";
                check = false;
            }
        }
        return check;
    }
}

// Create Array For Groups
let groups = [];
for(let i = 0; i < 8; i++){
    let group = new Group();
    groups.push(group);
}

// Create Array for each level
let lvls = [[],[],[],[]];
for(let i =0; i < teams.length; i++){
    if(teams[i].lvl == 1){lvls[0].push(teams[i])}
    if(teams[i].lvl == 2){lvls[1].push(teams[i])}
    if(teams[i].lvl == 3){lvls[2].push(teams[i])}
    if(teams[i].lvl == 4){lvls[3].push(teams[i])}
}

draftBtn.addEventListener('click', draftTeam);

function draftTeam(){
    draft();
    ui();
    document.querySelector(".note p").innerHTML = note;
}
function draft(){
    for(let i = 0; i < 4; i++){
        let check = true;
        if(lvls[i].length > 0){
            let rand = Math.floor(Math.random() * lvls[i].length);
            for (let j = 0; j < 8; j++) {
                if(groups[j].addTeam(lvls[i][rand])){
                    lvls[i].splice(rand, 1);
                    check = false;  
                    break;  
                }else{continue;}
            }
        }else{check = true}
        if(check == false){break;}
    }
}

// UI 
let boxs = document.querySelectorAll('.groups .box .teams-box');
let levelBox = document.querySelectorAll('.teams .box .teams-box');
function ui(){
    for(let i = 0; i < 8; i++){
        boxs[i].innerHTML = '';
    }
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < groups[i].teams.length; j++){
            let team = groups[i].teams[j];
            boxs[i].innerHTML += `<li class='lvl-${team.lvl}'>${team.name}  <span onclick="deleteTeam(${i},${j},${team.lvl})">X</span></li>`
        }
    }
    
    // Level Team UI
    teamLvlUi();
    
}
// Level Team UI
function teamLvlUi(){
    for(let i = 0; i < 4; i++){
        levelBox[i].innerHTML = '';
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < lvls[i].length; j++){
            levelBox[i].innerHTML += `<li>${lvls[i][j].name}</li>`
        }
    }
}
teamLvlUi();

function deleteTeam(i,j,lvl){
    lvls[lvl-1].push(groups[i].teams[j]);
    groups[i].teams.splice(j,1);
    ui();
}