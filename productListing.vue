<template>
        <section>
        <header class="sf-heading">
            <h2 class="sf-heading__title sf-heading__title--h2">
                Have you seen these?
            </h2> 
            <div class="sf-heading__subtitle">
                #MADEFOR{{ userNameLabel.toUpperCase() }}
            </div>
        </header>
        <div class="cms-element-product-listing">
            <SfLoader :loading="loading" class="cms-element-product-listing__loader" />

            <div v-if="recommendations.length" class="cms-element-product-listing__wrapper">
                <transition-group
                    tag="div"
                    appear
                    name="cms-element-product-listing__slide"
                    class="cms-element-product-listing__list"
                    style="display: flex"
                    :class="{ 'cms-element-product-listing__list--blur': loading }"
                >
                    <SfProductCard
                        v-for="(product, i) in recommendations"
                        :key="product.id"
                        :title="product.title"
                        :image="product.image"
                        :special-price="null"
                        :regular-price="'€' + product.price"
                        :score-rating="false"
                        :image-width="700"
                        :image-height="1000"
                        class="sw-product-card"
                        :style="{ '--index': i }"
                        :show-add-to-cart-button="false"
                        :link="'#'"
                        :is-added-to-cart="false"
                        :wishlistIcon="false"
                    >
                    </SfProductCard>
                    
                </transition-group>
            </div>
        </div>
    </section>
</template>

<script>
import useRecommendations from './useRecommendations'
import { useUser, useAddToCart } from '@shopware-pwa/composables';
import { SfProductCard, SfAddToCart, SfLoader } from "@storefront-ui/vue"

export default {
    name: "ProductRecommendations",
    components: {
        SfProductCard,
        SfLoader
    },

    data () {
        return {
            loading: true,
            recommendations: []
        }
    },

    setup () {
        const { user } = useUser();
        
        const userNameLabel =  user?.value?.firstName || 'YOU' ;

        return {
            userNameLabel
        }
    },

    created () {
        useRecommendations.getRecommendations()
            .then(recommendations => {
                this.recommendations = recommendations;
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.loading = false
            })
    }
}
</script>