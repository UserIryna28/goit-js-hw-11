// import axios from "axios";
// export { fetchImages }

// BASE_URL = "https://pixabay.com/api/"
// TOKEN = "36715459-28e84205f82fac02ca5e4373e"

// async function fetchImages(page = 1) {   
// return fetch(
//     `${BASE_URL}?key=${TOKEN}&page=${page}`,
// ).then(response => {
//        if (!response.ok) {
//            throw new Error(response.statusText)
//       }
//        return response.json()   
//       })  
//   }

// BASE_URL = "https://pixabay.com/api/"
// // //  const ENDPOINT = "/image_type"
// TOKEN = "36715459-28e84205f82fac02ca5e4373e"
 
// const options = {
//     method: "GET",
//     headers: {
//         Authorization: "Bearer ${TOKEN}"
//     }
// }

// axios.defaults.BASE_URL = 'https://pixabay.com/api/'
// const TOKEN = '36715459-28e84205f82fac02ca5e4373e'

// async function fetchImages(query, page, perPage) {
//   const response = await axios.get(
//     `?key=${TOKEN}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
//      )
    
//    return response
//  }

  
   