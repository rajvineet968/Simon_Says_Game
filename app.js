let userSeq=[];//initializing the user sequence
let gameSeq=[];//initializing the game sequence

let level=0;//initializing the level
let max=0;//initializing the max score

let started=false;
let h2=document.querySelector("h2");

let btns=['red','yellow','green','purple'];

document.addEventListener("keypress",()=>{//when game starts, it will listen to the keypress event in the beginning whenever it starts or resets
    if(started==false)//instializet to false so that it will not start again when the game is already started
        {
            console.log("Game started");
            started=true;

            levelUp();//calling levelUp function to level up
        }
})

function gameflash(btn){//for game sequenece flashing of the buttons
     btn.classList.add("gameflash");
     setTimeout(()=>{
        btn.classList.remove("gameflash");
     },250);
}

function userflash(btn){//for user sequence flashing of the buttons
     btn.classList.add("userflash");
     setTimeout(()=>{
        btn.classList.remove("userflash");
     },250);
}

function levelUp(){//level up function which includes leveling up(0) , random button genrator (1) and pushing the button to the game sequence (2)
    userSeq=[];
    level++;//0
    h2.innerText=`Level ${level}`;

    let randomNum=Math.floor(Math.random()*3);//1
    let randomColor=btns[randomNum];
    let randombtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);//2
    // console.log(gameSeq);
    gameflash(randombtn);
}

function checkAns(idx){//for checking the answer of the user sequence with the game sequence
    if(userSeq[idx]===gameSeq[idx]){//if case if the user sequence is equal to the game sequence
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{//else case if the user sequence is not equal to the game sequence
        h2.innerHTML=`Game Over, Your score was <b> ${level} </b> <br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";//for game over background color
        setTimeout(function(){document.querySelector("body").style.backgroundColor="#f99b45"},150);//for original color to #f99b45 after 150 milliseconds
        }
}


function buttonpress(){//user capturing
    // console.log(this);
    let btn=this;//calling its parent element using this
    userflash(btn);

    usercolor=btn.getAttribute("id");//getting the id which is color of the button which is pressed by the user
    userSeq.push(usercolor);
    checkAns(userSeq.length-1);
}


let bs=document.querySelectorAll(".btn");//selects all the buttons
for(btn of bs){
    btn.addEventListener('click',buttonpress);
}

function reset(){//reset function to reset the game
    level=0;
    userSeq=[];
    gameSeq=[];
    started=false;
}

function maxscore(){//HW by shradha dii for displaying max score till now played
       if (level>max){
        max=level;
        h3=document.querySelector("h3");
        h3.innerText=`Max Score till now you played: ${max}`;
       }
}