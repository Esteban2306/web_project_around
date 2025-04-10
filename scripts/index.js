import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import Popup from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import Section from './Section.js';
import {
    galeryItems,
    name,
    description,
    editButton,
    addButton,
    modalEdit,
    modalAdd,
    close,
    modalImage,
    imageModal,
    closeImageModal,
    titleImageModal
} from './Constants.js';

const popupForm = new PopupWithForm('.modal__add', (data) => {
    const nombre = data.title;
    const image = data.link;
    if (galery) {
        const newitem = { title: nombre, link: image };
        galeryItems.unshift(newitem);
        galery.addCard(newitem);
    };
});

addButton.addEventListener('click', () => {
    popupForm.open();
});

popupForm.setEventListeners();

let galery = null;

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[0]}`);
    validator.enableValidation();
});

document.addEventListener('DOMContentLoaded', () => {
    const popupimage = new PopupWithImage('.popupimg');

    galery = new Card(
        galeryItems,
        'galery__content',
        'galery',
        (link, name) => {
            popupimage.open({ src: link, alt: name, caption: name })
        });
    popupimage.setEventListeners();
    galery.render();
});
