import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  initialCards,
  config,
  profileEditButton,
  addNewCardModal,
  addNewCardButton,
  addNewCardFormElement,
  profileTitleInput,
  profileTitle,
  profileEditForm,
  profileEditModal,
  cardsWrap,
  profileDescription,
  profileDescriptionInput,
} from "../utils/constant.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------ Variables ------------------------ */

const editProfileFormValidator = new FormValidator(profileEditForm, config);
const addNewCardFormValidator = new FormValidator(
  addNewCardFormElement,
  config
);

const newCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#modal-preview");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
editProfilePopup.setEventListeners();

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

/* ------------------------ Funciones ------------------------ */

function handleImageClick(cardData) {
  imagePopup.open(cardData.link, cardData.name, cardData.name);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;

  const cardData = { name: name, link: link };

  cardSection.addItem(cardData);
  newCardPopup.close();
  addNewCardFormValidator.toggleButtonState();
}

function handleEditProfileSubmit() {
  profileUserInfo.setUserInfo(
    profileTitleInput.value,
    profileDescriptionInput.value
  );
}

function renderCard(item) {
  const cardElement = document.createElement("div");
  // Create and customize your card element based on the item data
  cardElement.textContent = item.name;
  return cardElement;
}

/* ------------------------ Event Listeners ------------------------ */

profileEditButton.addEventListener("click", () => {
  const { name, job } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;

  editProfileFormValidator.resetValidation();

  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

cardSection.renderItems();

editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
