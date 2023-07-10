<template>
    <div v-if="state.loggedIn == true">
        <h1 class="heading">Posts</h1> 
        <div v-for="error in state.validation">
                <span class="rounded shadow" >
                    {{ error.message }}
                </span>
                <br>
        </div>
        <div style="text-align:right;">
            <router-link to="/addPost" class="btn btn-primary btn-lg text-right"  style="color:black;"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg> Add</router-link> 
        </div>
        <br>
        <div v-if="state.posts.length > 0">
            <div class="row">
                <div class="col-4" v-for="post in state.posts" :key="post.postId">
                    <div class="card post-card">
                        <img class="grid-image" :src="post.image" alt="post image">
                        <h5 class="title">{{ post.title }}</h5>
                        <p class="post">{{ post.post }}</p>
                        <div class="row" style="margin-left: 1px;">
                            <div class="col-2">
                                <b-button v-b-tooltip.hover title="View Post">
                                    <router-link :to="'/viewPost/' + post.postId" class="btn btn-primary" style="color:black;"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></router-link>
                                </b-button> 
                            </div>
                            <div class="col-2">
                                <b-button v-b-tooltip.hover title="Update Post">
                                    <router-link :to="`/editPost/${post.postId}`" class="btn btn-primary" style="color:black;"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></router-link>
                                </b-button> 
                            </div>
                            <div class="col-2">
                                <b-button v-b-tooltip.hover title="Delete Post" @click="deletePost(post.postId)" class="btn btn-primary" style="color:black;"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></b-button>
                            </div>
                            <div class="col-2"></div>
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
    <div v-else>
        <h1 style="color: red;">Unauthorized. Please log in to view this page!</h1>
    </div>
</template>

<script>
    import { onMounted, reactive } from 'vue';
    import api from '../services/api';

    export default {
        name: 'Posts',
        setup() {
            const state = reactive({
                posts: [],
                user: '',
                validation: [],
                loggedIn: false,
            });

            const getPosts = async () => {
                await api.getMyPosts()
                .then(async (response) => {
                    if (response.data.length > 0){
                        state.posts = response.data; 
                        await api.getUser(state.posts[0].userId)
                        .then((response) => {
                            state.user = response.data
                        })   
                        .catch((error) => {
                        console.log(error)
                        });                         
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            };

            const deletePost = async (Id) => {
                await api.deletePost(Id)
                .then(() => {
                    alert("Deleted successfully!")
                    location.reload();              
                })
                .catch((error) => {
                    state.validation = error.response.data;
                });
            }

            onMounted(() => {
                if(localStorage.getItem('token') != null){
                    state.loggedIn = true;
                }

                getPosts();
            })

            return { state, getPosts, deletePost };
        },

    };
</script>