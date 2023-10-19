const modal = document.getElementById("modal");
const modalAdd = document.getElementById("add-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmar-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmark-container");

// Show modal, Focus on input
function showModal() {
  modal.classList.add("show-modal");
  // focus on the first input
  websiteNameEl.focus();
}

// close modal
function closeModal() {
  modal.classList.remove("show-modal");
}

// eventlisteners
modalAdd.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
