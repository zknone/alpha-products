import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { Artwork, RawApiResponse, RawArtwork } from "../../type/type";

const Products = () => {
  const [photos, setPhotos] = useState<Artwork[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function adaptArtwork(rawData: RawArtwork): Artwork {
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchData<RawApiResponse>(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id,category_titles,classification_titles,thumbnail,description&limit=100"
        );

        const transformedData = data.data.map(adaptArtwork);
        setPhotos(transformedData);
      } catch (error) {
        setError(`Failed fetching products: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  console.log(photos);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ol>
        {/* {photos.map(
          (item) =>
            item.primaryImageSmall && (
              <li key={item?.objectID}>
                <img
                  width={300}
                  height={300}
                  src={item.primaryImageSmall}
                ></img>
                <span>{item?.artistDisplayName}</span>
                <span>{item?.objectName}</span>
                <span>{item?.objectDate}</span>
                <span>{item?.culture}</span>
              </li>
            )
        )} */}
      </ol>
    </>
  );
};

export default Products;
