export type FetchedIdsType = {
  total: number;
  objectIDs: string[];
};

export type Product = {
  artistDisplay: string;
  categoryTitles: string[];
  classificationTitles: string[];
  dateDisplay: string;
  description: string;
  id: number;
  imageId: string;
  mainReferenceNumber: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    altText: string;
  };
  title: string;
};

export type RawProduct = {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  main_reference_number: string;
  date_display: string;
  artist_display: string;
  description: string;
  category_titles: string[];
  classification_titles: string[];
  image_id: string;
};

export type RawConfig = {
  iiif_url: string;
  website_url: string;
};

export type RawInfo = {
  license_text: string;
  license_links: string[];
  version: string;
};

export type RawPagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url?: string;
};

export type RawApiResponse = {
  config: RawConfig;
  info: RawInfo;
  pagination: RawPagination;
  data: RawProduct[];
};

export type ProductsState = {
  artworks: Product[];
  isLoading: boolean;
  error: string | null;
  favoriteArtworks: number[];
  filter: FilterCategory;
};

export type FilterCategory = "All" | "Favorites";
