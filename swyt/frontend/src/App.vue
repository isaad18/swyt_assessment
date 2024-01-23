<script setup>
import { onMounted } from 'vue';
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import PictureCardView from '@/components/PictureCardView'



onMounted(async () => {
  const response = await axios.get('http://10.63.175.120:3000/url')
  console.log(response.data)
})
function test() {
  console.log('testtttt')
}

function test2(maybe) {
  console.log(maybe)
}
const products = [
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
  {
    id: 3,
    name: 'string',
    description: 'string;',
    price: 4444,
    image: 'https://picsum.photos/200/300',
    category: 'FOOD'
  },
]

</script>

<template>
  <VCol class="d-flex flex-column align-center w-100" cols="12">
    <h1 class="text-white pa-4">Random Products Incoming</h1>
    <SearchBar
      @search="test"
      @clear="test"
    />
    <div class="w-50 pt-4">
      <VCard class="grey">
        <VCardText class="ma-sm-4 pt-2 pb-2 text-subtitle-2">
          <PictureCardView
            :products="products"
            @open="test2($event)"
            />
          </VCardText>
      </VCard>
    </div>
  </VCol>
</template>


