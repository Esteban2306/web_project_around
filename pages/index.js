import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/api.js';
import {
    galeryItems,
    editButton,
    addButton,
    imageModal,
    titleImageModal,
} from '../constants/constants.js';

const forms = document.querySelectorAll('.form');
forms.forEach(form => {
    const validator = new FormValidator(`.${form.classList[0]}`);
    validator.enableValidation();
});


const popupimage = new PopupWithImage('.popupimg', (data) => {
    imageModal.src = data.src;
    imageModal.alt = data.alt;
    titleImageModal.textContent = data.caption;
});

const renderGalery = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card(
            item,
            'galery',
            (link, name) => {
                popupimage.open({ src: link, alt: name, caption: name })
                popupimage.setEventListeners();
            })

        return card.addCard(item);
    }
}, '#galery__content'
);


renderGalery.rendererItems();

fetch('https://around-api.es.tripleten-services.com/v1/cards/', {
    method: 'GET',
    headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: '838f9adb-9e40-4b54-8266-23d124ff4365'

    },
})
    .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
    })
    .then(cards => {
        renderGalery._items = cards;
        renderGalery.rendererItems();
    })
    .catch(err => console.error('Error al cargar las tarjetas:', err));

const popupForm = new PopupWithForm('.modal__add', (data) => {
    const nombre = data.title;
    const image = data.link;
    const item = { title: nombre, link: image };
    const newitem = new Card(
        item,
        'galery',
        (link, name) => {
            popupimage.open({ src: link, alt: name, caption: name })
            popupimage.setEventListeners();
        })
    const newCard = newitem.addCard(item);;

    renderGalery.addItem(newCard);
}
);

addButton.addEventListener('click', () => {
    popupForm.open();
});

popupForm.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '#name',
    descriptionSelector: '#description'
});

const popupEditForm = new PopupWithForm('.modal', ({ nombre, descripcion }) => {
    userInfo.setUserInfo({ name: nombre, description: descripcion });
});

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector('#nombre').value = name;
    document.querySelector('#descripcion').value = about;
    popupEditForm.open();


});

fetch('https://around-api.es.tripleten-services.com/v1/users/me', {
    method: 'GET',
    headers: {
        authorization: "838f9adb-9e40-4b54-8266-23d124ff4365"
    }
}
)
    .then(res => res.json())
    .then(data => console.log(data));


