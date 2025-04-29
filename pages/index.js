import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../utils/Api.js';
import {
    editButton,
    addButton,
    imageModal,
    titleImageModal,
    imageButton
} from '../constants/constants.js';

export const api = new Api({
    baseUrl: 'https://around-api.es.tripleten-services.com/v1',
    headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: '838f9adb-9e40-4b54-8266-23d124ff4365'
    }
});

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
        console.log(item);
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

api.getCards()
    .then(cards => {
        renderGalery._items = cards;
        renderGalery.rendererItems();
    })
    .catch(err => console.error('Error al cargar las tarjetas:', err));

const popupForm = new PopupWithForm('.modal__add', (data) => {
    popupForm.setLoading(true, 'Creando...');
    const nombre = data.title;
    const image = data.link;
    const item = { name: nombre, link: image };
    console.log(item);
    api.createNewCard(item)
        .then((cardNew) => {
            console.log(cardNew);
            const newitem = new Card(
                cardNew,
                'galery',
                (link, name) => {
                    popupimage.open({ src: link, alt: name, caption: name })
                    popupimage.setEventListeners();
                }).addCard(cardNew);

            renderGalery.addItem(newitem);
        })
        .catch(err => console.error('Error al crear la tarjeta:', err))
        .finally(() => {
            popupForm.setLoading(false);
        })
}
);

addButton.addEventListener('click', () => {
    popupForm.open();
});

popupForm.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '#name',
    descriptionSelector: '#description'
    , avatarSelector: '.profile__image'
});

api.getUserInfo()
    .then(user => {
        userInfo.setUserInfo({ name: user.name, description: user.about });
        userInfo.setAvatar(user.avatar);
    });

const popupEditForm = new PopupWithForm('.modal', ({ nombre, descripcion }) => {
    popupEditForm.setLoading(true);
    userInfo.setUserInfo({ name: nombre, description: descripcion });
    api.changeUserInfo({ name: nombre, about: descripcion })
        .finally(() => {
            popupEditForm.setLoading(false);
        })
});

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector('#nombre').value = name;
    document.querySelector('#descripcion').value = about;
    popupEditForm.open();


});

const popupModalImage = new PopupWithForm('.modal__image', (data) => {
    const avatarUrl = data.avatar
    popupModalImage.setLoading(true);
    api.updateProfile({ avatar: avatarUrl })
        .then((user) => {
            document.querySelector('.profile__image').src = user.avatar;
        })
        .catch(err => console.error('Error al actualizar el avatar:', err))
        .finally(() => {
            popupModalImage.setLoading(false);
        })
});

popupModalImage.setEventListeners();

imageButton.addEventListener('click', () => {
    popupModalImage.open();
});