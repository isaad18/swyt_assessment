<script setup lang="ts">
import { defineProps, computed, defineEmits, ref, watch } from 'vue';
import axios from 'axios'
import { Product } from './type.d';

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
   dialog: {
      type: Boolean,
   },
   product: {
      type: Object,
   },
   uploadUrl: {
    type: String,
   }
})

const form: Product = ref({})

const attachment = ref([])

const errorText = ref('Please fill in all the fields before submitting')

const validate = computed(() => {
    if(form.value.name && form.value.price && form.value.description && form.value.image && form.value.category) return true

    return false
})

const confirm = computed(() => props.dialog)

const fileError = ref(false)

async function uploadFile() {
  const formData = new FormData()  
  formData.append(`file`, attachment.value[0])

  try{
    const api = await axios.post(`http://localhost:3000/multer/upload`, formData)
    form.value.image = `http://localhost:3000${api.data.file_url}`
    form.value.price = parseInt(form.value.price as string)
    fileError.value = false
    validate.value ? emit('submit', form) : undefined
  } catch (e) {
    fileError.value = true
  }

}

const items = [
    'FOOD',
    'ELECTRONICS',
    'MOTORS',
    'FURNITURE',
    'DRINK',
    'OTHER'
]

async function submit() {
    uploadFile()
}

</script>

<template>
    <div>
        <VDialog
            v-model="confirm"
            class="pa-5"
            width="auto"
            min-width="600"
        > 
            <VCard>
                <VCol>

                    <div class="text-subtitle-1 font-weight-bold">
                        Attach a photo
                    </div>
                    <hr color="" />
                    <VResponsive class="mx-auto w-auto pt-4">
                        <VFileInput
                            v-model="attachment"
                            label="File"
                            variant="filled"
                            @click:clear="() => {form.image = ''}"
                        />
                    </VResponsive>

                    <div class="text-subtitle-1 font-weight-bold">
                        Product Name
                    </div>
                    <hr color="" />
                    <VResponsive class="mx-auto w-auto pt-4">
                        <VTextField
                            v-model="form.name"
                            label="Name"
                            variant="filled"
                        />
                    </VResponsive>

                    <div class="text-subtitle-1 font-weight-bold">
                        Price
                    </div>
                    <hr color="" />
                    <VResponsive class="mx-auto w-auto pt-4">
                        <VTextField
                            v-model="form.price"
                            label="Price"
                            variant="filled"
                        />
                    </VResponsive>

                    <div class="text-subtitle-1 font-weight-bold">
                        Description
                    </div>
                    <hr color="" />
                    <VResponsive class="mx-auto w-auto pt-4" width="400">
                        <VTextField
                            v-model="form.description"
                            label="Description"
                            variant="filled"
                        />
                    </VResponsive>

                    <div class="text-subtitle-1 font-weight-bold">
                        Category
                    </div>
                    <hr color="" />
                    <VResponsive class="mx-auto w-auto pt-4" width="400">
                        <VAutocomplete
                            v-model="form.category"
                            :items="items"
                            label="Category"
                            variant="filled"
                        />
                    </VResponsive>

                    <h4 v-if="!validate" class="text-red">{{ errorText }}</h4>
                    <h4 v-if="fileError" class="text-red">File Error</h4>

                    <VBtn class="mx-2" color="primary" @click="submit">
                        Submit
                    </VBtn>
                    <VBtn class="mx-2" @click="$emit('close')">
                        Close
                    </VBtn>
                </VCol>
            </VCard>
        </VDialog>
    </div>
</template>