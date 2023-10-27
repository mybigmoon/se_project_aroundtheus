import Card from "../scripts/Card";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const Card = NewCard(cardData);

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardRemoveButton = cardElement.querySelector(".card__button-remove");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardRemoveButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", function () {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  return cardElement;
}

const cardTitleInput = addNewCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardUrlInput = addNewCardFormElement.querySelector(
  ".modal__input_type_url"
);

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
  renderCard({ name, link }, cardsWrap);
  closePopup(addNewCardModal);
  addNewCardFormElement.reset();
  const inputs = [...addNewCardModal.querySelectorAll(".modal__input")];
  toggleButtonState(inputs, addCardSubmitButton, config);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* ----------------------------------------------------------------*/
/*                       Event Listeners                           */
/*-----------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  // Hide input error messages for the profile edit form
  const inputEls = [...profileEditForm.querySelectorAll(config.inputSelector)];
  inputEls.forEach((inputEl) => {
    hideInputError(profileEditForm, inputEl, config);
  });

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

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

addNewCardButton.addEventListener("click", () => {
  // Hide input error messages for the add card form
  const inputEls = [
    ...addNewCardFormElement.querySelectorAll(config.inputSelector),
  ];
  inputEls.forEach((inputEl) => {
    hideInputError(addNewCardFormElement, inputEl, config);
  });

  openPopup(addNewCardModal);
});
