const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const description = profile.querySelector('.profile__info-description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');


// inico de creacion de popup paraeditar el boton de perfil
const templateedit = document.getElementById('modal-template').content.cloneNode(true);

const modal = templateedit.querySelector('.modal');
document.body.appendChild(modal);


const close = modal.querySelector('.close');
const form = modal.querySelector('.modal__form');

close.addEventListener('click', () => {
    modal.classList.toggle('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.toggle('hidden');
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    name.textContent = document.getElementById('nombre').value;
    description.textContent = document.getElementById('descripcion').value;
    modal.classList.toggle('hidden');
});


editButton.addEventListener('click', () => {
    document.getElementById('nombre').value = name.textContent;
    document.getElementById('descripcion').value = description.textContent;
    modal.classList.toggle('hidden');

});
// fin de creacion de popup para editar el boton de perfil

// inicio de creacion de popup para agregar tarjetas
const templateAdd = document.getElementById('modal__add-template').content.cloneNode(true);


const modalAdd = templateAdd.querySelector('.modal__add');
document.body.appendChild(modalAdd);

console.log(modalAdd);

const closeAdd = modalAdd.querySelector('.close__add');
const formAdd = modalAdd.querySelector('.modal__add-form');

closeAdd.addEventListener('click', () => {
    modalAdd.classList.toggle('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modalAdd) {
        modalAdd.classList.toggle('hidden');;
    }
});

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreAdd').value;
    const image = document.getElementById('imageAdd').value;

    galeryItems.unshift({ title: nombre, imagen: image })

    renderizarTarjetas();

    formAdd.reset();
    modalAdd.classList.toggle('hidden');
});

addButton.addEventListener('click', () => {
    modalAdd.classList.toggle('hidden');
});

// fin de creacion de popup para agregar tarjetas

//inicio de comprobacion automatica de modal

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("modal__error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid || inputElement.value.trim() === "";
    });
};


const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button__inactivate');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('button__inactivate');
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll("input"));
    const buttonElement = formElement.querySelector(".form__submit");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation();


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

        const title = document.querySelector('.galery__item-name').textContent;
        titleImageModal.textContent = title
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
const galeryItems = [
    { title: "Valle de Yosemite", imagen: "image/place_1.jpg" },
    { title: "Lago Louise", imagen: "image/place_2.png" },
    { title: "Montañas Calvas", imagen: "image/place_3.png" },
    { title: "Latemar", imagen: "image/place_4.png" },
    { title: "Vanoise National Park", imagen: "image/place_5.png" },
    { title: "Lago di Braies", imagen: "image/place_6.png" },
];

function renderizarTarjetas() {
    const contenedor = document.getElementById('galery__content');
    const template = document.getElementById('galery').content;

    contenedor.innerHTML = '';

    galeryItems.forEach((item) => {
        const itemClone = template.cloneNode(true).firstElementChild;
        // se utiliza firstElementChild porque cuando utilizamos solo cloneNode(true) 
        // nos devuelve un fragmento de documento y no un elemento html so cunado se utiliza firstElementChild
        // se obtiene el primer elemento hijo del fragmento de documento que es el que necesitamos

        itemClone.querySelector('.galery__item-image').src = item.imagen;
        itemClone.querySelector('.galery__item-image').alt = item.imagen;
        itemClone.querySelector('.galery__item-name').textContent = item.title;

        // boton de like
        const heartButton = itemClone.querySelector(".galery__item-like-button");
        heartButton.addEventListener('click', function () {
            this.classList.toggle('liked');
        });

        // boton para eliminar tarjeta por separado
        const deleteButton = itemClone.querySelector(".galery__item-delete-button");
        deleteButton.addEventListener('click', function () {
            itemClone.remove();
            const index = galeryItems.indexOf(item);
            if (index > -1) {
                galeryItems.splice(index, 1);
            }
        });

        contenedor.appendChild(itemClone);

    });


}


document.addEventListener('DOMContentLoaded', renderizarTarjetas);