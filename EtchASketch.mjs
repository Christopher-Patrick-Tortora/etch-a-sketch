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

    const drawListener = (color) => {
        const pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseover', () => {
                color(pixel)
            })
        })
    };

    const areaListener = () => {
        const buttonContainer = document.querySelector(('.container__area'))
        const buttons = buttonContainer.querySelectorAll('button')
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if(!button.classList.contains('.button__pushed')){
                    console.log('test')
                    const pushedButton = document.querySelector('.button__pushed')
                    pushedButton.classList.remove('button__pushed')
                    button.classList.add('button__pushed')
                    removeDivs()
                    createDivs(button.id)
                    drawListener(colorClassic)

                }
            } )
        })
    }

    const initialize = () => {
        // divs above 62 create instability therefore keep at 62 but say 64 because of style
        createDivs(62)
        drawListener(colorClassic)
        areaListener()
    } 

    return { initialize }
}

export { EtchASketch }