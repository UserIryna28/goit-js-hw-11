import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

 
const form = document.querySelector("#search-form")
const buttonLoadMore = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")

let query = ""
let page = 1;
const perPage = 40;


fetchImages(query, page, perPage) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.hits;
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}



form.addEventListener("click", onForm)

buttonLoadMore.addEventListener("submit",onButtonLoadMore)
// створюємо картку зображення
function createCard(images) {
    const markup = images
        .map(image => {
            const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
            return `
         <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}"></div>
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}</p>
        <p class="info-item">
          <b>Views</b>${views}</p>
        <p class="info-item">
          <b>Comments</b>${comments}</p>
        <p class="info-item">
          <b>Downloads</b>${downloads}</p>
            </div>
        </div>
         </a>  `
        }).join("")
    gallery.insertAdjacentHTML('beforeend', markup)
}
    
    
function onForm(evt) {
    evt.preventDefault
    clearGallery()

    if (query.trim() === "") {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

    }

 function clearGallery() {
    gallery.innerHTML = '';
}