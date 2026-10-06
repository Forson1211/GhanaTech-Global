<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-brand-dark mb-1.5">
      {{ label }}
      <span v-if="required" class="text-brand-bright">*</span>
    </label>

    <div
      :class="[
        'relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center',
        isDragging ? 'border-brand-primary bg-brand-soft/40' : 'border-brand-border bg-brand-lightest/40 hover:bg-brand-soft/20 hover:border-brand-primary/50',
        error ? 'border-brand-primary' : ''
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        class="hidden"
        @change="handleFileChange"
      />

      <!-- Selected File View -->
      <div v-if="selectedFile" class="flex items-center space-x-3 w-full max-w-sm bg-white p-3 rounded-xl border border-brand-border shadow-violet-sm">
        <div class="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center text-brand-primary flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="flex-1 text-left min-w-0">
          <p class="text-xs font-semibold text-brand-dark truncate">{{ selectedFile.name }}</p>
          <p class="text-[11px] text-brand-muted">{{ formatFileSize(selectedFile.size) }}</p>
        </div>
        <button
          type="button"
          class="text-brand-muted hover:text-brand-dark p-1 transition-colors"
          @click.stop="removeFile"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Upload Placeholder -->
      <div v-else class="flex flex-col items-center">
        <div class="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-primary mb-3 shadow-violet-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-brand-dark">
          Click to upload <span class="text-xs font-normal text-brand-muted">or drag & drop</span>
        </p>
        <p class="text-xs text-brand-muted mt-1">{{ helpText || 'PDF, DOC, DOCX up to 10MB' }}</p>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-xs text-brand-dark font-medium">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  label?: string;
  required?: boolean;
  accept?: string;
  helpText?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept: '.pdf,.doc,.docx',
  required: false,
});

const emit = defineEmits<{
  (e: 'fileSelected', file: File | null): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const selectedFile = ref<File | null>(null);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    setFile(target.files[0]);
  }
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
    setFile(e.dataTransfer.files[0]);
  }
};

const setFile = (file: File) => {
  selectedFile.value = file;
  emit('fileSelected', file);
};

const removeFile = () => {
  selectedFile.value = null;
  if (fileInputRef.value) fileInputRef.value.value = '';
  emit('fileSelected', null);
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};
</script>
