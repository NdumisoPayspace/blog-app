<template>
    <div>
       <h1 class="heading">Home</h1> 
       <div v-if="state.posts.length > 0">
            <div class="row">
                <div class="col-4" v-for="post in state.posts" :key="post.postId">
                    <div class="card post-card">
                       <img class="grid-image" :src="post.image" alt="post image">
                        <h5 class="title">{{ post.title }}</h5>
                        <p class="post">{{ post.post }}</p>
                        <div class="row">
                            <router-link :to="'/viewPost/' + post.postId" class="btn btn-primary" style="margin-left: 20px; color:black; width: 10vw;">Read More</router-link>
                        </div> 
                    </div>
                </div>   
            </div>
       </div>
       <div v-else>
            <div>
                <h3>No Posts Yet</h3>
            </div>
       </div>
    </div>
</template>

<script>
    import { onMounted, reactive } from 'vue';
    import api from "../services/api"

    export default {
        name: 'Posts',
        setup() {
            const state = reactive({
                posts: []
            });

            const getPosts = async () => {
                await api.getPosts()
                .then(async (response) => {
                    state.posts = response.data; 
                    for(let i = 0; i < state.posts.length; i++){
                        await api.getUser(state.posts[i].userId)
                        .then((response) => {
                            state.posts[i].username = response.data
                        })
                    } 
                    console.log(state.posts)             
                })
                .catch((error) => {
                    console.log(error)
                });
            };

            onMounted(() => {
                getPosts();
            })

            return { state, getPosts };
        },

    };
</script>