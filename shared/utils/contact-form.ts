import type { ContactForm } from "../types/contact-form";
import { z } from "zod";

const contactSchema = z.object({
  firstname: z.string().min(2, "contact.form.firstname.error"),
  lastname: z.string().min(2, "contact.form.lastname.error"),
  email: z.string().email("contact.form.email.error"),
  subject: z.string().min(3, "contact.form.subject.error"),
  message: z.string().min(10, "contact.form.message.error"),
});

export const validateContactForm = (form: ContactForm) => {
  const result = contactSchema.safeParse(form);
  const errors: Partial<Record<keyof ContactForm, string>> = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof ContactForm;
      errors[field] = err.message;
    });
    return errors;
  }
  return {};
};
