import Popup from './Popup.js';

export class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._description.textContent
        }
    }

    setUserInfo({ name, description }) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}