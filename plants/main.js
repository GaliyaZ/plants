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
const priceItems = document.querySelectorAll('.prices__item');
const drops = document.querySelectorAll('.prices__decor');
const selectCustom = document.querySelector('.contacts__select-custom');
const selectTag = selectCustom.querySelector('select');
let optionsList = [];
const options = [];
let city = document.querySelector('.addres__city_name');
        let phone = document.querySelector('.addres__phone_num');
        let addres = document.querySelector('.addres__addres_name');
        const box = document.querySelector('.box');

function selectCustomization () {
    let options = document.createElement('div');
    options.setAttribute("class", 'contacts__options');
    for (let i = 0; i < selectTag.options.length; i++) {
        let option = document.createElement('div');
        option.setAttribute("class", 'contacts__option');
        option.innerHTML = selectTag.options[i].innerHTML;
        options.appendChild(option);
    }
    selectCustom.appendChild(options);
    optionsList = document.querySelectorAll('.contacts__option');
}
selectCustomization ();

const vocabulary = {
    'Canandaigua, NY': {
        Phone: '+1 585	393 0001',
        adress: '151 Charlotte Street'
    },
    'New York City': {
        Phone: '+1 212	456 0002',
        adress: '9 East 91st Street'
    },
    'Sherrill, NY': {
        Phone: '+1 315	908 0004',
        adress: '14 WEST Noyes BLVD'
    },
    'Yonkers, NY': {
        Phone: '+1 914	678 0003',
        adress: '511 Warburton Ave'
    }
}
selectCustom.addEventListener('click', () => {
    selectCustom.classList.toggle('contacts__select-custom_active');
})

optionsList.forEach(item => {
    item.addEventListener('click', () => {
        const val = item.innerHTML;
        city.innerHTML = val;
        phone.innerHTML = vocabulary[val].Phone;
        addres.innerHTML = vocabulary[val].adress;
        box.classList.add('box__active')
    })
})

// menu
menuBtn.addEventListener('click', () => {
    toggleClasses();
});

// close menu
menuList.addEventListener('click', () => {
    menuBtn.classList.add('navigation__button_closed');
    menuBtn.classList.remove('navigation__button_opened');
    menuList.classList.add('navigation__list_closed');
    menuList.classList.remove('navigation__list_opened');
})

// menu
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleClasses();
    });
})

drops.forEach((item, index) => {
    item.addEventListener('click', () => {
        priceItems[index].classList.toggle('prices__item_active');
        deactivateLink(priceItems, index, 'prices__item_active');
    })
})

serviceBtns.forEach((item, index) => {
    item.addEventListener('click', () => {
        
        item.classList.toggle('service__button_active');

        secviceActiveLinks = document.querySelectorAll('.service__button_active');
        if (secviceActiveLinks.length > 1) {
            serviceBtns.forEach(e => {
                if (!e.classList.contains('service__button_active')) {
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
        deactivateLink(menuLinks, index, 'navigation__link_active')
    })

})

function blurAdd(array) {
    array.forEach(item => {
        item.classList.add('blur');
        item.classList.remove('unblur');
    })
}

function blurRemove(array) {
    array.forEach(item => {
        item.classList.remove('blur');
        item.classList.add('unblur');
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