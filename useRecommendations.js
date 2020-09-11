import axios from 'axios';

export default {
    async getRecommendations () {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data.slice(0, 5);
    }
}