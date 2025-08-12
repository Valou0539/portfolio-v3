import { reactive } from "vue";

export const useContactForm = () => {
  const isLoading = ref(false);
  const recentlySentStatus = ref<undefined | "success" | "error">(undefined);

  const form = reactive<ContactForm>({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const errors = reactive<Partial<Record<keyof ContactForm, string>>>({});

  const resetForm = () => {
    Object.keys(form).forEach((key) => {
      form[key as keyof ContactForm] = "";
    });
  };

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ContactForm] = "";
    });
  };

  const submitForm = async () => {
    resetErrors();

    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length === 0) {
      isLoading.value = true;
      try {
        await $fetch("/api/contact", {
          method: "POST",
          body: form,
        });
        recentlySentStatus.value = "success";
        resetForm();
      } catch (error) {
        recentlySentStatus.value = "error";
      } finally {
        isLoading.value = false;
      }
    } else {
      Object.assign(errors, validationErrors);
    }
  };

  watch(recentlySentStatus, (value) => {
    if (value) {
      setTimeout(() => {
        recentlySentStatus.value = undefined;
      }, 2000);
    }
  });

  return { form, errors, isLoading, recentlySentStatus, submitForm };
};
