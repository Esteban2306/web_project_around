const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const description = profile.querySelector('.profile__info-description');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');


const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <button class="close" type="button"></button>
            <h2 class="modal__content_header">Editar perfil</h2>
            <form class="modal__form">
                <input type="text" id="nombre" placeholder="Nombre" class="modal__form_name" required>
                
                <input type="text" id="descripcion" placeholder="Acerca de mi" class="modal__form_description" required>
                
                <button type="submit" class="modal__content_button">Guardar</button>
            </form>
        </div>`;
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

document.addEventListener("DOMContentLoaded", function () {
    const heartButton = document.querySelectorAll(".galery__item-like-button");

    heartButton.forEach((heartButton) => {  
        heartButton.addEventListener("click", function () {
            this.classList.toggle("liked");
        });
    });
});