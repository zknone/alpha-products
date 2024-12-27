export const getImage = (id: string) => {
  return `https://www.artic.edu/iiif/2/${id}/full/400,/0/default.jpg`;
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
