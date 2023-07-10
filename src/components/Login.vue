<template>
    <h1 class="heading">Login</h1>
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
        <form class="space-y-4" @submit.prevent="submit">
            <div class="form-group">
                <h4 style="text-align: left;">Username</h4>
                <input
                    type="text"
                    name="username"
                    v-model="state.username"
                    class="form-control"
                />
            </div>
            <br>
            <div>
            <h4 style="text-align: left;">Password</h4>
            <input
                type="password"
                name="password"
                v-model="state.password"
                class="form-control"
            />
            </div>
            <br>
            <div>
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
        <br>
        <p class="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?
            <RouterLink
            to="/register"
            class="font-medium text-purple-600 hover:underline"
            >Register</RouterLink
            >
        </p>
        </div>
    </div>
</template>
<script>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../services/api';

    export default {
        name: 'Login',
        setup() {
            const state = reactive({
                username: '',
                password: '',
                router: useRouter(),
                validation: [],           
            })

            const submit = async () => {
                await api.login(state.username, state.password)
                .then(async (response) => {
                    localStorage.setItem('token', response.data.token);
                    alert("Logged in successfully!")
                    await state.router.push({ path: '/posts' });                
                }).catch((error) => {
                    state.validation = error.response.data;
                });
            };

            return { state, submit };
        },
    };
</script>
