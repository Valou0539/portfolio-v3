<template>
  <form
    @submit.prevent="submitForm"
    class="grid gap-3 sm:grid-cols-2 sm:gap-y-4 md:gap-x-12"
  >
    <CommonInputLabel
      :style="style(300)"
      v-model="form.firstname"
      :label="$t('contact.form.firstname.label')"
      type="text"
      :placeholder="$t('contact.form.firstname.placeholder')"
      autocomplete="given-name"
      :error="errors.firstname"
    />
    <CommonInputLabel
      :style="style(400)"
      v-model="form.lastname"
      :label="$t('contact.form.lastname.label')"
      type="text"
      :placeholder="$t('contact.form.lastname.placeholder')"
      autocomplete="family-name"
      :error="errors.lastname"
    />
    <CommonInputLabel
      :style="style(500)"
      v-model="form.email"
      :label="$t('contact.form.email.label')"
      type="text"
      :placeholder="$t('contact.form.email.placeholder')"
      autocomplete="email"
      class="sm:col-span-2"
      :error="errors.email"
    />
    <CommonInputLabel
      :style="style(600)"
      v-model="form.subject"
      :label="$t('contact.form.subject.label')"
      type="text"
      :placeholder="$t('contact.form.subject.placeholder')"
      class="sm:col-span-2"
      :error="errors.subject"
    />
    <CommonInputLabel
      :style="style(700)"
      v-model="form.message"
      :label="$t('contact.form.message.label')"
      type="text"
      :placeholder="$t('contact.form.message.placeholder')"
      text-area
      class="sm:col-span-2"
      inputClass="h-52 resize-none"
      :error="errors.message"
    />
    <PagesContactSubmitButton
      :style="style(800)"
      :isLoading="isLoading"
      :recentlySentStatus="recentlySentStatus"
    />
  </form>
</template>
<script lang="ts" setup>
const { form, errors, isLoading, recentlySentStatus, submitForm } =
  useContactForm();

const { style } = useAnimationOnLoad();
</script>
