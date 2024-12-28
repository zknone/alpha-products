export const getImage = (id: string, width: number) => {
  return `https://www.artic.edu/iiif/2/${id}/full/${width},/0/default.jpg`;
};

export const isFavorite = (artworks: number[], id: number) => {
  return artworks.includes(id);
};

export const isFavoritesEmpty = (favorites: number[]) => {
  return favorites.length === 0;
};

export const stripHtml = (html: string): string => {
  const match = html.match(/<p>(.*?)<\/p>/i);
  return match ? match[1].replace(/<\/?[^>]+(>|$)/g, "") : "";
};

export const generateRandomId = () => Math.floor(Math.random() * 100_000);
