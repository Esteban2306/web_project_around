export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.remove('hidden');
    }

    close() {
        this._popup.classList.add('hidden');
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {

        if (this._closeButton) {
            this._closeButton.addEventListener('click', () => this.close());
        }

        this._popup.addEventListener('mousedown', (e) => {
            if (e.target === this._popup) {
                this.close();
            }
        });

        document.addEventListener('keydown', this._handleEscClose);
    }
}