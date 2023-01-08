'use strict';

const customSelect = document.querySelector('.contacts__select-custom'); // TODO: show contacts


const menuBtn = document.querySelector('.navigation__button');
const menuList = document.querySelector('.navigation__list');
const menuItems = document.querySelectorAll('.navigation__item');
const menuLinks = document.querySelectorAll('.navigation__link');
const serviceBtns = document.querySelectorAll('.service__button');
const serviceGardens = document.querySelectorAll('.garden');
const serviceLawns = document.querySelectorAll('.lawn');
const servicePlantings = document.querySelectorAll('.planting');
let secviceActiveLinks = document.querySelectorAll('.service__button_active');

// let indexes = [];

// menu
menuBtn.addEventListener('click', () => {
    toggleClasses();
});

// menu
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleClasses();
    })
})

serviceBtns.forEach((item, index) => {

    
    
    item.addEventListener('click', () => {
        
        item.classList.toggle('service__button_active');

        secviceActiveLinks = document.querySelectorAll('.service__button_active');
        if (secviceActiveLinks.length > 1) {
            serviceBtns.forEach(e => {
                if (!e.classList.contains('service__button_active')) {
                    console.log('dis')
                    e.setAttribute('disabled', '')
                }
            })
        } else {
            serviceBtns.forEach(e => {
                    e.removeAttribute('disabled');
            })
        }

        if (secviceActiveLinks.length > 0) {
            serviceBtns.forEach((btn, i) => {
                if (btn.classList.contains('service__button_active')) {
                    // indexes.push(index);
                    if (btn.classList.contains('garden__btn')) {
                        blurRemove(serviceGardens);
                    } else if (btn.classList.contains('lawn__btn')) {
                        blurRemove(serviceLawns);
                    } else if (btn.classList.contains('planting__btn')) {
                        blurRemove(servicePlantings);
                    }
                } else {
                    if (btn.classList.contains('garden__btn')) {
                        blurAdd(serviceGardens);
                    } else if (btn.classList.contains('lawn__btn')) {
                        blurAdd(serviceLawns);
                    } else if (btn.classList.contains('planting__btn')) {
                        blurAdd(servicePlantings);
                    }
                }
            })
        } else if (secviceActiveLinks.length < 1) {
            blurRemove(servicePlantings);
            blurRemove(serviceLawns);
            blurRemove(serviceGardens);
        }
    })
})

menuLinks.forEach((item, index) => {
    item.addEventListener('click', () => {
        item.classList.toggle('navigation__link_active');
        deactivateLink(menuLinks, index)
    })

})

function blurAdd(array) {
    array.forEach(item => {
        item.classList.add('blur')
    })
}

function blurRemove(array) {
    array.forEach(item => {
        item.classList.remove('blur');
    })
}

function deactivateLink(items, activIndex, className) {
    items.forEach((item, index) => {
        if (index !== activIndex) {
            item.classList.remove(className);
        }
    })
}

function toggleClasses() {
    menuBtn.classList.toggle('navigation__button_closed');
    menuBtn.classList.toggle('navigation__button_opened');
    menuList.classList.toggle('navigation__list_closed');
    menuList.classList.toggle('navigation__list_opened');
}
console.log(80)