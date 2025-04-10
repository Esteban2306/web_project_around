export class Card {
    constructor(items, containerId, templateId, handleCardClick) {
        this._items = items; // es el array de objetos que se va a utilizar para crear las tarjetas
        this._containerId = document.getElementById(containerId); // se obtiene el contenedor del html
        this._templateId = document.getElementById(templateId).content; // se obtiene el template del html
        this._handleCardClick = handleCardClick; // se obtiene el popup de la imagen
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
        itemClone.querySelector('.galery__item-image').src = item.link;
        itemClone.querySelector('.galery__item-image').alt = item.title;
        itemClone.querySelector('.galery__item-name').textContent = item.title;

        this._addLikeButton(itemClone);
        this._addDeleteButton(itemClone, index);
        itemClone.querySelector('.galery__item-image').addEventListener('click', () => {
            this._handleCardClick(item.link, item.title);
        });

        this._containerId.prepend(itemClone);
    }
}

