import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Section from '../components/Section.js';
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
    items: galeryItems,
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