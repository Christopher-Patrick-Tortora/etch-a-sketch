const header = document.querySelector("header");
const size = document.createElement('p');
size.textContent = "16 x 16"
header.appendChild(size);

let blackFlag = null;
let rainbowFlag = null;
let greyscaleFlag = null;

const container = document.getElementById("container");
container.classList.add("container");

var rangeInput = document.getElementById("rangeInput");

black(16);

var divList;

//functions
function createDivs(divByDiv){
    const numDivs = divByDiv * divByDiv;
    const divSize = (( 1 / divByDiv) * 100);
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

}

function black(divByDiv){
    blackFlag = true;
    rainbowFlag = false;
    greyscaleFlag = false;
    
    createDivs(divByDiv);
    
    divList.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            if(div.style.backgroundColor === ""){
            div.style.backgroundColor = 'rgb(0, 0, 0)';
            }
        })
    }) 


}

function greyscale(divByDiv){
    blackFlag = false;
    rainbowFlag = false;
    greyscaleFlag = true;
    
    createDivs(divByDiv);

    let opacity = null;

    divList.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
            if(div.style.backgroundColor != 'black'){
                div.style.backgroundColor = 'black';
                div.style.opacity = 0.1;
              
            }
            else if(parseInt(div.style.opacity) < 1){
                opacity = parseFloat(div.style.opacity);
                opacity += 0.1;
                div.style.opacity = opacity;
                
            }
        })
    }) 

}

function rainbow(divByDiv){
    rainbowFlag = true;
    blackFlag = false;
    greyscaleFlag = false;

    createDivs(divByDiv);

    divList.forEach((div) => {
        div.addEventListener('mouseenter', (e) => {
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
rangeInput.addEventListener('mouseup', function() {
    shake();
    if (blackFlag == true){
        black(rangeInput.value);
    }
    else if(rainbowFlag == true){
        rainbow(rangeInput.value);
    }
    else if(greyscaleFlag == true){
        greyscale(rangeInput.value);
    }
    
    size.textContent = rangeInput.value + " x " + rangeInput.value;
}); 

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(button.id == "Black"){
            
            shake();
            black(rangeInput.value);
           
        }
        else if(button.id == "Rainbow"){
            
            shake();
            rainbow(rangeInput.value);
        }
        else if(button.id == "Greyscale"){
            shake();
            greyscale(rangeInput.value);
        }
    })
})




