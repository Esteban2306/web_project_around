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
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    name.textContent = document.getElementById('nombre').value;
    description.textContent = document.getElementById('descripcion').value;
    modal.style.display = 'none';
});


editButton.addEventListener('click', () => {
    document.getElementById('nombre').value = name.textContent;
    document.getElementById('descripcion').value = description.textContent;
    modal.style.display = 'block'

});
// fin de creacion de popup para editar el boton de perfil

// inicio de creacion de popup para agregar tarjetas
const templateAdd = document.getElementById('modal__add-template').content.cloneNode(true);

console.log(templateAdd);

const modalAdd = templateAdd.querySelector('.modal__add');
document.body.appendChild(modalAdd);

console.log(modalAdd);

const closeAdd = modalAdd.querySelector('.close__add');
const formAdd = modalAdd.querySelector('.modal__add-form');

closeAdd.addEventListener('click', () => {
    modalAdd.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalAdd) {
        modalAdd.style.display = 'none';
    }
});

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreAdd').value;
    const image = document.getElementById('imageAdd').value;

    galeryItems.push({ title: nombre, imagen: image })

    renderizarTarjetas();

    document.getElementById('nombreAdd').value = '';
    document.getElementById('imageAdd').value = '';
    modalAdd.style.display = 'none';
});

addButton.addEventListener('click', () => {
    modalAdd.style.display = 'block'
});

// fin de creacion de popup para agregar tarjetas

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
        });

        contenedor.appendChild(itemClone);

    });


}



document.addEventListener('DOMContentLoaded', renderizarTarjetas);