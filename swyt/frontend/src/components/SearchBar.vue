<script setup lang="ts">
import { defineEmits, ref } from 'vue'

interface Emit {
    (e: 'search', value: any): void
    (e: 'clear'): void
    (e: 'new'): void
}

interface SearchObject {
    search?: string
    filter?: string
}

const emit = defineEmits<Emit>();

const searchObject: SearchObject = ref({});

function search() {
    if(searchObject.value.filter !== '' && searchObject.value.search !== '') emit('search', searchObject.value)
}

function clear() {
    searchObject.value.filter = ''
    searchObject.value.search = ''
    emit('clear')
}

function newProduct() {
    emit('new')
}

const items = [
    'FOOD',
    'ELECTRONICS',
    'MOTORS',
    'FURNITURE',
    'DRINK',
    'OTHER'
]
</script>

<template>
    <VCard class="w-50 d-flex justify-start align-center grey">
        <VRow class="align-center pa-2 w-50">
        <VCol
            cols="12"
            md="3"
            lg="3"
        >
            <VTextField
                v-model="searchObject.search"
                class="text-white"
                label="search"
                dense
                variant="filled"
            />
        </VCol>

        <VCol
            cols="12"
            md="3"
            lg="3"
        >
            <VAutocomplete
                v-model="searchObject.filter"
                label="filter"
                class="text-white"
                :items="items"
                variant="filled"
                chips
            >
            </VAutocomplete>
        </VCol>

        <VCol
            class="d-flex gap-2"
            :class="{
                'justify-center': $vuetify.display.smAndDown,
                'justify-end': $vuetify.display.mdAndUp,
                'pe-6': $vuetify.display.mdAndUp,
            }"
        >
            <VBtn
                color="blue"
                size="small"
                class="mx-2 bg-blue text-h6 elevation-0"
                @click="search"
            >
                Search
            </VBtn>
            <VBtn
                color="grey"
                size="small"
                class="mx-2 grey text-h6 justify-center align-center lightgrey elevation-0"
                @click="clear"
            >
                Clear Search
            </VBtn>
            <VBtn
                color="grey"
                size="small"
                class="mx-2 bg-secondary text-h6 justify-center align-center lightgrey elevation-0"
                @click="newProduct"
            >
                Add Product
            </VBtn>
        </VCol>
        </VRow>
    </VCard>
</template>

<style>

.grey {
  background-color: #444444;
}

.lightgrey {
  background-color: #999999;
}

.white {
  background-color: #ffffff;
}

.black {
    background-color: #222222;
}

body, html {
  background-color: #222222;
  height: 100%;
}
</style>