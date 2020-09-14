import axios from 'axios';

export default {
    async getRecommendations () {
        try {
            let response = await axios.get('https://fakestoreapi.com/products');
            return response.data.slice(0, 5).map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    price: '€' + item.price,
                    specialPrice: null,
                    rating: Math.floor(Math.random() * 3) + 1
                }
            })
        } catch(error) {
            throw new Error(error.response.data.message)
        }
    }
}