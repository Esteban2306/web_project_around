import { Card, galeryItems } from './card.js';
import { FormValidator } from './formValidator.js';

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const description = profile.querySelector('.profile__info-description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');


// inico de creacion de popup

const modalEdit = document.getElementById('modal-edit-all').querySelector('.modal');
const modalAdd = document.getElementById('modal__add-all').querySelector('.modal__add');


function toggleModal(modal) {
    modal.classList.toggle('hidden');
}

function setupModalEvents(modal, closeButton, form = null, onSubmit = null) {
    closeButton.addEventListener('click', () => toggleModal(modal));

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal(modal);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            toggleModal(modal);
        }
    });

    if (form && onSubmit) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            onSubmit();
            toggleModal(modal);
        });
    };
}
const close = modalEdit.querySelector('.close');
console.log(close);
const form = modalEdit.querySelector('.modal__form');
setupModalEvents(
    modalEdit,
    close,
    modalEdit.querySelector('.modal__form'),
    () => {
        name.textContent = document.getElementById('nombre').value;
        description.textContent = document.getElementById('descripcion').value;
    }
);

setupModalEvents(
    modalAdd,
    modalAdd.querySelector('.close__add'),
    modalAdd.querySelector('.modal__add-form'),
    () => {
        const nombre = document.getElementById('nombreAdd').value;
        const image = document.getElementById('imageAdd').value;


        if (galery) {
            const newitem = { title: nombre, imagen: image };
            galeryItems.unshift(newitem);
            galery.render();

            document.querySelector('.modal__add-form').reset();
        }

    }
);

editButton.addEventListener('click', () => {
    document.getElementById('nombre').value = name.textContent;
    document.getElementById('descripcion').value = description.textContent;
    toggleModal(modalEdit);
});

addButton.addEventListener('click', () => {
    toggleModal(modalAdd);
});

//inicio de comprobacion automatica de modal

//fin de comprobacion automatica de modal


//inicio de popup image tarjeta

const modalImage = document.getElementById('popupimg');
const imageModal = modalImage.querySelector('.popupimg__content-image');
const closeImageModal = modalImage.querySelector('.popupimg__content-close');
const titleImageModal = modalImage.querySelector('.popupimg__content-title');

function openImageModal(evt) {
    const clickedImage = evt.target;

    if (clickedImage.classList.contains('galery__item-image')) {
        imageModal.src = clickedImage.src;
        imageModal.alt = clickedImage.alt;

        titleImageModal.textContent = clickedImage.alt;
        modalImage.classList.toggle('hidden');
    }

}

function closeImageModalFunction() {
    modalImage.classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
    const galeryContent = document.getElementById('galery__content');
    if (galeryContent) {
        galeryContent.addEventListener('click', openImageModal);
    }
});

closeImageModal.addEventListener('click', closeImageModalFunction);
window.addEventListener('click', (e) => {
    if (e.target === modalImage) {
        closeImageModalFunction();
    }
});

let galery = null;

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[1]}`);
    validator.enableValidation();
})

document.addEventListener('DOMContentLoaded', () => {
    galery = new Card(galeryItems, 'galery__content', 'galery');
    galery.render();
});
