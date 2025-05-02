import { carouselQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { IWork } from "@/data.d";

export const getCarouselData = async () => {
  const carouselData: IWork[] = await fetchPage(carouselQuery);

  return carouselData;
};

export const getCarouselImages = async () => {
  const data: IWork[] = await getCarouselData();

  // Flatten all customImages into a single array
  const allImages = data.flatMap((item) => item.images || []);

  return allImages;
};
