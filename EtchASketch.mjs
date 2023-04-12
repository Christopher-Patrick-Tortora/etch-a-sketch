const EtchASketch = () => {

    const createDivs = (size) => {
        const area = size ** 2;
        const dimension = (1 / Math.sqrt(area)) * 100
        const screen = document.querySelector('main')
        for (let i = 0; i < area; i++) {
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
        if (pixel) {
            const opacity = window.getComputedStyle(pixel).opacity
            pixel.style.opacity = opacity - .1
        }
    }

    const colorBlack = (pixel) => {
        if (pixel) {
            pixel.style.backgroundColor = 'black'
        }
    }

    const colorRandom = (pixel) => {
        if (pixel) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const backgroundColor = pixel.style.backgroundColor
            if (backgroundColor == "") {
                pixel.style.backgroundColor = `#${randomColor}`
            }
        }
    }

    const selectColor = (color) => {
        if (color === 'classic') drawListener(colorClassic)
        else if (color === 'black') drawListener(colorBlack)
        else if (color === 'random') drawListener(colorRandom)
    }

    const shakeListener = () => {
        const shakeButton = document.querySelector('.button__shake')
        const etchASketch = document.querySelector('.etch-a-sketch')
        shakeButton.addEventListener('click', () => {
            etchASketch.classList.add('shake')
            shakeButton.classList.add('button__pushed')
            //time should be equal to animation length
            setTimeout(() => {
                etchASketch.classList.toggle('shake')
                shakeButton.classList.toggle('button__pushed')
            }, 1000)
        })
    }

    const drawListener = (color) => {
        const pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseover', () => {
                color(pixel)
            })
        })
    };

    const settingsListener = () => {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const areaContainer = document.querySelector(('.container__area'))
                const areaSelected = areaContainer.querySelector('.button__pushed')

                const colorContainer = document.querySelector(('.container__color'))
                const colorSelected = colorContainer.querySelector('.button__pushed')

                const clickedButtonContainer = button.parentElement.parentElement;
                const clickedSettingContainer = clickedButtonContainer.parentElement
                const prevPushedButton = clickedButtonContainer.querySelector('.button__pushed')

                //variables depend on which setting is clicked
                const size = clickedSettingContainer.classList.contains('container__area') ? 
                button.id : areaSelected.id
                const color = clickedSettingContainer.classList.contains('container__color') ? 
                button.id : colorSelected.id

                if (!button.classList.contains('button__pushed')) {
                    //swaps pushed buttons
                    prevPushedButton.classList.remove('button__pushed')
                    button.classList.add('button__pushed')

                    removeDivs()
                    createDivs(size)
                    selectColor(color)
                }
            })
        })

    }

    const initialize = () => {
        //divs above 62 create instability therefore keep at 62 but say 64 because of style
        createDivs(62)
        drawListener(colorClassic)
        settingsListener()
        shakeListener()
        
    }

    return { initialize }
}

export { EtchASketch }