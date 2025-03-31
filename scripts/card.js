export class Card {
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

export const galeryItems = [
    { title: "Valle de Yosemite", imagen: "image/place_1.jpg" },
    { title: "Lago Louise", imagen: "image/place_2.png" },
    { title: "Montañas Calvas", imagen: "image/place_3.png" },
    { title: "Latemar", imagen: "image/place_4.png" },
    { title: "Vanoise National Park", imagen: "image/place_5.png" },
    { title: "Lago di Braies", imagen: "image/place_6.png" },
];