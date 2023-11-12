import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  initialCards,
  config,
  profileEditButton,
  addNewCardButton,
  addNewCardFormElement,
  profileTitleInput,
  profileEditForm,
  cardsWrap,
  profileDescriptionInput,
} from "../utils/constant.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------ Variables ------------------------ */

export const editProfileFormValidator = new FormValidator(
  profileEditForm,
  config
);
export const addNewCardFormValidator = new FormValidator(
  addNewCardFormElement,
  config
);

export const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);
newCardPopup.setEventListeners();

export const imagePopup = new PopupWithImage("#modal-preview");
imagePopup.setEventListeners();

/* ------------------------ Funciones ------------------------ */

function openPopup(popup) {
  popup.open();
}

function closePopup(popup) {
  popup.close();
}

function handleImageClick(cardData) {
  imagePopup.open(cardData.link, cardData.name, cardData.name);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleAddCardSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name: name, link: link };

  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);

  closePopup(newCardPopup);
  addNewCardFormElement.reset();
  addNewCardFormValidator.toggleButtonState();
}

function renderCard(item) {
  const cardElement = document.createElement("div");
  // Create and customize your card element based on the item data
  cardElement.textContent = item.name;
  return cardElement;
}

/* ------------------------ Event Listeners ------------------------ */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editProfileFormValidator.resetValidation();

  openPopup(profileEditModal);
});

// ... Otros event listeners

/* ------------------------ Inicialización ------------------------ */

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);
});

editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
