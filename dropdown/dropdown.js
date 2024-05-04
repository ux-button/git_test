const dropdown = (() => {
    const dropdownOptions = document.getElementById('list-container')
    document.getElementById('dropdown-container').addEventListener('click', (event) => {
        if (dropdownOptions.className === 'hidden') {
            dropdownOptions.classList.remove('hidden');
            dropdownOptions.classList.add('visible');
        }
        else if (dropdownOptions.className === 'visible') {
            dropdownOptions.classList.remove('visible');
            dropdownOptions.classList.add('hidden');
        }
    });
})();

const gallery = (() => {
    let counter = 0;
    const imagesQuantity = Array.from(document.querySelectorAll('.img-item')).length;
    const viewportBox = document.getElementById('gallery-containder');
    const setIndicator = () => {
        const circles = Array.from(document.querySelectorAll('.circle'));
        console.log(circles)
        for (let i = 0; i < imagesQuantity; i++) {
            circles[i].classList.remove('active');
            if (i === counter) {
                circles[i].classList.add('active');
            }
        }
    }
    const nextSlide = () => {
        counter++;
        if (counter > (imagesQuantity - 1)) {
            counter = 0;
        }
        viewportBox.style.cssText = `left: -${counter * 3}00px;`;
        setIndicator();
    }
    const previousSlide = () => {
        counter--;
        if (counter < 0) {
            counter = (imagesQuantity - 1);
        }
        viewportBox.style.cssText = `left: -${counter * 3}00px;`;
        setIndicator();
    }
    const autoSlide = (() => {
        setInterval(nextSlide, 5000);
    })();
    const changeSlide = (() => {
        document.getElementById('gallery').addEventListener('click', (event) => {
            if (event.target.id === 'right') {
                nextSlide();
            }
            else if (event.target.id === 'left') {
                previousSlide();
            }
        })
    })();
    
})();