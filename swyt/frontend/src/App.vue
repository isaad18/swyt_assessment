<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import PictureCardView from '@/components/PictureCardView'
import ProductDialog from '@/components/ProductDialog'
import AddProductDialog from '@/components/AddProductDialog'
import { Product } from '@/components/interfaces'

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/url')
  console.log(response.data)
})

function test() {
  console.log('testtttt')
}

const dialog = ref(false)
const newProduct = ref(false)

function test2(maybe) {
  dialog.value = true
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
]

async function submit(form: Product) {
  const api = await axios.post(`http://localhost:3000/products`, form)
}

</script>

<template>
  <ProductDialog :dialog="dialog" :product="products[0]" @close="() => {dialog = false}" />
  <AddProductDialog :dialog="newProduct" :product="products[0]" @close="() => {newProduct = false}" :uploadUrl="'/multer/upload'" />
  <VCol class="d-flex flex-column align-center w-100" cols="12">
    <h1 class="text-white pa-4">Random Products Incoming</h1>
    <SearchBar
      @search="test"
      @clear="test"
      @new="() => {newProduct = true}"
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


