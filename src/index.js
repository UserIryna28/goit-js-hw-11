import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchImages } from './js/fetchImages.js'
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
let simpleLightBox






BASE_URL = "https://pixabay.com/api/"
TOKEN = "36715459-28e84205f82fac02ca5e4373e"

async function fetchImages(page = 1) {   
return fetch(
    `${BASE_URL}?key=${TOKEN}&page=${page}`,
).then(response => {
    if (!response.ok) {
            throw new Error(response.statusText)
       }
        return response.json()   
       })  
}
   
  fetchImages()
      .then(data => {
 gallery.insertAdjacentHTML("beforeend", createCard(data.hits))
      })

    
function createCard(arr) {
  return arr.map(({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
       `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `
    )
    .join('')
}
 
form.addEventListener("click", onForm)

buttonLoadMore.addEventListener("submit",onButtonLoadMore)



function onForm(evt) {
    evt.preventDefault
    if (query.trim() === "") {
        Notify.failure("Please enter a search query")
        return
    }
}  

async function onButtonLoadMore() {
    currentPage += 1;
    const image = await fetchImages(query, page);
    const totalPages = Math.ceil(data.totalHits / perPage)
    if (page > totalPages) {
        createCard(image);
    } else {
        buttonLoadMore.style.display = 'none';
        Notify.info("We're sorry, but you've reached the end of search results.");
    }
}
// function onButtonLoadMore() {
//    page += 1
//    simpleLightBox.destroy()

//    fetchImages(query, page, perPage)
//      .then(({ data }) => {
//        createCard(data.hits)
//        simpleLightBox = new SimpleLightbox('.gallery a').refresh()

//        const totalPages = Math.ceil(data.totalHits / perPage)

//        if (page > totalPages) {
//          buttonLoadMore.classList.add('is-hidden')
//          Notify.failure("We're sorry, but you've reached the end of search results.")
//        }
//      })
//      .catch(error => console.log(error))
//  }
//  function clearGallery() {
//     gallery.innerHTML = '';
// }