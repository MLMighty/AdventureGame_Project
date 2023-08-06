// import anderer funktion
import { PlayerISDead,Ork,PlayerFightScene } from "./PlayerHealthLogic.js";



export const StoryTextAndChoices = [
    {
        Story: "Es ist ein Dunkler Abend als du langsam deine Augen öffnest und dich in einem Wald wieder findest du Schaust dich um, aber viel ist nichts zu sehen, außer das grüne im Wald und ein paar felsen umher gestreut ruhig liegend, langsam kommst du immer mehr zu sinnen, was tust du?",
        CharOption: [
            { text: "Aufstehen" },
            { text: "Rucksack Erkunden" },
        ]
    },

    {
        Story: "Nachdem du dich auf den weg gemacht hast, siehst du nicht nach allzu langer Zeit ein kleines Dorf, du begebst dich langsam in die nähe des dorfes als du schon sehr früh merkst das der Dorf feuer eingefangen hat und fast kaum einer zu sehen ist",
        CharOption: [
            { text: "Dich kampf bereit machen" },
            { text: "Ruhig bleiben und abwarten" },
        ]
    },
    {
        Story: "Du bleibst ruhig und wartest für ein kurzen moment als du jemanden schreien hörst, du rennst richtung schrei und findest einen alten man auf dem boden vor, direkt vor ihm ist ein Level 1 Ork ",
        CharOption: [
            { text: "Dem Mann zur Hilfe eilen" },
            { text: "Ihn sterben lassen" },
            { text: "kobold mit einem Stein ablenken" },
        ]
    },

    {
        Story: "Nicht allzu lange Später kommen die Schützer des Dorfes an und vertreiben die restlichen orks (wait for update) ",
        CharOption: [
            { text: "Dich mit Ihnen unterhalten" },
            { text: "Still bleiben" },
            { text: "Deine Reise weiter führen" },
        ]
      
    },




]

export const ChossenPaths = [
    // Teil 1 Abschnitt 1 der Story
    {
        PathStory: "Du stehst langsam auf und ein paar deiner Knochen knacksen, als du dich kurz etwas gestreckt hast fühlst du ein Gewischt auf deinem Rücken ",
        CharOption: [
            { text: "Dich auf den Weg machen" },
            { text: "Dein Rucksack erkunden" },
        ]
    },
    {
        PathStory: "Als du du dich aufsetzt merkst du ein Gewicht auf deinem Rücken, es ist ein Rucksack du schaust rein und findest deine Waffe mit jeglichen anderen nützlichen Sachen",
        CharOption: [
            { text: "Deine Waffe in die Hand nehmen und dich auf den Weg machen" },
            { text: "Rucksack Schließen und auf dich den weg machen" },
            { text: "Etwas zu essen nehmen und dich auf den Weg machen" },
        ]
    },
    // Teil 1 Abschnitt 2  der Story
    {
        PathStory: "",
        CharOption: [
            { text: "" },
            { text: "" },
            { text: "" },
        ]
    },

    // Teil 1 Abschnitt 3 der Story
    {
        PathStory: "Du packst deine Waffe und machst dich direkt auf dem weg zum ork und attakierst ihn",
        CharOption: [
            { text: "angreifen" },
        ]
    },

    /*
    Zum abkopieren
     {
        PathStory: "",
        CharOption: [
            { text: "" },
            { text: "" },
            { text: "" },
        ]
    },
    */
]



 const NoneChossingStoryText=[
    {
        NoneTextPath: "Du machst dich sofort für jeglische gefahr kampfbereit",
    },

    {
        NoneTextPath: "Als du dich kampfbereit gemacht hast merkst du sehr schnell das es eine dumme entscheidung war, denn die dorbewohner haben keine angst vor einem unbewaffneten der ihnen droht",
    },


    {
        NoneTextPath: "Du schaust zu wie der alte Mann vom ork deomliert wird und nicht schon bald seinen letzten atem zug führt",
    },

    {
        NoneTextPath: "Du hebst einen Stein vom boden nicht weit weg von dir auf und schmeißt es direkt ein paar meter hinter den ork ",
    },


    /*
    Zum abkopieren
     {
        PathStory: "",
     },
    */
 ]

let TelledStoryIndex = 0;
let ChoosenPathIndex = 0;
let StoryButtons =[];
let StopInterval4;
let Choosedindex = 0;
let StopInterval5;
let StopTimeout2;
let NoneStoryIndex=0;
let StopInterval6;
let ChoosenPathStoryIndex;
let StoryTextContainer = document.getElementById("StoryText");
let Skipbutton=document.getElementById("SkipButton");
export let Enemytype;

let MainStory=false;
let ChoosenStory=false;
let NoneChossingStory=false;
let stop1=true;

export function resetstate() {

    while (SectionOFBtns.firstChild) {
        SectionOFBtns.removeChild(SectionOFBtns.firstChild);
    }

}


export function StoryTelling() {
    StoryTextContainer.innerHTML="";
    Skipbutton.style.visibility="visible";
    let ShowedStoryIndex = StoryTextAndChoices[TelledStoryIndex];
    let StoryText = ShowedStoryIndex.Story;
    let letters;
    let letter = 0;
    MainStory=true;

    StopInterval4 = setInterval(() => {
     
        letters = StoryText.charAt(letter);
        StoryTextContainer.innerHTML += letters;
        letter++;

        if (letter >= StoryText.length) {
            MainStory=false;
            clearInterval(StopInterval4);
            StopTimeout2 = setTimeout(() => {
                ChoosingStoryPathButtons();
                Skipbutton.style.visibility="hidden";
            }, 100);
        }
    }, 60);


}


function ChoosingStoryPathButtons() {
    clearTimeout(StopTimeout2);
    let ChoosingStoryIndex = StoryTextAndChoices[Choosedindex];

    ChoosingStoryIndex.CharOption.forEach(function (option) {
        clearTimeout(StopTimeout2);
        let button = document.createElement("button");
        button.classList.add("ScriptBTNs");
        button.innerText = option.text;
        SectionOFBtns.append(button);

        

        button.addEventListener("click", function () {
            StoryButtons.push(button.innerHTML);
           
            resetstate();
            analysChoosenPath();


        });
    });
}

let stop=true;
let stop2=true;
let weaponOnHand=false;

function CheckStory(){
       
            if(weaponOnHand===true){
                console.log("Story weg");
                TelledStoryIndex++;
                Choosedindex++;
                StoryTelling();
            }else{
                console.log("dead weg")
                NoneChoosingStoryText();
                ChossenPathStorytelling();
                PlayerISDead();

            }
   
}



function analysChoosenPath() {
    // Hier werden die ausgewählten wege überprüft und richtig eingeordnet
   

    if (StoryButtons[0]==="Aufstehen" && stop===true) {
        console.log("test1");
        ChossenPathStorytelling();
        stop=false;
        
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
        // ChoosenPathindex bleibt hier auf 0 deshalb wird hier nix verändert
    }
    if (StoryButtons[0]==="Rucksack Erkunden"  && stop===true) {
        console.log("test2");
        ChoosenPathIndex++;
        ChossenPathStorytelling();
        stop=false;
        
        
        
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
    
    }
    if (StoryButtons[1]==="Deine Waffe in die Hand nehmen und dich auf den Weg machen"&& stop1===true) {
        TelledStoryIndex++;
        Choosedindex++;
        weaponOnHand=true;
        StoryTelling();
        console.log("test3");
        stop1=false;
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
       
        

    }
    if (StoryButtons[1]==="Rucksack Schließen und auf dich den weg machen" && stop1===true) {
        TelledStoryIndex++;
        Choosedindex++;
        
        StoryTelling();
        console.log("test4");
        stop1=false;
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
        
    }
    if (StoryButtons[1]==="Etwas zu essen nehmen und dich auf den Weg machen"  && stop1===true) {
        TelledStoryIndex++;
        Choosedindex++;
        
        StoryTelling();
        console.log("test5");
        stop1=false;
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
        
    }
    if (StoryButtons[1]==="Dich auf den Weg machen"  && stop1===true) {
        TelledStoryIndex++;
        Choosedindex++;
        
        StoryTelling();
        console.log("test6");
        stop1=false;
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
        
    }
    if (StoryButtons[1]==="Dein Rucksack erkunden" && stop1===true) {
        TelledStoryIndex++;
        Choosedindex++;
        // Unlockbackpack funcktion
        StoryTelling();
        console.log("test7");
        stop1=false;
        // Index des  ChossenPathStorytelling() wird international geändert um die richtige story zu erzählen
        
    }

    if(StoryButtons[2]==="Dich kampf bereit machen"  && stop2===true){
        NoneChoosingStoryText();
        setTimeout(CheckStory,8000);
        console.log("test 8")
        stop2=false;
    }
    if(StoryButtons[2]==="Ruhig bleiben und abwarten"  && stop2===true){
        TelledStoryIndex++;
        Choosedindex++;
        console.log("test  9")
        stop2=false;
        StoryTelling();

    }
   

    if(StoryButtons[3]==="Dem Mann zur Hilfe eilen"){
         Enemytype=Ork.enemytype;
        console.log("test  10");
        PlayerFightScene();
        

    }

    if(StoryButtons[3]==="Ihn sterben lassen"){
        console.log("test  11");
        NoneStoryIndex+=2;
        TelledStoryIndex++;
        Choosedindex++;
        setTimeout(StoryTelling,8000);
        NoneChoosingStoryText();
    }
    if(StoryButtons[3]==="kobold mit einem Stein ablenken"){
        console.log("test  12");
        NoneStoryIndex+=3;
        TelledStoryIndex++;
        Choosedindex++;
        setTimeout(StoryTelling,8000);
        NoneChoosingStoryText();
    }
   


}

function ChossenPathStorytelling() {
    // Hier kommt der text aus den ausgewählten wegen hin
    StoryTextContainer.innerHTML ="";
    Skipbutton.style.visibility="visible";
    ChoosenPathStoryIndex = ChossenPaths[ChoosenPathIndex];
    let PathStoryN = ChoosenPathStoryIndex.PathStory
    let lettersPathStory;
    let letter = 0;
    ChoosenStory=true;
  

   StopInterval5=  setInterval(() => {
       
        lettersPathStory = PathStoryN.charAt(letter);
        StoryTextContainer.innerHTML += `${lettersPathStory}`;
        letter++;
       
        if (letter >= PathStoryN.length) {
            ChoosenStory=false;
            clearInterval(StopInterval5);
            Skipbutton.style.visibility="hidden";
            ChoosingPathStoryButtons();
        }


    }, 60);

    
}




function ChoosingPathStoryButtons() {
    clearInterval(StopInterval5);
     ChoosenPathStoryIndex = ChossenPaths[ChoosenPathIndex];

    ChoosenPathStoryIndex.CharOption.forEach(function (option) {
        let button = document.createElement("button");
        button.classList.add("ScriptBTNs");
        button.innerHTML = option.text;

        SectionOFBtns.append(button);

        

        button.addEventListener("click", () => {
            StoryButtons.push(button.innerHTML)
          
            resetstate()
            analysChoosenPath()
        })

    })

}


function NoneChoosingStoryText(){
   StoryTextContainer.innerHTML="";
   Skipbutton.style.visibility="visible";
    let NoneChoosingStoryIndexText=NoneChossingStoryText[NoneStoryIndex];
    let text=NoneChoosingStoryIndexText.NoneTextPath;
    let letter;
    let letters=0;
    NoneChossingStory=true;

    StopInterval6= setInterval(() => {
      
        letter=text.charAt(letters);
        StoryTextContainer.innerHTML+=letter;
        letters++;
        
        if(letters==text.length){
            NoneChossingStory=false;
            clearInterval(StopInterval6);
            Skipbutton.style.visibility="hidden";
        }
    }, 60);




    NoneStoryIndex++;
}




export function SkipStorytext(){
    // Haupt Story index genommen und somit der richtige text angezeigt

    let ShowedStoryIndex = StoryTextAndChoices[TelledStoryIndex];
    let StoryText = ShowedStoryIndex.Story;

    // Hier das selbe nur mit dem ChossenPathStorys
    ChoosenPathStoryIndex = ChossenPaths[ChoosenPathIndex];
    let PathStoryN = ChoosenPathStoryIndex.PathStory
    // Und hier mit dem nonechossenPathstorys

    let NoneChoosingStoryIndexText=NoneChossingStoryText[NoneStoryIndex];
    let Nonetext=NoneChoosingStoryIndexText.NoneTextPath;

    // Hier werden die vorherhigen text anzeigen zurückgesetzt uhnd gestoppt
    console.log("Skip");
    clearInterval(StopInterval5);
    clearInterval(StopInterval6);
    clearInterval(StopInterval4);
    StoryTextContainer.innerHTML="";

    // Überprüdung welcher der drei texte stattfindet und geskippt werden soll
    if(MainStory===true){
        // Der text und die button werden nach dem klick zugerodnet und sofort erscheinen
        StoryTextContainer.innerHTML=StoryText;
        ChoosingStoryPathButtons();
        Skipbutton.style.visibility="hidden";
        MainStory=false;
    }
    if(ChoosenStory===true){
        StoryTextContainer.innerHTML=PathStoryN;
       ChoosingPathStoryButtons();
        Skipbutton.style.visibility="hidden";
        ChoosenStory=false;
    }
    if(NoneChossingStory===true){
        StoryTextContainer.innerHTML=Nonetext;
        Skipbutton.style.visibility="hidden";
        NoneChossingStory=false;
    }
}

