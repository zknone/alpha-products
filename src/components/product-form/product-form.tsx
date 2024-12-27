import React, { useState } from "react";
import { Artwork } from "../../type/type";
import { getImage } from "../../utils/common";
import styles from "./product-form.module.css";

const DEFAULT_IMG_ID = "baba4a4e-ca86-7e95-915d-25c352fc3571";

const ArtworkForm = ({ onSubmit }: { onSubmit: (data: Artwork) => void }) => {
  const [formState, setFormState] = useState<Omit<Artwork, "id" | "imageId">>({
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
  });

  const generateRandomId = () => Math.floor(Math.random() * 100_000);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArtwork = {
      ...formState,
      id: generateRandomId(),
      imageId: DEFAULT_IMG_ID,
    };
    onSubmit(newArtwork);
    setFormState({
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
    });
  };

  return (
    <form className={styles.products_menu_container} onSubmit={handleSubmit}>
      <img
        className={styles.products_form_image}
        width={400}
        src={getImage(DEFAULT_IMG_ID, 800)}
        alt="Artwork Preview"
      />
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
      </label>
      <label className={styles.products_form_label}>
        <span>Date Display:</span>
        <input
          className={styles.products_form_input}
          type="text"
          name="dateDisplay"
          value={formState.dateDisplay}
          onChange={handleChange}
        />
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
      <button type="submit" className={styles.products_form_button}>
        Add artwork
      </button>
    </form>
  );
};

export default ArtworkForm;
