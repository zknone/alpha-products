import React, { useState } from "react";
import { Artwork } from "../../type/type";
import { getImage } from "../../utils/common";
import styles from "./artwork-form.module.css";

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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      thumbnail: {
        ...prev.thumbnail,
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "categoryTitles" | "classificationTitles"
  ) => {
    const { value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [field]: value.split(","),
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
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Добавить Artwork</h2>
      <img src={getImage(DEFAULT_IMG_ID)} />
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Artist Display:
        <input
          type="text"
          name="artistDisplay"
          value={formState.artistDisplay}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date Display:
        <input
          type="text"
          name="dateDisplay"
          value={formState.dateDisplay}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Main Reference Number:
        <input
          type="text"
          name="mainReferenceNumber"
          value={formState.mainReferenceNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Category Titles (comma separated):
        <input
          type="text"
          value={formState.categoryTitles.join(",")}
          onChange={(e) => handleArrayChange(e, "categoryTitles")}
        />
      </label>
      <label>
        Classification Titles (comma separated):
        <input
          type="text"
          value={formState.classificationTitles.join(",")}
          onChange={(e) => handleArrayChange(e, "classificationTitles")}
        />
      </label>
      <h3>Thumbnail</h3>
      <label>
        LQIP:
        <input
          type="text"
          name="lqip"
          value={formState.thumbnail.lqip}
          onChange={handleThumbnailChange}
        />
      </label>
      <label>
        Width:
        <input
          type="number"
          name="width"
          value={formState.thumbnail.width}
          onChange={handleThumbnailChange}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          name="height"
          value={formState.thumbnail.height}
          onChange={handleThumbnailChange}
        />
      </label>
      <label>
        Alt Text:
        <input
          type="text"
          name="altText"
          value={formState.thumbnail.altText}
          onChange={handleThumbnailChange}
        />
      </label>
      <button type="submit">Добавить Artwork</button>
    </form>
  );
};

export default ArtworkForm;
