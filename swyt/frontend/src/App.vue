<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import PictureCardView from '@/components/PictureCardView'
import ProductDialog from '@/components/ProductDialog'
import AddProductDialog from '@/components/AddProductDialog'

const products = ref([])

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/products')
  products.value = response.data
})

const search = ref('')
const filter = ref('')

async function searchProducts(searchObj) {

  console.log(searchObj)
  filter.value = searchObj.filter
  search.value = searchObj.search

  if (!searchObj.value) {
    search.value = ''
  }

  let categ = ''
  if (filter.value && filter.value !== '') {
    categ = `&category=${filter.value}`
  }

  const response = await axios.get(`http://localhost:3000/products?search=${search.value}${categ}`)
  products.value = response.data
}

async function clearSearch() {
  search.value = ''
  filter.value = ''
  const response = await axios.get(`http://localhost:3000/products`)
  products.value = response.data
}

const dialog = ref(false)
const newProduct = ref(false)

const objectSent = ref({})

function viewProduct(id) {
  objectSent.value = products.value.find((product) => product.id === id)
  dialog.value = true
}

async function submit(form) {
  console.log(form._value)
  try{
  const api = await axios.post(`http://localhost:3000/products`, form._value)
  newProduct.value = false
  products.value.push(api.data)
  } catch(e) {
    undefined
  }
}
</script>

<template>
  <ProductDialog :dialog="dialog" :product="objectSent" @close="() => {dialog = false}" />
  <AddProductDialog :dialog="newProduct" :product="products[0]" @close="() => {newProduct = false}" :uploadUrl="'/multer/upload'" @submit="submit($event)" />
  <VCol class="d-flex flex-column align-center w-100" cols="12">
    <h1 class="text-white pa-4">Random Products Incoming</h1>
    <SearchBar
      @search="searchProducts($event)"
      @clear="clearSearch"
      @new="() => {newProduct = true}"
    />
    <div class="w-50 pt-4">
      <VCard class="grey">
        <VCardText class="ma-sm-4 pt-2 pb-2 text-subtitle-2">
            <PictureCardView
              :products="products"
              @open="viewProduct($event)"
            />
          </VCardText>
      </VCard>
    </div>
  </VCol>
</template>
