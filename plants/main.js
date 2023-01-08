'use strict';

const customSelect = document.querySelector('.contacts__select-custom'); // TODO: show contacts


const menuBtn = document.querySelector('.navigation__button');
const menuList = document.querySelector('.navigation__list');
const menuItems = document.querySelectorAll('.navigation__item');
const menuLinks = document.querySelectorAll('.navigation__link');


menuBtn.addEventListener('click', () => {
    toggleClasses();
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleClasses();
    })
})

menuLinks.forEach((item, index) => {
    item.addEventListener('click', () => {
        item.classList.toggle('navigation__link_active');
        deactivateLink(menuLinks, index)
    })

})

function deactivateLink (links, activIndex) {
    links.forEach((item, index) => {
        if (index !== activIndex) {
            item.classList.remove('navigation__link_active');
        }
    })
}

function toggleClasses() {
    menuBtn.classList.toggle('navigation__button_closed');
    menuBtn.classList.toggle('navigation__button_opened');
    menuList.classList.toggle('navigation__list_closed');
    menuList.classList.toggle('navigation__list_opened');
}