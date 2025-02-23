import { carouselQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { IWoodWork } from "@/data.d";

export const getCarouselData = async () => {
  const carouselQueryData = carouselQuery;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const carouselData: IWoodWork[] = await useFetchPage(carouselQueryData);

  return carouselData;
};

export const getCarouselImages = async () => {
  const data = await getCarouselData();

  // Flatten all customImages into a single array
  const allImages = data.flatMap((item) => item.customImages || []);

  return allImages;
};
