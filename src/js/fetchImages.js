import axios from "axios";
export { fetchImages }

const BASE_URL = "https://pixabay.com/api/"
const TOKEN = "36715459-28e84205f82fac02ca5e4373e"
async function fetchImages(query, page, perPage) {
  const params = new URLSearchParams({
    key: TOKEN,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  return response = await axios.get(`${BASE_URL}/?${params}`);
    
}
