import React, { useState } from "react";
import { Artwork } from "../../type/type";
import { generateRandomId, getImage } from "../../utils/common";
import styles from "./product-form.module.css";
import { validateForm } from "../../utils/validate";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMG_ID = "baba4a4e-ca86-7e95-915d-25c352fc3571";

const INITIAL_FORM_STATE: Omit<Artwork, "id" | "imageId"> = {
  artistDisplay: "",
  categoryTitles: [],
  classificationTitles: [],
  dateDisplay: "",
  description: "",
  mainReferenceNumber: "",
  thumbnail: {
    lqip: "",
    width: 0,
    height: 0,
    altText: "",
  },
  title: "",
};

const ArtworkForm = ({ onSubmit }: { onSubmit: (data: Artwork) => void }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Omit<Artwork, "id" | "imageId">>({
    ...INITIAL_FORM_STATE,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof INITIAL_FORM_STATE, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formState);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newArtwork: Artwork = {
      ...formState,
      id: generateRandomId(),
      imageId: DEFAULT_IMG_ID,
    };
    onSubmit(newArtwork);
    setFormState({ ...INITIAL_FORM_STATE });
    setErrors({});
    navigate("/products");
  };

  return (
    <form className={styles.products_form_container} onSubmit={handleSubmit}>
      <img
        className={styles.products_form_image}
        width={400}
        src={getImage(DEFAULT_IMG_ID, 800)}
        alt="Artwork Preview"
      />
      <div className={styles.products_form_wrapper}>
        <label className={styles.products_form_label}>
          <span>Title:</span>
          <input
            className={styles.products_form_input}
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
          />
          {errors.title && (
            <span className={styles.error_text}>{errors.title}</span>
          )}
        </label>
        <label className={styles.products_form_label}>
          <span>Artist Display:</span>
          <input
            className={styles.products_form_input}
            type="text"
            name="artistDisplay"
            value={formState.artistDisplay}
            onChange={handleChange}
            required
          />
          {errors.artistDisplay && (
            <span className={styles.error_text}>{errors.artistDisplay}</span>
          )}
        </label>
      </div>

      <label className={styles.products_form_label}>
        <span>Date Display:</span>
        <input
          className={styles.products_form_input}
          type="text"
          name="dateDisplay"
          value={formState.dateDisplay}
          onChange={handleChange}
        />
        {errors.dateDisplay && (
          <span className={styles.error_text}>{errors.dateDisplay}</span>
        )}
      </label>
      <label className={styles.products_form_label}>
        <span>Description:</span>
        <textarea
          className={styles.products_form_textarea}
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </label>
      <div className={styles.products_form_wrapper}>
        <button type="submit" className={styles.products_form_button}>
          Add artwork
        </button>
      </div>
    </form>
  );
};

export default ArtworkForm;
