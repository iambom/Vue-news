import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsView from '../views/NewsView.vue'
import UserView from '../views/UserView.vue'
import ItemView from '../views/ItemView.vue'
import CreateListView from '../views/CreateListView.js'
import bus from '../utils/bus.js';
import { store } from '../store/index.js'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/news',
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView,
            // component: CreateListView('NewsView'),
            beforeEnter: (to, from, next) => {
                bus.$emit('start:spinner');
                store.dispatch('FETCH_LIST', to.name)
                .then(() => {
                    console.log('fetched');
                    next();
                })
                .catch((error) => {
                    console.log(error);
                });
            },
        },
        {
            path: '/ask',
            name: 'ask',
            // component: AskView,
            component: CreateListView('AskView'),
        },
        {
            path: '/jobs',
            name: 'jobs',
            // component: JobsView,
            component: CreateListView('JobsView')
        },
        {
            path: '/user/:id',
            component: UserView,
        },
        {
            path: '/item/:id',
            component: ItemView,
        }

    ]
});