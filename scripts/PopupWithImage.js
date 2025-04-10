import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(Popup) {
        super(Popup);
        this._popupImage = this._popup.querySelector('.popupimg__content-image');
        this._popupTitle = this._popup.querySelector('.popupimg__content-title');
    }

    open({ src, alt, caption }) {
        this._popupImage.src = src;
        this._popupImage.alt = alt || caption;
        this._popupTitle.textContent = caption;

        super.open();
    }
}