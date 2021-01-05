const header = document.querySelector("header");
const size = document.createElement('p');
size.textContent = "16 x 16"
header.appendChild(size);
let blackFlag = null;
let rainbowFlag = null;

const container = document.getElementById("container");
container.classList.add("container");

var rangeInput = document.getElementById("rangeInput");

createDivsBlack(16);

var divList;

//functions
function createDivsBlack(divByDiv){
    blackFlag = true;
    rainbowFlag = false;
    const numDivs = divByDiv * divByDiv;
    const divSize = (( 1 / divByDiv) * 100);
    console.log(divSize);
    for(i = 1; i < numDivs + 1; i++){
        const div = document.createElement("div");
    
        div.classList.add("box");
        div.id = "box"
        
       
        div.style.width = divSize + "%";
        div.style.height = divSize + "%";

       
        if(((i - 1) % divByDiv) == 0){
            div.classList.add("nextRowBox")
        }
      
        container.appendChild(div);
    }

    divList = document.querySelectorAll('#box');

    divList.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            console.log(div.style.backgroundColor);
            if(div.style.backgroundColor === ""){
            div.style.backgroundColor = 'rgb(0, 0, 0)';
            }
        })
    }) 


}

function createDivsRainbow(divByDiv){
    rainbowFlag = true;
    blackFlag = false;
    const numDivs = divByDiv * divByDiv;
    const divSize = (( 1 / divByDiv) * 100);
    console.log(divSize);
    for(i = 1; i < numDivs + 1; i++){
        const div = document.createElement("div");
    
        div.classList.add("box");
        div.id = "box"
        
       
        div.style.width = divSize + "%";
        div.style.height = divSize + "%";

       
        if(((i - 1) % divByDiv) == 0){
            div.classList.add("nextRowBox")
        }
      
        container.appendChild(div);
    }

    divList = document.querySelectorAll('#box');

    divList.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            console.log(div.style.backgroundColor);
            if(div.style.backgroundColor === ""){
            const r = Math.floor((Math.random() * 255) + 0);
            const g = Math.floor((Math.random() * 255) + 0);
            const b = Math.floor((Math.random() * 255) + 0);
            div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
            }
        })
    }) 


}

function shake(){
 while(container.firstChild){
     container.removeChild(container.firstChild);
 }
}

//listeners
 /*divList.forEach((div) => {
    div.addEventListener('mouseenter', (e) => {
        console.log(div.style.backgroundColor);
        if(div.style.backgroundColor === ""){
        const r = Math.floor((Math.random() * 255) + 0);
        const g = Math.floor((Math.random() * 255) + 0);
        const b = Math.floor((Math.random() * 255) + 0);
        div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    })
}) */

rangeInput.addEventListener('mouseup', function() {
    shake();
    if (blackFlag == true){
        createDivsBlack(rangeInput.value);
    }
    else if(rainbowFlag == true){
        createDivsRainbow(rangeInput.value);
    }
    
    size.textContent = rangeInput.value + " x " + rangeInput.value;
    console.log(rangeInput.value);
}); 

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(button.id == "Black"){
            
            shake();
            createDivsBlack(rangeInput.value);
           
        }
        else if(button.id == "Shake"){
            shake();
            if (blackFlag == true){
                createDivsBlack(rangeInput.value);
            }
            else if(rainbowFlag == true){
                createDivsRainbow(rangeInput.value);
            }

        }
        else if(button.id == "Rainbow"){
            
            shake();
            createDivsRainbow(rangeInput.value);
        }
        /*else if(button.textContent == "Black"){
            divList.forEach((div) => {
                div.addEventListener('mouseenter', (e) => {
                    console.log(div.style.backgroundColor);
                    if(div.style.backgroundColor === ""){
                    div.style.backgroundColor = 'rgb(0, 0, 0)';
                    }
                })
            })
        }*/
    })
})




