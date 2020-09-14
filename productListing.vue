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
                        v-for="(item, i) in recommendations"
                        :key="item.id"
                        :title="item.title"
                        :image="item.image"
                        :special-price="item.specialPrice"
                        :regular-price="item.price"
                        :max-rating="5"
                        :score-rating="item.rating"
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
    props: {
        slotContext: {
            type: Object,
            default: null
        }
    },

    data () {
        return {
            loading: true,
            recommendations: []
        }
    },

    setup() {
        const { user } = useUser();
        
        const userNameLabel =  user?.value?.firstName || 'YOU'

        return {
            userNameLabel
        }
    },

    async created() {
        console.log('setup')
        console.log(this.slotContext.id)
        try {
            let recommendations = await useRecommendations.getRecommendations(
                this.slotContext.id
            )
            this.recommendations = recommendations
        } catch {
            console.log(error)
        } finally {
            this.loading = false
        }
    }
}
</script>