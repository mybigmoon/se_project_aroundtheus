import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ----------------------------------------------------------------*/
/*                       Elements                                  */
/*-----------------------------------------------------------------*/

const cardsWrap = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#add-card-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addNewCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewImageModalClose = document.querySelector(
  "#preview-button-close-modal"
);
const addCardSubmitButton = addNewCardModal.querySelector(
  ".modal__save-button"
);
const cardTitleInput = document.querySelector("#modal-input-title");

const cardUrlInput = document.querySelector("#modal-input-description");

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileFormValidator = new FormValidator(profileEditForm, config);

const addNewCardFormValidator = new FormValidator(
  addNewCardFormElement,
  config
);

/* ----------------------------------------------------------------*/
/*                       Functions                                 */
/*-----------------------------------------------------------------*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

// pass this segment to the Card class

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageTitle.textContent = cardData.name;
  openPopup(previewImageModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

/* ----------------------------------------------------------------*/
/*                       Event Handlers                            */
/*-----------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name: name, link: link };

  const cardElement = renderCard(cardData);
  //append to the page
  cardsWrap.prepend(cardElement);

  closePopup(addNewCardModal);
  addNewCardFormElement.reset();
  addNewCardFormValidator.toggleButtonState();
}

/* ----------------------------------------------------------------*/
/*                       Event Listeners                           */
/*-----------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editProfileFormValidator.resetValidation();

  openPopup(profileEditModal);
});

const allModals = [...document.querySelectorAll(".modal")]; /* Array */

allModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains("modal__close")
    ) {
      //event.currentTarget is the element that the listener is attached to
      closePopup(modal);
    }
  });
});

//  Form Listeners //

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardFormElement.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardModal);
});

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

//initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

initialCards.forEach((cardData) => {
  const cardElement = renderCard(cardData);
  //append to the page
  cardsWrap.prepend(cardElement);
});

editProfileFormValidator.enableValidation();

addNewCardFormValidator.enableValidation();
