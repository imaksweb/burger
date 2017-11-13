let menu = ((options) => {

    let button = document.querySelector(options.button);
    let menu = document.querySelector(options.menu);
    let body = document.querySelector('body');

    let _toggleMenu = () => {

        button.classList.toggle('hamburger-menu__trigger_active');
        menu.classList.toggle('hamburger-menu_active');
        body.classList.toggle('body_active-menu');

    }

    let addListeners = () => {
        button.addEventListener('click', _toggleMenu);
    }

    return {
        init: addListeners
    };

})({
    button: '#hamburger-menu_toggle',
    menu: '#hamburger-menu_overlay'
});

menu.init();