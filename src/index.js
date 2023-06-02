import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCard } from './js/createCard.js';
import { fetchImages } from './js/fetchImages.js'

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

 
const form = document.querySelector("#search-form")
const buttonLoadMore = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery")


let query = ""
let page = 1;
const perPage = 40;
let simpleLightBox
buttonLoadMore.hidden = true


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
    buttonLoadMore.hidden = true
    page = 1

       query = evt.currentTarget.searchQuery.value.trim()
       gallery.innerHTML = ''


    if (query === "") {
        Notify.failure("Please enter a search query")
        return
       }
       fetchImages(query, page, perPage)

       .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      } else {
        createCard(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        Notify.success(`Hooray! We found ${data.totalHits} images.`)

          if (data.totalHits > perPage) {
              buttonLoadMore.hidden = false
            
        }else {
               buttonLoadMore.hidden = true 
            }
      }
    })
           .catch(error => console.log(error))
       
}
 
 

buttonLoadMore.addEventListener("click",onButtonLoadMore)


function onButtonLoadMore() {
    page += 1
     simpleLightBox

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            createCard(data.hits)
            simpleLightBox = new SimpleLightbox('.gallery a').refresh()

            const totalPages = Math.ceil(data.totalHits / perPage)

            if (page > totalPages) {
                buttonLoadMore.hidden = true
                Notify.info("We're sorry, but you've reached the end of search results.")
            } else {
               buttonLoadMore.hidden = false
            }
       })
       .catch(error => console.log(error))
   }

 