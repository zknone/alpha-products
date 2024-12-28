import { Artwork } from "../type/type";

type ArtworkFormState = Omit<Artwork, "id" | "imageId">;
type FormErrors = Partial<Record<keyof ArtworkFormState, string>>;

export const validateForm = (formState: ArtworkFormState): FormErrors => {
  const errors: FormErrors = {};

  if (!formState.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!formState.artistDisplay.trim()) {
    errors.artistDisplay = "Artist Display is required.";
  }

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (formState.dateDisplay && !dateRegex.test(formState.dateDisplay)) {
    errors.dateDisplay = "Date must be in the format dd.mm.yyyy.";
  }

  return errors;
};
