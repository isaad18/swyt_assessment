<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import PictureCardView from '@/components/PictureCardView'
import ProductDialog from '@/components/ProductDialog'
import AddProductDialog from '@/components/AddProductDialog'

const products = ref([])

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/products?take=10&skip=0')
  products.value = response.data
  console.log(response.data)
})

const take = ref(10)
const currentPage = ref(1)
const totalPages = ref(1)
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

  const response = await axios.get(`http://localhost:3000/products?take=${take.value}&skip=${(currentPage.value - 1) * take.value}&search=${search.value}${categ}`)
  console.log(response)
  products.value = response.data
}

async function clearSearch() {
  search.value = ''
  filter.value = ''
  const response = await axios.get(`http://localhost:3000/products?take=${take.value}&skip=${(currentPage.value - 1) * take.value}`)
  products.value = response.data
}

const dialog = ref(false)
const newProduct = ref(false)

function test2(maybe) {
  dialog.value = true
}

async function submit(form) {
  console.log(form._value)
  try{
  const api = await axios.post(`http://localhost:3000/products`, form._value)
  newProduct.value = false
  products.value.push(...api.data)
  } catch(e) {
    undefined
  }
}

// watch(
//    () => computedCurrentProposalsInfo.value.currentProposalsPage,
//    async () => {
//     let categ = ''
//     if (filter.value && filter.value !== '') {
//       categ = `&category=${filter.value}`
//     }

//     const response = await axios.get(`http://localhost:3000/products?take=${take.value}&skip=${(currentPage.value - 1) * take.value}&search=${search.value}${categ}`)
//     products.value = response.data
//    },
// )

</script>

<template>
  <ProductDialog :dialog="dialog" :product="products[0]" @close="() => {dialog = false}" />
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
              @open="test2($event)"
            />
          </VCardText>
          <VRow
                class="pt-3"
                justify="center"
            >
                <VCol cols="12">
                  <VPagination
                      color="white"
                      v-model="currentPage"
                      :length="totalPages"
                      rounded="circle"
                      class="align-center"
                  />
                </VCol>
            </VRow>
      </VCard>
    </div>
  </VCol>
</template>


