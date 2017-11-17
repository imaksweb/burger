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

// team-accordeon
$(function() {

    $('.team-accordeon__trigger').on('click', e => {
        e.preventDefault();    
        
        const $this = $(e.currentTarget);
        const container = $this.closest('.team-accordeon');
        const item = $this.closest('.team-accordeon__item');
        const items = $('.team-accordeon__item', container);
        const content = $('.team-accordeon__content', item);
        const otherContent = $('.team-accordeon__content', container);
        const contentBlock = $('.team-accordeon__content-wrap', item);
        const reqHeight = contentBlock.outerHeight();

        if(item.hasClass('team-accordeon__item_active')) {

            item.removeClass('team-accordeon__item_active');

            content.css({
                'height' : 0
            })            

        } else {
            items.removeClass('team-accordeon__item_active');
            item.addClass('team-accordeon__item_active');

            otherContent.css({
                'height' : 0
            })

            content.css({
                'height' : reqHeight
            })
        }

    });

})