import { fetchUserInfo, fetchItem, fetchList } from '../api/index.js';

export default {
    async FETCH_LIST({ commit }, pageName) {
        try {
            const response = await fetchList(pageName);
            commit('SET_LIST', response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_USER({ commit }, name) {
        const response = await fetchUserInfo(name);
        commit('SET_USER', response.data);
        return response;
    },
    async FETCH_ITEM({ commit }, id) {
        const response = await  fetchItem(id);
        commit('SET_ITEM', response.data);
        return response;
    },
}