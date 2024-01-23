<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

defineEmits(['open'])
const props = defineProps({
   products: {
      type: Array,
   },
})

const zoomTransition = ref('transform 0.3s ease-in-out')

</script>

<template>
   <VRow class="d-flex flex-wrap gap-3">
    <VCol
        cols="3"
        v-for="product in props.products"
        :key="product.id"
      >
      <VCard
        @click="$emit('open', product.id)"
        class="mb-4"
        >
        <VImg
            cover
            class="bg-grey-lighten-2"
            aspect-ratio="1"
            :src="product.image"
        />
        <VCardTitle class="text-h6">{{ product.name }}</VCardTitle>
     </VCard>
    </VCol>
   </VRow>
</template>

<style scoped>
.clickable-text {
   color: transparent;
   cursor: pointer;
   text-decoration: underline;
}
</style>
