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

    const drawListener = () => {
        const pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseover', () => {
                const opacity = window.getComputedStyle(pixel).opacity
                pixel.style.opacity = opacity - .1
            })
        })
    };

    return { createDivs, drawListener }
}

export { EtchASketch }