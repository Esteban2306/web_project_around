export class FormValidator {
    constructor(fromSelector) {
        this._form = document.querySelector(fromSelector);
        this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
        this._buttonElement = this._form.querySelector(".form__submit");
    }

    _showInputErrror(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add("form__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("modal__error_active");
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("modal__error_active");
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputErrror(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid || inputElement.value.trim() === "";
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add('button__inactivate');
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove('button__inactivate');
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._buttonElement.classList.add('button__inactivate');
            this._buttonElement.disabled = true;
        })

        this._setEventListeners();
    };

}