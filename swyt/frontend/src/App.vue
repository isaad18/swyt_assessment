<script setup>
import { onMounted } from 'vue';
import axios from 'axios'
import SearchBar from '@/components/SearchBar'



onMounted(async () => {
  const response = await axios.get('http://10.63.175.120:3000/url')
  console.log(response.data)
})
function test() {
  console.log('testtttt')
}

</script>

<template>
  <div class="d-flex flex-column justify-start align-center w-100">
    <h1 class="text-white pa-4">Random Products Incoming</h1>
    <SearchBar
      @search="test"
      @clear="test"
    />
  </div>
</template>


