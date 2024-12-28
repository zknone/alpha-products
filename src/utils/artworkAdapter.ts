import { Artwork, RawArtwork } from "../type/type";

export function adaptArtwork(rawData: RawArtwork): Artwork {
  return {
    artistDisplay: rawData.artist_display,
    categoryTitles: rawData.category_titles || [],
    classificationTitles: rawData.classification_titles || [],
    dateDisplay: rawData.date_display,
    description: rawData.description,
    id: rawData.id,
    imageId: rawData.image_id,
    mainReferenceNumber: rawData.main_reference_number,
    thumbnail: {
      lqip: rawData.thumbnail.lqip,
      width: rawData.thumbnail.width,
      height: rawData.thumbnail.height,
      altText: rawData.thumbnail.alt_text,
    },
    title: rawData.title,
  };
}
