import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsView from '../views/NewsView.vue'
import UserView from '../views/UserView.vue'
import ItemView from '../views/ItemView.vue'
import CreateListView from '../views/CreateListView.js'

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
            // component: CreateListView('NewsView')
        },
        {
            path: '/ask',
            name: 'ask',
            // component: AskView,
            component: CreateListView('AskView')
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