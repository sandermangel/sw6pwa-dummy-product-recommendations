import axios from 'axios';
import { ref } from '@vue/composition-api';

const useRecommendations = () => {
    const recommendations = ref([])
    const apiError = ref('')
    const isLoading = ref(true)

    const getRecommendations = async (productId) => {
        isLoading.value = true
        try {
            let { data } = await axios.get('https://fakestoreapi.com/products?productId=' + productId);

            recommendations.value = data.slice(0, 5).map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    price: `€${item.price}`,
                    specialPrice: null,
                    rating: Math.floor(Math.random() * 3) + 2
                }
            })

            isLoading.value = false
        } catch(error) {
            apiError.value = error.response.data.message
        }
    }

    getRecommendations()

    return { 
        recommendations, 
        apiError,
        isLoading
    }
}

export { useRecommendations }