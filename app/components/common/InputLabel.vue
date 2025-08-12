<template>
  <label>
    <span class="text-primary mb-1.5 block font-semibold md:mb-2 md:text-lg">{{
      label
    }}</span>
    <component
      :is="textArea ? 'textarea' : 'input'"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="[
        'text-secondary/75 outline-primary/50 w-full rounded-[22px] px-4 py-3 text-sm outline -outline-offset-1 md:rounded-[28px] md:px-6 md:py-4 md:text-base',
        inputClass,
      ]"
    />
    <p v-if="error" class="mt-1 text-xs text-red-500 md:text-base">
      {{ $t(error) }}
    </p>
  </label>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: string;
  label: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  textArea?: boolean;
  error?: string;
  inputClass?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  autocomplete: "",
  textArea: false,
  error: "",
  inputClass: "",
});

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
