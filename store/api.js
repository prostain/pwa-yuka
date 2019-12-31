import { asyncGetProducts } from '~/common/api'

export const state = () => []

export const mutations = {
    gotProducts(state, payload){
        state = payload
    }
}

export const actions = {
    async fetchProducts(context){
        const products = await asyncGetProducts()
        context.commit('gotProducts', products)
    }
}
