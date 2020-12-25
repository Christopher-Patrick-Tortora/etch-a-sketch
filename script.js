const header = document.querySelector("header");
const size = document.createElement('p');
size.textContent = "16 x 16"
header.appendChild(size);

const container = document.querySelector("div");
container.classList.add("container");







function createDivs(divByDiv){
    const numDivs = divByDiv * divByDiv;
    const divSize = (( 1 / divByDiv) * 100);
    console.log(divSize);
    for(i = 1; i < numDivs + 1; i++){
        const div = document.createElement("div");
    
        div.classList.add("box");
        
       
        div.style.width = divSize + "%";
        div.style.height = divSize + "%";

       
        if(((i - 1) % divByDiv) == 0){
            div.classList.add("nextRowBox")
        }
      
        container.appendChild(div);
    }
}


var rangeInput = document.getElementById("rangeInput");



rangeInput.addEventListener('mouseup', function() {
    shake();
    //createDivs(rangeInput.value);
    size.textContent = rangeInput.value + " x " + rangeInput.value;
    console.log(rangeInput.value);
});














createDivs(16);

const divList = document.querySelectorAll('div');

function shake(){
    divList.forEach((div) => {
      div.style.backgroundColor = 'rgb(255, 255, 255)';
    })
}


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




