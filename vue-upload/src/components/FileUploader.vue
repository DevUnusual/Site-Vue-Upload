<template>
  <v-file-upload
  density="default"
  v-model="fileList"
  :multiple="false"
>
  <template #prepend>
    <v-icon size="x-large" color="primary">
      <GenericFileIcon />
    </v-icon>
  </template>
</v-file-upload>

  <v-btn @click="uploadFile" :disabled="!fileList.length || uploading">Enviar</v-btn>

  <v-progress-linear
    v-if="progress > 0"
    :model-value="progress"
    height="20"
    color="green"
    striped
    animated
    class="my-4"
  >
    {{ progress }}%
  </v-progress-linear>

  <v-stepper v-model="step" class="mt-4" v-if="uploading || step === 3">
    <v-stepper-header>
      <v-stepper-item
        title="Enviando"
        subtitle="Enviando arquivo..."
        :value="1"
        :complete="step > 1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Processando"
        subtitle="Mesclando partes..."
        :value="2"
        :complete="step > 2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Concluído"
        subtitle="Upload finalizado!"
        :value="3"
        :complete="step === 3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
  <v-card v-if="step === 3" class="mt-4 pa-3" elevation="2" max-width="500">
    <v-row no-gutters align="center">
      <v-col cols="2">
        <v-icon color="primary" class="w-100 h-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-terminal-icon lucide-file-terminal"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 16 2-2-2-2"/><path d="M12 18h4"/></svg></v-icon>
      </v-col>
      <v-col cols="8">
        <div class="text-subtitle-1 font-weight-medium">{{ fileList[0]?.name }}</div>
        <div class="text-caption text-grey">
          {{ (fileList[0]?.size / 1024 / 1024).toFixed(2) }} MB
        </div>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-btn 
          icon 
          color="success" 
          :href="`http://localhost:3000/download/${fileList[0]?.name}`" 
          target="_blank"
        >
          <v-icon><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-down-icon lucide-monitor-down"><path d="M12 13V7"/><path d="m15 10-3 3-3-3"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

</template>

<script setup>
import { ref } from 'vue'
import MediaIcon from './icons/MediaIcon.vue'
import GenericFileIcon from './icons/GenericFileIcon.vue'

const fileList = ref([])
const progress = ref(0)
const uploading = ref(false)

const step = ref(0) // <- Mude o valor inicial para 0
const merging = ref(false)

async function uploadFile() {
  step.value = 1
  merging.value = false

  if (!fileList.value.length) return
  const file = fileList.value[0]
  uploading.value = true
  progress.value = 0

  const chunkSize = 1024 * 1024
  let offset = 0
  let chunkIndex = 0
  const totalChunks = Math.ceil(file.size / chunkSize)

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize)
    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('index', chunkIndex)
    formData.append('filename', file.name)

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })

    offset += chunkSize
    chunkIndex++
    progress.value = Math.floor((chunkIndex / totalChunks) * 100)
  }

  progress.value = 100
  merging.value = true
  step.value = 2

  await mergeFile(file.name, totalChunks);

  merging.value = false
  step.value = 3
  
  // A linha abaixo pode ser mantida ou removida.
  // Se mantida, o stepper some após a conclusão. Se removida, ele permanece no passo 3.
  // uploading.value = false 
}

async function mergeFile(filename, totalChunks) {
  await fetch('http://localhost:3000/merge', {
    method: 'POST',
    body: JSON.stringify({ filename, totalChunks }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('Arquivo mesclado com sucesso!')
  console.log(`Arquivo ${filename} enviado em ${totalChunks} partes.`)
}
</script>