const modal = document.getElementById("modal");
const modalAdd = document.getElementById("add-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmark-container");

let bookmarksLocalStorage = [];

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

// Validate form
function validateUrl(nameUrl, urlValue) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  // validate if both inputs have values
  if (!nameUrl || !urlValue) {
    alert("please fill all the fields out");
    return false;
  }
  // validate if urlValue it´s a valid one
  if (urlValue.match(regex)) {
    return true;
  }
  if (!urlValue.match(regex)) {
    alert("provide valid url");
  }
  // Valid
  return true;
}

// Build Bookmarks
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // build items
  bookmarksLocalStorage.forEach((element) => {
    const { url, name } = element;
    // creating item
    const item = document.createElement("div");
    item.classList.add("item");
    // creating name element
    const nameElement = document.createElement("div");
    nameElement.classList.add("name");
    const imageItem = document.createElement("img");
    imageItem.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    imageItem.setAttribute("alt", "Favicon");
    // creating link element
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", `${url}`);
    linkElement.setAttribute("target", `_blank`);
    linkElement.textContent = name;
    // creating close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times", "delete-bookmark");
    closeIcon.title = "Delete Bookmark";
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Appends
    nameElement.appendChild(imageItem);
    nameElement.appendChild(linkElement);
    nameElement.appendChild(closeIcon);
    item.appendChild(nameElement);
    bookmarksContainer.appendChild(item);
  });
}

// create bookmark from localStorage
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks") === "[]") {
    localStorage.removeItem("bookmarks");
  }
  //   get bookmars fromlocalstorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarksLocalStorage = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // creating a fake initial bookmark to show something the first time when don´t have bookmarks yet
    bookmarksLocalStorage = [
      {
        name: "Google (example)",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksLocalStorage));
  }
  buildBookmarks();
}

// modal eventlisteners
modalAdd.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
// close modal with click out of modal
window.addEventListener("click", (event) => {
  event.target === modal ? closeModal() : false; // flase means don´t do anything
});

// Delete a bookmark
function deleteBookmark(url) {
  bookmarksLocalStorage.forEach((element, index) => {
    if (element.url === url) {
      bookmarksLocalStorage.splice(index, 1);
    }
  });
  // update localStorage and re-populate Dom
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksLocalStorage));
  fetchBookmarks();
}

// Handle date from form
function storeBookmark(event) {
  event.preventDefault();
  //   const websiteName = event.srcElement[0].value;
  //   const websiteUrl = event.srcElement[1].value; this is on way to get the data in the input or next
  const websiteName = websiteNameEl.value;
  let websiteUrl = websiteUrlEl.value;
  // checking if website written by user includes https:// or http://
  if (!websiteName.includes("https://", "http://")) {
    websiteUrl = `https://${websiteUrl}`;
  }

  const newBookmark = {
    name: websiteName,
    url: websiteUrl,
  };

  bookmarksLocalStorage.push(newBookmark);
  bookmarkForm.reset();
  websiteNameEl.focus();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksLocalStorage));
  fetchBookmarks();
  console.log(websiteName, websiteUrl);
  validateUrl(websiteName, websiteUrl);
}

// event listeners
bookmarkForm.addEventListener("submit", storeBookmark);
//onload,
fetchBookmarks();
