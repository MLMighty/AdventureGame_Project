// Importierung aller Dateien
import { StoryTelling,resetstate } from "./SideLogics/MainStoryLogic.js";

// Hier kommen alle Html DOkumente hin
let PlayerNameINP = document.getElementById("PlayerNameInput");
let PlayerNameINPtext;

let StoryTextContainer = document.getElementById("StoryText");
let AskCharQuestions = document.getElementById("AskPlayerName");
let VisualPhotoContainer = document.getElementById("VisualPhotoContainer");
let SectionOFBtns = document.getElementById("SectionOFBtns");
let HideAfterStart = document.getElementById("HideAfterStart");

// Alle Variablen aus dem Javascript

let NextLetter = 0;
let clicked = 0;
let BackStoryStop = 0;
let CharOptionindex = 0;
let SavingPoint = JSON.parse(localStorage.getItem("SavingPoint")) || 0;



export let Player = JSON.parse(localStorage.getItem("Player")) || {
    PlayerName: "",
    PlayersLevel: "0",
    PlayerExp: "0",
    Playertext: "",
    PlayerHealth:"100",

    // Spieler Charackter Fähigkeiten info
    PlayerSpeed: "1,2m/pro S",
    PlayerStrength: "6",
    Playerjump: "1m",
    Playerrange: "7m",
    Playerability: "Unkown",
    PlayerDamage:"7",

    // Spieler CHarackter info
    PlayerGender: "Women",
    PlayerAge: "17",
    PlayerHeight: "1,67",
    PlayerWeapon: "",
    Playerfriends: "None",
    PlayerStory: "Unkown",

    // Indentifizierung ob es schon den Namen gibt
    PlayerNameTaken: "",
}


const CharacterOptions = [
    {
        question: "Welches Geschlecht wählst du ?",
        CharOption: [
            { text: "Mädschen" },
            { text: "Junge" },
            { text: "Divers" },
        ]
    },
    {
        question: "Wie Alt Möchtest du sein ?",
        CharOption: [
            { text: "16" },
            { text: "17" },
            { text: "18" },
        ]
    },
    {
        question: "Wähle zuletzt deine Waffe aus ",
        CharOption: [
            { text: "Bogen" },
            { text: "Schwert" },
            { text: "Katana" },
            { text: "Speer" },
            { text: "nunchakus" },
        ]
    },



]




let BackStory = ["Gut, da du jetzt vorbereitet bist erzähle ich dir was 12 Stunden vor deiner Verpflanzung in dieser Welt passierte, es gab ein Großes Volk das lange zusammenhielt und ihren König verehrte",
    "Doch schreckliche dinge passierten eben, der König war nicht der der er zu scheinen schien, er lebte durch die das Blut seiner Opfer",
    "Er war ein verzauberter alter Mann der keine andere Wahl hatte, er hasste zudem auch Drachen,da sie der Grund seinen unglückliches Leben waren",
    "Er lebte sehr lange durch das blut seiner Opfer, doch irgendwann gewann der steigende hunger an mehr und er zettelte ein Krieg an....",
    "Er verlor an jenem Tag seine Frau und seine Kinder, außer einer von Ihnen, nämlich seine Tochter",
    "Naja ich habe dir jetzt genug erzählt oder? du sollst die meisten dinge von selber erfahren",
    `Du Hast die Wahl ${Player.PlayerName}`,]

let Werte = [];


window.addEventListener("load", () => {

    if (Player.PlayerNameTaken === "true" && SavingPoint < 1) {
        ShowWelcomeText();
        StoryTextContainer.innerText = "";
        AskCharQuestions.innerText = "";
        HideAfterStart.style.display = "none";

    }

    if (SavingPoint == 1) {
        StoryTextContainer.innerText = `Du hast die Wahl ${Player.PlayerName}`;
        AskCharQuestions.innerText = "";
        HideAfterStart.style.display = "none";
        secretEnding();
        StatusANDBackpackUnlocked()
    }
})



export function StartGame() {
    PlayerNameINPtext = PlayerNameINP.value;
    Player.PlayerName = PlayerNameINPtext;
    Player.PlayerNameTaken = "true";

    StoryTextContainer.innerText = "";
    AskCharQuestions.innerText = "";
    HideAfterStart.style.display = "none";

    localStorage.setItem("Player", JSON.stringify(Player));

    ShowWelcomeText();
}

function ShowWelcomeText() {

    let WelcomeText = `Wilkommen ${Player.PlayerName} im nächsten Schritt kannst du dein Character weiterentwickeln.  `;
    let letter;
    let StopInterval;




    StopInterval = setInterval(() => {
        letter = WelcomeText.charAt(NextLetter);
        StoryTextContainer.innerHTML += `${letter}`;
        NextLetter++;



    }, 50);

    setTimeout(CharacterDesignText, 4500);

}





function CharacterDesignText() {
    AskCharQuestions.innerHTML = "";
    let OptionsIndex = CharacterOptions[CharOptionindex];
    let CharacterText = OptionsIndex.question;
    let letters;
    let DesignTextLetter = 0;

    setInterval(() => {
        letters = CharacterText.charAt(DesignTextLetter)
        AskCharQuestions.innerHTML += `${letters}`;
        DesignTextLetter++;

    }, 50);


    setTimeout(ShowCharacterDesignDesicions, 2000);
}





function ShowCharacterDesignDesicions() {

    let OptionIndex = CharacterOptions[CharOptionindex];
    CharOptionindex++;

    OptionIndex.CharOption.forEach((Options) => {



        let button = document.createElement("button");
        button.classList.add("ScriptBTNs");
        button.innerHTML = Options.text;


        SectionOFBtns.append(button);

        button.addEventListener("click", function (event) {
            Werte.push(button.innerHTML);



            Player.PlayerGender = Werte[0];
            Player.PlayerAge = Werte[1];
            Player.PlayerWeapon = Werte[2];

            localStorage.setItem("Player", JSON.stringify(Player));

            if (CharOptionindex <= 2) {

                CharacterDesignText();
            } else (
                AskCharQuestions.innerText = "",
                StoryTextContainer.innerHTML = "",
                StatusANDBackpackUnlocked(),
                ShowBackText()
            )


            resetstate();



        })

    });

}



// Hier werden der Status und Rucksack des SPielers sowie die klickfunktionen bearbeitet

function StatusANDBackpackUnlocked() {
    document.getElementById("ShowBPSsection").classList.remove("ShowBPS")
}

export function ShowCharacterStatus() {

    document.getElementById("ShowAndHideStatusBackpack").classList.toggle("hide");
    document.getElementById("Content-Container").classList.toggle("hide");

    UpdateinformationOfPlayer();

}

function OpenBackpack() {
    document.getElementById("ShowAndHideStatusBackpack").classList.toggle("hide");
    document.getElementById("Content-Container").classList.toggle("hide");

    ShowBackpackContents();
}

function UpdateinformationOfPlayer() {

    document.getElementById("PlayerName").innerHTML = `${Player.PlayerName}`;
    document.getElementById("LevelOFPlayer").innerHTML = `Level: ${Player.PlayersLevel}`;
    document.getElementById("PlayerEXP").innerHTML = `EXP: ${Player.PlayerExp}`;

    document.getElementById("Speed").innerHTML = `${Player.PlayerSpeed}`;
    document.getElementById("Strength").innerHTML = `${Player.PlayerStrength}`;
    document.getElementById("Jump").innerHTML = `${Player.Playerjump}`;
    document.getElementById("Range").innerHTML = `${Player.Playerrange}`;
    document.getElementById("ability").innerHTML = `${Player.Playerability}`;

    document.getElementById("Gender").innerHTML = `${Player.PlayerGender}`;
    document.getElementById("age").innerHTML = `${Player.PlayerAge}`;
    document.getElementById("Hight").innerHTML = `${Player.PlayerHeight}`;
    document.getElementById("Weapon").innerHTML = `${Player.PlayerWeapon}`;
    document.getElementById("friends").innerHTML = `${Player.Playerfriends}`;
    document.getElementById("Story").innerHTML = `${Player.PlayerStory}`;


}




function ShowBackText() {
    StoryTextContainer.innerHTML = "";
    let StopInterval;
    let BackStoryArray = BackStory[BackStoryStop];
    let letters;
    let OneWord = 0;

    StopInterval = setInterval(() => {
        if (OneWord >= BackStoryArray.length) {
            clearInterval(StopInterval);
            setTimeout(() => {
                BackStoryStop++;
                if (BackStoryStop < BackStory.length) {
                    ShowBackText();
                } else {
                    secretEnding();
                }
            }, 2500);
            return;
        }

        letters = BackStoryArray[OneWord];
        StoryTextContainer.innerHTML += `${letters}`;
        OneWord++;
    }, 40);
}

let SecretEnding = [
    "ich gebe auf",
    "Lass uns Beginnen"
]

function secretEnding() {
    let one = 0;
    let buttons = [];

    if (SavingPoint < 1) {
        SavingPoint += 1;
        localStorage.setItem("SavingPoint", JSON.stringify(SavingPoint));
    }

    for (let i = 0; i < 2; i++) {
        let button = document.createElement("button");
        button.classList.add("ScriptBTNs")
        button.innerText = SecretEnding[one]
        one++;
        SectionOFBtns.append(button);
        buttons.push(button);
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", () => {
            if (btn.innerText == SecretEnding[0]) {
                // EIn achivment dafür das man augegeben hat das gespeichert wird und man sich anschauen kann
                StoryTextContainer.innerHTML = ""
                let text = `Oh.. \n 
                du hast dich also für dieses Ende entschieden?....  \n
                nicht so schlimm...\n
                wie es scheint wurd es dir einfach zu viel nicht wahr? \n 
                 ....diese Angst \n
                ..diese verantwortung,\n 
                 nun gut begebe dich ruhig zum Schlund nicht weit von dir weiter vorne... \n nur noch fallen lassen..ja genau so,  \n
                bis bald... \n 
                ${Player.PlayerName}.`;
                let letters;
                let letter = 0;

                SectionOFBtns.remove(btn);
                setInterval(() => {
                    letters = text.charAt(letter);
                    StoryTextContainer.innerHTML += `${letters}`
                    letter++
                }, 60);

            } else if (btn.innerText == SecretEnding[1]) {
                resetstate();
                StartStory();


            }
        })
    })
}

// Bereich wo die Ganze Hauptstory nach der Fertigung des charackters beginnt




function StartStory() {
    StoryTextContainer.innerHTML = "";
    StoryTelling();
}














// EIn achivment Status, Fäighkeiten, Story skip button, Haustier (Später in der Story)













/*let PlayerNameINP=document.getElementById("PlayerNameInput");
let PlayerNameINPtext;

let hideStartSection=document.getElementById("HideStartSection");
let ContentDIV=document.getElementById("Content");



// variablen des scripts direkt

let NextLetter=0;
let NextLetterQuestion=0;
let StopInterval;
let stopTimeout;
let ChossenCHaracterOption=0;
let OptionIndex;

// Das Player Objekt beinhaltet alle Daten des Spielers 

let Player=JSON.parse(localStorage.getItem("Player"))||{
    PlayerName:"",
    Playertext:"",
    PlayerAge:"",
    PlayerStrength:"",
    PlayerWeapon:"",
    PlayerHeight:"",
    PlayerNameTaken:"",

}




const CharacterOptions=[{
    question:"Welches Geschlecht wählst du ?",
    CharOption:[
        {text:"Mädschen"},
        {text:"Junge"},
        {text:"Divers"},
    ]},
    {
        question:"Wie Alt Möchtest du sein ?",
        CharOption:[
        {text:"16"},
        {text:"17"},
        {text:"18"},
    ]},
    {
        question:"Wähle zuletzt deine Waffe aus ?",
        CharOption:[
        {text:"Bogen"},
        {text:"Schwert"},
        {text:"Katana"},
        {text:"Speer"},
        {text:"nunchakus"},
    ]},
   

     
]
// Das Spiel Fängt mit dem StartGame() Button an












function WelcomePlayerTOGame(){
  
    
}




function PlayerChoosenButton(){
    clearInterval(StopInterval);
    clearTimeout(stopTimeout);

    OptionIndex=CharacterOptions[ChossenCHaracterOption];


    OptionIndex.CharOption.forEach((Options) => {
      
        let Maindiv =document.createElement("div")
        ContentDIV.appendChild(Maindiv)

        let button=document.createElement("button");
        button.innerHTML=Options.text;

        
        Maindiv.append(button);

        button.addEventListener("click",function () {
            Player.Playertext=button.innerText;
            localStorage.setItem("Player",JSON.stringify(Player));
            ChossenCHaracterOption++;
            PlayerChoosenButton()
            
            ContentDIV.innerHTML=OptionIndex.question;
           
          
            
        })
    });
    

}


*/



