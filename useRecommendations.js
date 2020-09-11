import axios from 'axios';

export default {
    getRecommendations () {
        return axios.get('https://fakestoreapi.com/products')
            .then(response => {
                return response.data;
            })
    }
}