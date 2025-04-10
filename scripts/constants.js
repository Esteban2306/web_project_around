export const profile = document.querySelector('.profile');
export const name = profile.querySelector('.profile__info-name');
export const description = profile.querySelector('.profile__info-description');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');

export const modalEdit = document.getElementById('modal-edit-all').querySelector('.modal');
export const modalAdd = document.getElementById('modal__add-all').querySelector('.modal__add');

export const close = modalEdit.querySelector('.close');

export const modalImage = document.getElementById('popupimg');
export const imageModal = modalImage.querySelector('.popupimg__content-image');
export const closeImageModal = modalImage.querySelector('.popupimg__content-close');
export const titleImageModal = modalImage.querySelector('.popupimg__content-title');

export const galeryItems = [
    { title: "Valle de Yosemite", link: "image/place_1.jpg" },
    { title: "Lago Louise", link: "image/place_2.png" },
    { title: "Montañas Calvas", link: "image/place_3.png" },
    { title: "Latemar", link: "image/place_4.png" },
    { title: "Vanoise National Park", link: "image/place_5.png" },
    { title: "Lago di Braies", link: "image/place_6.png" },
];