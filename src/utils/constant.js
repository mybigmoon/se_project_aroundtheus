export const initialCards = [
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

export const cardsWrap = document.querySelector(".cards__list");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const addCardCloseButton = document.querySelector(
  "#add-card-close-button"
);
export const addNewCardFormElement =
  addNewCardModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
