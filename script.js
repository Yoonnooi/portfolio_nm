
document.addEventListener('DOMContentLoaded', function () {
    const controller = new ScrollMagic.Controller();

    const transitionScene = new ScrollMagic.Scene({
        triggerElement: '.main-container',
        triggerHook: 0,
        duration: '100%'
    })
        .setPin('.main-container')
        .addTo(controller);

    const cdPlayerContainers = document.querySelectorAll('.cd-player-container');

    cdPlayerContainers.forEach((container, index) => {
        const cdPlayer = container.querySelector('.cd-player');
        const listBar = container.querySelector('.list-bar');
        const listParts = container.querySelectorAll('.list-part');
        const cdPlayerWrapper = container.querySelector('.cd-player-wrapper');
        let previousBackground = 'none';

    listParts.forEach((listPart, listIndex) => {
    listPart.addEventListener('mouseover', () => {
        const newBackground = listPart.getAttribute('data-video');
        const newBackgroundimg = listPart.getAttribute('data-background');

        if (newBackground) {
        previousBackground = newBackground;
        cdPlayerWrapper.style.background = `url(${newBackground}) no-repeat center center fixed`;
        cdPlayerWrapper.style.backgroundSize = 'cover';
        }

        if (newBackgroundimg) {
        previousBackground = newBackgroundimg;
        cdPlayerWrapper.style.background = `url(${newBackgroundimg}) no-repeat center center fixed`;
        cdPlayerWrapper.style.backgroundSize = 'cover';
        }
    });

        listPart.addEventListener('mouseleave', () => {
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
        document.body.removeChild(videoContainer);
        }

        cdPlayerWrapper.style.background = 'none';
        cdPlayerWrapper.style.backgroundSize = 'cover';
        });
        });
        const background = cdPlayer.getAttribute('data-background');
        const directionClass = index % 2 === 0 ? 'left-to-right' : 'right-to-left';


        const scene = new ScrollMagic.Scene({
            triggerElement: cdPlayer,
            triggerHook: 0.5,
            duration: '100%'
        })
            .on('enter', () => {
                cdPlayer.classList.add('show', directionClass);
                document.body.style.backgroundColor = 'transparent';
            })
            .on('leave', () => {
                cdPlayer.classList.remove('show', directionClass);
                document.body.style.backgroundColor = 'transparent';
            })
            .addTo(controller);


        if (window.innerWidth > 600) {
        cdPlayer.addEventListener('mouseover', () => {
            const xShift = index === 1 || index === 3 ? '18%' : '-16%';
            gsap.to(cdPlayer, { x: xShift, duration: 0.5 });
            listBar.classList.add('show');
            const listBarShift = index === 1 || index === 3 ? '-78%' : '45%';
            gsap.to(listBar, { x: listBarShift, duration: 0.5 });
        });

        listBar.addEventListener('mouseover', () => {
            const xShift = index === 1 || index === 3 ? '18%' : '-16%';
            gsap.to(cdPlayer, { x: xShift, duration: 0.5 });
            listBar.classList.add('show');
            const listBarShift = index === 1 || index === 3 ? '-78%' : '45%';
            gsap.to(listBar, { x: listBarShift, duration: 0.5 });
        });

        cdPlayer.addEventListener('mouseleave', () => {
            gsap.to(cdPlayer, { x: '0%', duration: 0.5 });
            gsap.to(listBar, { x: '0%', duration: 0.5 });
            listBar.classList.remove('show');
        });

        listBar.addEventListener('mouseleave', () => {
            gsap.to(cdPlayer, { x: '0%', duration: 0.5 });
            gsap.to(listBar, { x: '0%', duration: 0.5 });
            listBar.classList.remove('show');
        });
    } else {
        cdPlayer.addEventListener('mouseover', () => {
            listBar.classList.add('show');
        });

        listBar.addEventListener('mouseover', () => {;
            listBar.classList.add('show');
        });

        cdPlayer.addEventListener('mouseleave', () => {
            listBar.classList.remove('show');
        });

        listBar.addEventListener('mouseleave', () => {
            listBar.classList.remove('show');
        });
    }
    });


    const navigationLinks = document.querySelectorAll('.nav-item');

    navigationLinks.forEach(link => {
        link.addEventListener('click', () => {
        const targetSelector = link.getAttribute('data-target');
        scrollToSection(targetSelector);
    });
    });

    const contactLink = document.querySelector('.nav-item[data-target=".footer"]');
    contactLink.addEventListener('click', function () {
        scrollToSection('.footer');
    });

    function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
    const yOffset = element.offsetTop - window.innerHeight + element.clientHeight;
    window.scrollTo({
    top: yOffset,
    behavior: 'smooth'
    });
    }
    }
});
