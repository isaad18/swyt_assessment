<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';

defineEmits(['close'])

const props = defineProps({
   dialog: {
      type: Boolean,
   },
   product: {
      type: Object,
   },
})

const confirm = computed(() => props.dialog)


</script>

<template>
    <div>
        <VDialog
            v-model="confirm"
            class="pa-5"
            width="auto"
        >
            <VCard>
                <VCol>
                    <VCardItem>
                    <VImg
                    height="300"
                    width="300"
                    cover
                    class="bg-grey-lighten-2"
                    aspect-ratio="1"
                    :src="props.product.image"
                    />
                </VCardItem>
                <VCardTitle class="text-h4">
                    {{ props.product.name }}
                </VCardTitle>
                <VCardSubtitle class="text-h6">
                    ${{ props.product.price }}
                </VCardSubtitle>
                <VCardText class="text-h6">
                    {{ props.product.description }}
                </VCardText>
                <VBtn @click="$emit('close')">
                    Close
                </VBtn>
                </VCol>
            </VCard>
        </VDialog>
    </div>
</template>