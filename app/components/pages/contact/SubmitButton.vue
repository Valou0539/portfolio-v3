<template>
  <CommonButton
    :class="[
      {
        '!bg-green-700 dark:!bg-green-500': recentlySentStatus === 'success',
        '!bg-red-700 dark:!bg-red-500': recentlySentStatus === 'error',
      },
      'mt-6 overflow-hidden transition-colors duration-300 sm:col-span-2 md:mt-8',
    ]"
    type="submit"
    :disabled="isLoading"
  >
    <component
      :is="statusIcon"
      :class="[
        {
          'animate-spin': isLoading,
        },
        isLoading || recentlySentStatus ? 'size-4.5 md:size-5' : 'size-0',
        'transition-all duration-300',
      ]"
    />
    {{ $t(buttonLabel) }}
    <PaperAirplaneIcon
      :class="[
        {
          'translate-x-72 sm:translate-x-96': isLoading || recentlySentStatus,
        },
        'size-4.5 transition-transform duration-300 md:size-5',
      ]"
    />
  </CommonButton>
</template>
<script lang="ts" setup>
import {
  ArrowPathIcon,
  CheckIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

interface Props {
  isLoading: boolean;
  recentlySentStatus?: "success" | "error";
}

const props = defineProps<Props>();

const buttonLabel = computed(() => {
  if (props.isLoading) {
    return "contact.form.button.loading";
  }
  if (props.recentlySentStatus === "success") {
    return "contact.form.button.success";
  }
  if (props.recentlySentStatus === "error") {
    return "contact.form.button.error";
  }
  return "contact.form.button.default";
});

const statusIcon = computed(() => {
  if (props.recentlySentStatus === "success") {
    return CheckIcon;
  }
  if (props.recentlySentStatus === "error") {
    return XMarkIcon;
  }
  return ArrowPathIcon;
});
</script>
