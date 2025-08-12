<template>
  <form
    @submit.prevent="submitForm"
    class="grid gap-3 sm:grid-cols-2 sm:gap-y-4 md:gap-x-12"
  >
    <CommonInputLabel
      v-model="form.firstname"
      :label="$t('contact.form.firstname.label')"
      type="text"
      :placeholder="$t('contact.form.firstname.placeholder')"
      autocomplete="given-name"
      :error="errors.firstname"
    />
    <CommonInputLabel
      v-model="form.lastname"
      :label="$t('contact.form.lastname.label')"
      type="text"
      :placeholder="$t('contact.form.lastname.placeholder')"
      autocomplete="family-name"
      :error="errors.lastname"
    />
    <CommonInputLabel
      v-model="form.email"
      :label="$t('contact.form.email.label')"
      type="text"
      :placeholder="$t('contact.form.email.placeholder')"
      autocomplete="email"
      class="sm:col-span-2"
      :error="errors.email"
    />
    <CommonInputLabel
      v-model="form.subject"
      :label="$t('contact.form.subject.label')"
      type="text"
      :placeholder="$t('contact.form.subject.placeholder')"
      class="sm:col-span-2"
      :error="errors.subject"
    />
    <CommonInputLabel
      v-model="form.message"
      :label="$t('contact.form.message.label')"
      type="text"
      :placeholder="$t('contact.form.message.placeholder')"
      text-area
      class="sm:col-span-2"
      inputClass="h-52 resize-none"
      :error="errors.message"
    />
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
  </form>
</template>
<script lang="ts" setup>
import {
  ArrowPathIcon,
  CheckIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const { form, errors, isLoading, recentlySentStatus, submitForm } =
  useContactForm();

const buttonLabel = computed(() => {
  if (isLoading.value) {
    return "contact.form.button.loading";
  }
  if (recentlySentStatus.value === "success") {
    return "contact.form.button.success";
  }
  if (recentlySentStatus.value === "error") {
    return "contact.form.button.error";
  }
  return "contact.form.button.default";
});

const statusIcon = computed(() => {
  if (recentlySentStatus.value === "success") {
    return CheckIcon;
  }
  if (recentlySentStatus.value === "error") {
    return XMarkIcon;
  }
  return ArrowPathIcon;
});
</script>
