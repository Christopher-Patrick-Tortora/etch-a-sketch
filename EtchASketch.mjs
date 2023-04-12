const EtchASketch = () => {

    const createDivs = (size) => {
        const area = size**2;
        const dimension = (1 / Math.sqrt(area)) * 100
        const screen = document.querySelector('main')
        for(let i = 0; i < area; i++){
            const div = document.createElement('div');
            div.id = i + 1
            div.style.width = `${dimension}%` 
            div.style.height = `${dimension}%` 
            div.classList.add('pixel')
            screen.append(div)
        }

    }

    const removeDivs = () => {
        const screen = document.querySelector('main')
        screen.innerHTML = ``
    }

    const colorClassic = (pixel) => {
        if(pixel){
        const opacity = window.getComputedStyle(pixel).opacity
        pixel.style.opacity = opacity - .1
        }
    }

    const colorBlack = (pixel) => {
        if(pixel){
            pixel.style.backgroundColor = 'black'
        }
    }

    const colorRandom = (pixel) => {
        if(pixel){
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            const backgroundColor = pixel.style.backgroundColor
            console.log(backgroundColor)
            console.log(backgroundColor)
            if(backgroundColor == ""){
                pixel.style.backgroundColor = `#${randomColor}`
            }
        }
    }

    const selectColor = (color) => {
        if(color.id === 'classic') drawListener(colorClassic)
        else if(color.id === 'black') drawListener(colorBlack)
        else if(color.id === 'random') drawListener(colorRandom)
    }

    const drawListener = (color) => {
        const pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseover', () => {
                color(pixel)
            })
        })
    };

    const areaListener = () => {
        const areaContainer = document.querySelector(('.container__area'))
        const buttons = areaContainer.querySelectorAll('button')

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const colorContainer = document.querySelector(('.container__color'))
                const colorSelected = colorContainer.querySelector('.button__pushed')

                if(!button.classList.contains('.button__pushed')){
                    const pushedButton = areaContainer.querySelector('.button__pushed')
                    pushedButton.classList.remove('button__pushed')
                    button.classList.add('button__pushed')
                    removeDivs()
                    createDivs(button.id)
                    selectColor(colorSelected)

                }
            } )
        })
    }

    const colorListener = () => {
        const colorContainer = document.querySelector(('.container__color'))
        const buttons = colorContainer.querySelectorAll('button')

        const areaContainer = document.querySelector(('.container__area'))
        const areaSelected = areaContainer.querySelector('.button__pushed')
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if(!button.classList.contains('.button__pushed')){
                    const pushedButton = colorContainer.querySelector('.button__pushed')
                    pushedButton.classList.remove('button__pushed')
                    button.classList.add('button__pushed')
                    removeDivs()
                    createDivs(areaSelected.id)
                    selectColor(button)
                    
                }
            } )
        })
    }

    const initialize = () => {
//divs above 62 create instability therefore keep at 62 but say 64 because of style
        createDivs(62)
        drawListener(colorClassic)
        areaListener()
        colorListener()
    } 

    return { initialize }
}

export { EtchASketch }