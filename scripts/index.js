const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const description = profile.querySelector('.profile__info-description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');


const template = document.getElementById('modal-template').content.cloneNode(true);

const modal= template.querySelector('.modal');
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

const galeryItems = [
    { title: "Valle de Yosemite", imagen: "image/place_1.jpg"},
    { title: "Lago Louise", imagen: "image/place_2.png"},
    { title: "Montañas Calvas", imagen: "image/place_3.png"},
    { title: "Latemar", imagen: "image/place_4.png"},
    { title: "Vanoise National Park", imagen: "image/place_5.png"},
    { title: "Lago di Braies", imagen: "image/place_6.png"},
];

function renderizarTarjetas() {
    const contenedor =document.getElementById('galery__content');
    const template = document.getElementById('galery').content;

    contenedor.innerHTML = '';

    galeryItems.forEach((item, index) => {
        const itemClone = template.cloneNode(true);

        itemClone.querySelector('.galery__item-image').src = item.imagen;
        itemClone.querySelector('.galery__item-image').alt = item.imagen;
        itemClone.querySelector('.galery__item-name').textContent = item.title;

        const heartButton = itemClone.querySelector(".galery__item-like-button");
        
        if (heartButton) {
          heartButton.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
        }  

        contenedor.appendChild(itemClone);

    });

  
}



document.addEventListener('DOMContentLoaded', renderizarTarjetas);