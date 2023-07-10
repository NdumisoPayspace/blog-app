<template>
  <div class="sidenav">
    <br>
    <div class="row">
      <div class="logo col">
        <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z"/></svg>
      </div>
      <div class="col">
        <h1><span style="font-weight: 1000; color:#35334e">BlogIT</span></h1>
      </div>
    </div>
    <br/>
    <div class="card" style="background-color: rgba(128, 128, 128, 0); min-height: 70vh;">
      <br />
      <RouterLink to="/">Home</RouterLink> 
      <br/>
      <RouterLink to="/posts">Posts</RouterLink> 
      <br/>
      <RouterLink to="/login">Login</RouterLink> 
      <br/>
      <RouterLink to="/register">Register</RouterLink> 
      <br/>
      <button class="btn btn-primary" @click="Logout">Logout</button>
    </div>
  </div>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
  import {useRouter} from 'vue-router'
  export default {
    name: 'App',
    setup() {
      const router = useRouter();
      const Logout = () => {
        localStorage.clear();
        router.push({ path: '/' });
      };
    return { Logout };
  },
  }
</script>