import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.modal__input'));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        })

        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
            this.close();
            this._form.reset();
        })

        this._form.addEventListener('escape', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}