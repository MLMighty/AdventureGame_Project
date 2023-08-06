import { Enemytype } from "./MainStoryLogic.js";
import { Player } from "../MainLogic.js";

export function PlayerISDead() {
    // Das Erscheint sobal ein Spieler gestorben ist nur ein kleiner kurzer text und wird zum reset des Status geschickt
    let text = "Du bist Leider gestorben, gib beim nächsten mal besser acht auf deine Entscheidungen";
    alert("tot")

    setTimeout(resetGameStatus,10000)
}

function resetGameStatus() {
    // Hier wird nach einem Tod oder gewollt der komplette spiel gang und spieler status gelöscht und zurück zum Start geschickt
    alert("Möchtest du von vorne anfang?");
    alert("oder zum letzten speicher punkt");
}

// Code vom health bar, funktion wie es sein leben verliert mehr passiert nicht
// Außer bei heilungstränken da wird das leben aufgefüllt

let PlayerHealth=document.getElementById("Health");
let StoryTextContainer = document.getElementById("StoryText");
let SectionOFBtns = document.getElementById("SectionOFBtns");
let StopInterval6;
let damageEnemy;
let hit=0;
let damage=1;
let PlayerWeaponDamage;
let enemysHealth;
let EnemylifeDeklariert=false;

function PlayerHealthBarDamage(){
    /* bei der test funktion wurden die variabeln angegeben aber
    bei dem echten stystem wird je nach button und enemy alles per varaibel zugänglich für 
    alle geändert (let damage; und später in der funktion ein wert überwiesen damage=10;) */
    
    console.log(hit);
   StopInterval6= setInterval(() => {
        if(hit <= damageEnemy){
        console.log("lost life")
        hit++;
        PlayerHealth.value-=damage;
        console.log(hit);
        }
        else if(PlayerHealth.value === 0){
         clearInterval(StopInterval6)
         console.log("dead");
         PlayerISDead();
        }
        else{
            console.log("reset life");
            clearInterval(StopInterval6)
            hit=0;
            Playerturn();
        }
        
        
    }, 10);

    
    
}

function HealPlayer(){
    // Hier wird der SPieler per Story, tränke, npc geheilt
}



// Hier werden die Kämpfe Programmiert 


export const Ork={
    OrkName:"Ork",
    Orkclass:"1",
    Orkdamage:5,
    Orkhealth:65,
    orkEnemy:false,
    enemytype:"Ork",
}


export function PlayerFightScene(){
    // aktiviert alle nötigen dinge für den Start des Kampfes
    StoryTextContainer.innerHTML="";
    CheckWhichEnemy();
    
}


 function aquippedWeaponDamage(){
    if(Player.PlayerWeapon=="Katana"){
        console.log("damagedEnemy")
        PlayerWeaponDamage=9;
        enemysHealth-=PlayerWeaponDamage;
        console.log(enemysHealth);
        CheckWhichEnemy();
       
    }
    
 }


function FightButton(){
    let FightButton=document.createElement("button");
    FightButton.innerHTML="Angreifen";
    FightButton.classList.add("ScriptBTNs")

    SectionOFBtns.appendChild(FightButton);

    FightButton.addEventListener("click",function () {
        console.log("FightButton CLicked")
        aquippedWeaponDamage()
        console.log(Player.PlayerWeapon);

        FightButton.remove(SectionOFBtns);
        
    })

}

function Playerturn(){
    console.log("playerturn");
    StoryTextContainer.innerHTML="Du bist dran";
    FightButton();
}

function CheckWhichEnemy(){
    // Ork 
    // Wird Überprüft ob der Enemytype dem namen des Gegner anpasst
    if(Enemytype==="Ork"){ 
        // Wenn der enemytype richtig ist wird der ork als gegner auf true gesetzt
        Ork.orkEnemy=true;
        if(EnemylifeDeklariert===false){
            // Hier wird überprüft ob das leben des Gegners schon an die variable abgebgebn wurde oder nicht
            // Um das problem vorzubeugen das das leben immer wieder neu zugeordnet wird
            enemysHealth=Ork.Orkhealth;
            EnemylifeDeklariert=true;
        }
        StoryTextContainer.innerHTML="Der Ork schlägt zu" +"<br>"+ "Sein leben beträgt: "+ enemysHealth;
        Enemyturn();
       }

    //    Kobold
       if(Enemytype==="Kobold"){
       alert("fighting with Kobold");
       }
       if(Enemytype==="Mensch"){
       alert("fighting with Mensch");
       }
       if(Enemytype==="Spinne"){
       alert("fighting with Spinne");
       }
       if(Enemytype==="Ritter"){
       alert("fighting with Ritter");
       }
}

function Enemyturn(){
    setTimeout(() => {
        if(Ork.orkEnemy==true){
            // hier wird überprüft ob der gegner auch wirklich der Ork ist
        damageEnemy=Ork.Orkdamage;
        console.log("fighting with ork");
        console.log(damageEnemy)
        PlayerHealthBarDamage();
        console.log(Health);
    }else if(Ork.Orkhealth<=0){
        alert("Ork ist dead");
        Ork.orkEnemy=false;
        EnemylifeDeklariert=true
    }
    }, 1000);
   
    
};