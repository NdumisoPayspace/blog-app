<template>
    <h1 class="heading">Register</h1>
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
                <div>
                    <h4 style="text-align: left;">Name</h4>
                    <input
                        v-model="state.username"
                        name="name"
                        type="text"
                        input class="form-control"
                    />
                </div>
                <br>
                <div>
                    <h4 style="text-align: left;">Email</h4>
                    <input
                        v-model="state.email"
                        name="email"
                        type="email"
                        input class="form-control"
                    />
                </div>
                <br>
                <div>
                    <h4 style="text-align: left;">Password</h4>
                    <input
                        v-model="state.password"
                        name="password"
                        type="password"
                        input class="form-control"
                    />
                </div>
                <br>
                <div>
                    <button class="btn btn-primary">
                        Create Account
                    </button>
                </div>
                <br>
            </form>
            <p class="mt-8 text-xs font-light text-center text-gray-700">
                Don't have an account?

                <RouterLink
                to="/login"
                class="font-medium text-purple-600 hover:underline"
                >Login
                </RouterLink>
            </p>
        </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from "../services/api";

export default {
  name: 'Register',
  setup() {
    const state = reactive({
        username: '',
        email:'',
        password: '',
        router: useRouter(),
        validation: [],      
    })


    const submit = async () => {
        await api.register(state.username, state.email, state.password)
        .then(() => {
            alert("Registered successfully!")
            state.router.push({ path: '/login' });
        })
        .catch((error) => {
            state.validation = error.response.data;
        });
    };

    return { state, submit };
  },
};
</script>
