export default class FormValidator {
  constructor(formEl, options) {
    this._formEl = formEl;
    this._options = options;
    this._submitButton = formEl.querySelector(
      this._options.submitButtonSelector
    );
    this._inputEls = [
      ...this._formEl.querySelectorAll(this._options.inputSelector),
    ];
  }

  showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._options.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._options.errorClass);
  }

  hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._options.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._options.errorClass);
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this.showInputError(inputEl);
    }
    this.hideInputError(inputEl);
  }

  hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this._submitButton.classList.add(this._options.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._options.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this.checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this.hideInputError(inputEl);
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.setEventListeners();
  }
}
