const EtchASketch = () => {

    const roundScreen = (size, screen) => {
        const div1 = document.getElementById('1')
        div1.style.borderRadius = '15px 0px 0px 0px'

        const div2 = document.getElementById(`${size}`)
        div2.style.borderRadius = '0px 15px 0px 0px'

        const div3 = document.getElementById(`${(size * (size - 1) + 1)}`)
        div3.style.borderRadius = '0px 0px 0px 15px'

        const div4 = document.getElementById(`${size * size}`)
        div4.style.borderRadius = '0px 0px 15px 0px'

        if (size === 16) screen.style.borderRadius = '15px'
        else if (size === 32) screen.style.borderRadius = '14px'
        else if (size === 62) screen.style.borderRadius = '7px'
    }

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
        roundScreen(size, screen)
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

                const eraseButton = document.querySelector('.button__erase')
                const etchASketch = document.querySelector('.etch-a-sketch')

                //variables depend on which setting is clicked
                const size = clickedSettingContainer.classList.contains('container__area') ?
                    button.id : areaSelected.id
                const color = clickedSettingContainer.classList.contains('container__color') ?
                    button.id : colorSelected.id
                if (!button.classList.contains('button__pushed') &&
                    !button.classList.contains('button__erase')) {
                    //swaps pushed buttons
                    prevPushedButton.classList.remove('button__pushed')
                    button.classList.add('button__pushed')

                    removeDivs()
                    createDivs(Number(size))
                    selectColor(color)
                }
                else if (button.classList.contains('button__erase')) {
                    etchASketch.classList.add('erase')
                    eraseButton.classList.add('button__pushed')
                    //time should be equal to animation length
                    setTimeout(() => {
                        etchASketch.classList.toggle('erase')
                        eraseButton.classList.toggle('button__pushed')

                        removeDivs()
                        createDivs(Number(size))
                        selectColor(color)
                    }, 1000)
                }
            })
        })
    }

    const initialize = () => {
        //divs above 62 create instability therefore keep at 62 but say 64 because of style
        createDivs(62)
        drawListener(colorClassic)
        settingsListener()
        //eraseListener()
    }

    return { initialize }
}

export { EtchASketch }