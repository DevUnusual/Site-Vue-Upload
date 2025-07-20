<!-- FileDownloadCard.vue -->
<template>
  <v-card v-if="show" class="mt-4 pa-3" elevation="2" max-width="500">
    <v-row no-gutters align="center">
      <v-col cols="2">
        <v-icon size="x-large" color="primary">mdi-file-document-outline</v-icon>
      </v-col>
      <v-col cols="8">
        <div class="text-subtitle-1 font-weight-medium">{{ file?.name }}</div>
        <div class="text-caption text-grey">
          {{ fileSizeMB }} MB
        </div>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-btn 
          icon 
          color="success" 
          :href="downloadUrl" 
          target="_blank"
          :disabled="!file"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

// Props: file (objeto File), show (booleano, ex: step === 3), backendUrl (opcional)
const props = defineProps({
  file: { type: Object, default: null },
  show: { type: Boolean, default: false },
  backendUrl: { type: String, default: 'http://localhost:3000' }
})

const fileSizeMB = computed(() =>
  props.file ? (props.file.size / 1024 / 1024).toFixed(2) : '0.00'
)

const downloadUrl = computed(() =>
  props.file ? `${props.backendUrl}/download/${encodeURIComponent(props.file.name)}` : '#'
)
</script>
