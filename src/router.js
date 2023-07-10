import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Posts from './components/Posts.vue'
import AddPost from './components/AddPost.vue'
import EditPost from './components/EditPost.vue'
import ViewPost from './components/ViewPost.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/posts',
            name: 'posts',
            component: Posts
        },
        {
            path: '/addPost',
            name: 'addPost',
            component: AddPost
        },
        {
            path: '/editPost/:Id',
            name: 'editPost',
            component: EditPost
        },
        {
            path: '/viewPost/:Id',
            name: 'viewPost',
            component: ViewPost
        }
    ]
});

export default router;