import { fetchUserInfo, fetchItem, fetchList } from '../api/index.js';

export default {
    FETCH_LIST({ commit }, pageName) {
        return fetchList(pageName)
            .then(({data}) => {
                commit('SET_LIST', data)
            })
            .catch(error => console.log(error))
    },
    FETCH_USER({ commit }, name) {
        return fetchUserInfo(name)
            .then(({ data }) => {
                commit('SET_USER', data)
            })
            .catch(error => console.log(error))
    },
    FETCH_ITEM({ commit }, id) {
        return fetchItem(id)
            .then(({data}) => {
                commit('SET_ITEM', data)
            })
            .catch(error => console.log(error))
    },
}