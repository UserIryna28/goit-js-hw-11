import Notiflix from 'notiflix'

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

 import axios from "axios";
 axios.get('/users')
   .then(res => {
    console.log(res.data);
  });

//  const form = document.querySelector("#search-form")
// const buttonLoadMore = document.querySelector(".load-more")
// form.addEventListener("click",)

// buttonLoadMore.addEventListener("submit",)



 const BASE_URL = "https://pixabay.com/api/"
 const ENDPOINT = "/image_type"
const TOKEN = "36715459-28e84205f82fac02ca5e4373e"
 
const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer ${TOKEN}"
    }
}
fetch ("${BASE_URL} ${ENDPOINT}", options)