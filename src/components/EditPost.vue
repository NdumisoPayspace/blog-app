<template>
    <div v-if="state.loggedIn == true">
        <h1 class="heading">Edit Post</h1>
        <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
        <div v-for="error in state.validation">
            <div>
                <span class="px-2 py-2 mb-4 text-red-600 rounded shadow">
                    {{ error.message }}
                </span>                
            </div>
            <br>
        </div>
        <div class="form-card">
            <form @submit.prevent="submit">
            <div class="form-group">
                <h4 style="text-align: left;">Title</h4>
                <input
                type="text"
                name="title"
                v-model="state.post.title"
                class="form-control"
                />
            </div>
            <br>
            <div>
                <h4 style="text-align: left;">Image
                    <input class="form-control" type="file" name="file" accept="image/*" @change="onChangeFileUpload($event)"/>
                </h4>            
            </div>
            <br>
            <div>
                <h4 style="text-align: left;">Post</h4>
                <textarea
                name="post"
                v-model="state.post.post"
                class="form-control"
                cols="10"
                rows="4"
                ></textarea>
            </div>
            <br>
            <button @click.stop.prevent="editPost" class="btn btn-success">Save</button>
            </form>
        </div>
        </div>        
    </div>
    <div v-else>
        <h1 style="color: red;">Unauthorized. Please log in to view this page!</h1>
    </div>
  </template>
  
<script>
    import { onMounted, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import api from '../services/api';
  
    export default {
        setup() {
            const state = reactive({
                post: {
                    postId: '',
                    title: '',
                    post: '',
                    userId: '',
                    image: '',
                },
                file: null,
                validation: [],
                router: useRouter(),
                route: useRoute(),
                loggedIn: false,
            });

            const getPost = async (Id) => {
                await api.getPost(Id)
                .then((response) => {
                    state.post = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
            }

            const editPost = async () => {
                let formData = new FormData();
                formData.append('postId', state.post.postId);
                formData.append('title', state.post.title);
                formData.append('post', state.post.post);
                formData.append('userId', state.post.userId);
                formData.append('imageFile', state.file);

                await api.editPost(formData)
                .then(async ()=> {
                    alert("Updated successfully!");
                    await state.router.push({ path: '/posts' });   
                })
                .catch((error) => {
                    console.log(error.response.data)
                    state.validation = error.response.data;
                });
            }
                
            const onChangeFileUpload = (event) => {
                state.file = event.target.files[0];
            }

            onMounted(() => {
                if(localStorage.getItem('token') != null){
                    state.loggedIn = true;
                }

                getPost(state.route.params.Id);
            })

            return {state, editPost, onChangeFileUpload};
        },
    };
</script>