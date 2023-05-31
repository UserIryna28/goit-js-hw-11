import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios"
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






const BASE_URL = "https://pixabay.com/api/"
const TOKEN = "36715459-28e84205f82fac02ca5e4373e"
async function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: TOKEN,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  const response = await axios.get(`${BASE_URL}/?${params}`);
  return response;
}
// async function fetchImages(query, page) {
// return fetch(
//     `${BASE_URL}?key=${TOKEN}&page=${page}`,
// ).then(response => {
//     if (!response.ok) {
//             throw new Error(response.statusText)
//        }
//         return response.json()
//        })
// }
   
//   fetchImages()
//       .then(data => {
//  gallery.insertAdjacentHTML("beforeend", markup)
//       })



form.addEventListener("submit", onForm)
   function onForm(evt) {
    evt.preventDefault()
    
    page = 1

       query = evt.currentTarget.searchQuery.value.trim()
       gallery.innerHTML = ''
  buttonLoadMore.classList.add('is-hidden')

    if (query.trim() === "") {
        Notify.failure("Please enter a search query")
        return
       }
       fetchImages()
//       .then(query => {
//  gallery.insertAdjacentHTML("beforeend", createCard(query.hits))
//       })
       .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      } else {
        createCard(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        Notify.success(`Hooray! We found ${data.totalHits} images.`)

        if (data.totalHits > perPage) {
          buttonLoadMore.classList.remove('is-hidden')
        }
      }
    })
           .catch(error => console.log(error))
       gallery.insertAdjacentHTML("beforeend", createCard(data.hits))
}
 
 
function createCard(images) {
     const markup = images
         .map(image => {
             const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
     return `
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
 })
         .join('')
    
    gallery.insertAdjacentHTML("beforeend", markup)
 }
 


buttonLoadMore.addEventListener("click",onButtonLoadMore)




// function onButtonLoadMore() {
//      currentPage += 1;
//      // const image = await fetchImages(query, page);
//      const totalPages = Math.ceil(data.totalHits / perPage)
//      if (page > totalPages) {
//          createCard(image);
//      } else {
//          buttonLoadMore.style.display = 'none';
//          Notify.info("We're sorry, but you've reached the end of search results.");
//      }
//  }
// 

function onButtonLoadMore() {
      page += 1
     simpleLightBox

     fetchImages()
       .then(({ data }) => {
        createCard(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()

         const totalPages = Math.ceil(data.totalHits / perPage)

         if (page > totalPages) {
           buttonLoadMore.classList.add('is-hidden')
           Notify.failure("We're sorry, but you've reached the end of search results.")
         }
       })
       .catch(error => console.log(error))
   }

 