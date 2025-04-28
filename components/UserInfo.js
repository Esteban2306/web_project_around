import Popup from './Popup.js';

export class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._avatar = document.querySelector(avatarSelector);
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);

    };


    setAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = `Avatar de ${this._name.textContent}`;
    }

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