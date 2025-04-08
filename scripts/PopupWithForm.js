import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(PopupWithForm, handleFormSubmit) {
        super(PopupWithForm);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.modal__form');
        this._inputList = Array.from(this._form.querySelectorAll('.modal__input'));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        })

        return inputValues;
    }

    setEventListners() {
        super.setEventListners();
        this._from.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}