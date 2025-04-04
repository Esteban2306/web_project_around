import { Card, galeryItems } from './card.js';
import { FormValidator } from './formValidator.js';
import { Utils } from './utils.js';

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const description = profile.querySelector('.profile__info-description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const modalEdit = document.getElementById('modal-edit-all').querySelector('.modal');
const modalAdd = document.getElementById('modal__add-all').querySelector('.modal__add');

const close = modalEdit.querySelector('.close');

Utils.setupModalEvents(
    modalEdit,
    close,
    modalEdit.querySelector('.modal__form'),
    () => {
        name.textContent = document.getElementById('nombre').value;
        description.textContent = document.getElementById('descripcion').value;
    }
);

Utils.setupModalEvents(
    modalAdd,
    modalAdd.querySelector('.close__add'),
    modalAdd.querySelector('.modal__add-form'),
    () => {
        const nombre = document.getElementById('nombreAdd').value;
        const image = document.getElementById('imageAdd').value;


        if (galery) {
            const newitem = { title: nombre, imagen: image };
            galeryItems.unshift(newitem);
            galery.addCard(newitem);

            document.querySelector('.modal__add-form').reset();
        }

    }
);

editButton.addEventListener('click', () => {
    document.getElementById('nombre').value = name.textContent;
    document.getElementById('descripcion').value = description.textContent;
    Utils.toggleModal(modalEdit);
});

addButton.addEventListener('click', () => {
    Utils.toggleModal(modalAdd);
});

//inicio de popup image tarjeta

const modalImage = document.getElementById('popupimg');
const imageModal = modalImage.querySelector('.popupimg__content-image');
const closeImageModal = modalImage.querySelector('.popupimg__content-close');
const titleImageModal = modalImage.querySelector('.popupimg__content-title');

document.addEventListener("DOMContentLoaded", function () {
    const galeryContent = document.getElementById('galery__content');
    if (galeryContent) {
        galeryContent.addEventListener('click', (evt) => {
            Utils.openImageModal(evt, modalImage, imageModal, titleImageModal);
        });
    }
});

closeImageModal.addEventListener('click', () => Utils.toggleModal(modalImage));

window.addEventListener('click', (e) => {
    if (e.target === modalImage) {
        Utils.toggleModal(modalImage);
    }
});

let galery = null;

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[0]}`);
    validator.enableValidation();
})



document.addEventListener('DOMContentLoaded', () => {
    galery = new Card(galeryItems, 'galery__content', 'galery');
    galery.render();
});
