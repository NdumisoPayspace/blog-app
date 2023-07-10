<template>
    <div v-if="state.loggedIn == true">
        <h1 class="heading">Add Post</h1>
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
                        v-model="state.title"
                        class="form-control"
                        />
                    </div>
                    <br>
                    <div class="form-group">
                        <h4 style="text-align: left;">Image
                            <input class="form-control" type="file" name="file" accept="image/*" @change="onChangeFileUpload($event)"/>
                        </h4>            
                    </div>
                    <br>
                    <div class="form-group">
                        <h4 style="text-align: left;">Post</h4>
                        <textarea
                        name="post"
                        v-model="state.post"
                        class="form-control"
                        cols="10"
                        rows="4"
                        ></textarea>
                    </div>
                    <br>
                    <button class="btn btn-primary" type="submit">
                        Post
                    </button>
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
    import { useRouter } from 'vue-router';
    import api from '../services/api';
  
    export default {
        setup() {
        const state = reactive({
            title: '',
            post: '',
            file: null,
            validation: [],
            router: useRouter(),
            loggedIn: false,
        });

        const submit = async () => {
            let formData = new FormData();
            formData.append('title', state.title);
            formData.append('post', state.post);
            formData.append('imageFile', state.file);

            await api.addPost(formData)
            .then(async () => {
                alert("Added successfully!");
                await state.router.push({ path: '/posts' });                
            })
            .catch((error) => {
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
        })

        return {
            state,
            submit,
            onChangeFileUpload
        };
        },
    };
</script>