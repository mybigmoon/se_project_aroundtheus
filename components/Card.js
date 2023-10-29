export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardTemplate = document.querySelector(cardSelector).content;
    this._cardElement = this._cardTemplate
      .querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardRemoveButton = this._cardElement.querySelector(
      ".card__button-remove"
    );
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardRemoveButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  getCardElement() {
    this._setEventListeners();
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    return this._cardElement;
  }
}
