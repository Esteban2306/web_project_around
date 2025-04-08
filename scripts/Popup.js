export default class Popup {
    constructor(PopupSelector) {
        this._popup = document.querySelector(PopupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.remove('hidden');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.add('hidden');
        document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    setEventListeners() {

        this._popup.querySelector('.close').addEventListener('click', () => this.close());

        this._popup.addEventListener('click', (e) => {
            if (e.target === this._popup) {
                this.toggleModal(modal);
            }
        });
    }
}