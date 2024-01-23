<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'



onMounted(async () => {
  const response = await axios.get('http://10.63.175.120:3000/url')
  console.log(response.data)
  // console.log('API URL:', process.env.IP);
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

