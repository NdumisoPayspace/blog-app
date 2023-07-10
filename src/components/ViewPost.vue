<template>
    <h1 class="heading">View Post</h1>
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
        <div class="row">
            <div class="col">
                <img class="post-image" :src="state.post.image" alt="post image">
            </div>
            <div class="col">
                <h5 class="post-title">{{ state.post.title }}</h5>
                <p class="post-text">{{ state.post.post }}</p>  
                <br>
                <div class="row">
                    <div class="col"><p class="post-user">{{ state.user }}</p></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import { onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import api from '../services/api';
  
    export default {
        setup() {
        const state = reactive({
            post: {
                title: '',
                post: '',
                image: '',
            },
            user: '',
            validation: [],
            route: useRoute(),
        });

        const getPost = async (Id) => {
            await api.getPost(Id)
            .then(async (response) => {
                state.post = response.data;
                await api.getUser(state.post.userId)
                .then((response) => {
                    state.user = response.data
                })   
                .catch((error) => {
                console.log(error)
                });  
            })
            .catch(e => {
                console.log(e);
            });
        }

        onMounted(() => {
            getPost(state.route.params.Id);
        })

        return {
            state,
            getPost,
        };
        },
    };
</script>