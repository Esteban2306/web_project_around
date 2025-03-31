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

class FormValidator {
    constructor(fromSelector) {
        this._form = document.querySelector(fromSelector);
        this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
        this._buttonElement = this._form.querySelector(".form__submit");
    }

    _showInputErrror(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add("form__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("modal__error_active");
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("modal__error_active");
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputErrror(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid || inputElement.value.trim() === "";
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add('button__inactivate');
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove('button__inactivate');
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._buttonElement.classList.add('button__inactivate');
            this._buttonElement.disabled = true;
        })

        this._setEventListeners();
    };

}

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[1]}`);
    validator.enableValidation();
})

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


// inicio de creacion de tarjetas



class Card {
    constructor(items, containerId, templateId) {
        this._items = items; // es el array de objetos que se va a utilizar para crear las tarjetas
        this._containerId = document.getElementById(containerId); // se obtiene el contenedor del html
        this._templateId = document.getElementById(templateId).content; // se obtiene el template del html
    }

    render() {
        this._containerId.innerHTML = '';
        this._items.forEach((item, index) => this.addCard(item, index));
    }

    _addLikeButton(itemClone) {
        itemClone.querySelector(".galery__item-like-button").addEventListener('click', function () {
            this.classList.toggle('liked');
        });
    }

    removeCard(index) {
        this._items.splice(index, 1);
        this.render();
    }

    _addDeleteButton(itemClone, index) {
        itemClone.querySelector(".galery__item-delete-button").addEventListener('click', () => {
            this.removeCard(index);
        });
    }

    addCard(item, index) {
        const itemClone = this._templateId.cloneNode(true).firstElementChild;
        itemClone.querySelector('.galery__item-image').src = item.imagen;
        itemClone.querySelector('.galery__item-image').alt = item.title;
        itemClone.querySelector('.galery__item-name').textContent = item.title;

        this._addLikeButton(itemClone);
        this._addDeleteButton(itemClone, index);

        this._containerId.appendChild(itemClone);
    }
}

const galeryItems = [
    { title: "Valle de Yosemite", imagen: "image/place_1.jpg" },
    { title: "Lago Louise", imagen: "image/place_2.png" },
    { title: "Montañas Calvas", imagen: "image/place_3.png" },
    { title: "Latemar", imagen: "image/place_4.png" },
    { title: "Vanoise National Park", imagen: "image/place_5.png" },
    { title: "Lago di Braies", imagen: "image/place_6.png" },
];

let galery = null;

document.addEventListener('DOMContentLoaded', () => {
    galery = new Card(galeryItems, 'galery__content', 'galery');
    galery.render();
});
