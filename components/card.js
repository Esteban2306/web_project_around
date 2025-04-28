import { api } from "../pages/index.js";
import Popup from "./Popup.js";


export class Card {
    constructor(data, templateId, handleCardClick) {
        this._item = data;
        this._templateId = document.getElementById(templateId).content; // se obtiene el template del html
        this._handleCardClick = handleCardClick; // se obtiene el popup de la imagen
    }


    _addLikeButton() {
        this._itemClone.querySelector(".galery__item-like-button").addEventListener('click', () => {
            if (this._itemClone.querySelector(".galery__item-like-button").classList.contains('liked')) {
                api.deleteLike(this._item._id)
                    .then(() => {
                        this._itemClone.querySelector(".galery__item-like-button").classList.remove('liked');
                    })
                    .catch(err => console.log('Error al quitar like a la tarjeta:', err));
                return;
            } else {
                api.addLike(this._item._id)
                    .then(() => {
                        this._itemClone.querySelector(".galery__item-like-button").classList.add('liked');
                    })
                    .catch(err => console.log('Error al dar like a la tarjeta:', err));
            }
        });
    }

    removeCard() {
        this._itemClone.remove()
    }

    _addDeleteButton() {
        this._itemClone.querySelector(".galery__item-delete-button").addEventListener('click', () => {
            const popupDelete = new Popup('.delete-card');
            popupDelete.setEventListeners();
            popupDelete.open();

            const confirmButton = document.querySelector('.delete-card__content-button');

            const confirmDelete = () => {
                api.deleteCard(this._item._id)
                    .then(() => {
                        this.removeCard();
                        popupDelete.close();
                        confirmButton.removeEventListener('click', confirmDelete);
                    })
                    .catch(err => console.error('Error al eliminar la tarjeta:', err));
            };

            confirmButton.addEventListener('click', confirmDelete);
        });
    }


    addCard(item, index) {
        this._itemClone = this._templateId.cloneNode(true).firstElementChild;
        this._itemClone.querySelector('.galery__item-image').src = item.link;
        this._itemClone.querySelector('.galery__item-image').alt = item.name;
        this._itemClone.querySelector('.galery__item-name').textContent = item.name;
        if (item.isLiked) {
            this._itemClone.querySelector('.galery__item-like-button').classList.add('liked');
        } else {
            this._itemClone.querySelector('.galery__item-like-button').classList.remove('liked');
        }

        this._addLikeButton(this._itemClone);
        this._addDeleteButton(this._itemClone, index);
        this._itemClone.querySelector('.galery__item-image').addEventListener('click', () => {
            this._handleCardClick(item.link, item.name);
        });

        return this._itemClone;
    }
}

