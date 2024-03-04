import React from "react";
import styles from "./Services.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { Block } from "../../containers/Block";
import { IService, IServices } from "../../../../data.d";
import { Icon, IconType } from "../../../reuse/Icon";
import { Tag } from "../../../reuse/Tag";
import { Button } from "../../../reuse/Button";
import { Splider, SpliderProps } from "../../containers/Splider";
import { useAtom } from "jotai";
import { langData } from "../../../navbar/LangSwitcher/LangSwitcher";
import { ServicesGrid } from "../../blocks/ServicesGrid/ServicesGrid";
import { getTranslations } from "../../../../helpers/langUtils";

const icons: IconType[] = ["bulb", "layout", "package", "palette"];

export interface ServiceProps extends IService {
  cta2?: boolean;
  number: number;
}
const Service: React.FC<ServiceProps> = ({
  number,
  title,
  features,
  path,
  cta2,
}) => {
  const [lang] = useAtom(langData);
  const [tagIndex, setTagIndex] = React.useState(0);
  const translations = getTranslations(lang);

  const updateChildState = (newState: number) => {
    setTagIndex(newState);
  };

  const splides: SpliderProps[] = features?.features?.map((feature) => {
    return {
      customImage: {
        image: feature.customImage.image,
        alt: feature.customImage.alt,
      },
    };
  });

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={styles.container}
    >
      <FlexDiv
        gapArray={[4]}
        width100
        flex={{ x: "flex-start" }}
        className={styles.top}
        padding={{ horizontal: [4], vertical: [2] }}
      >
        <Icon icon={icons[number]} size="regular" />
        <Heading font="Seto" level="5" as="h5">
          {title}
        </Heading>
      </FlexDiv>
      <FlexDiv width100 className={styles.middle}>
        <Splider
          slides={splides}
          splideProgress={tagIndex}
          setSplideProgress={updateChildState}
        />
      </FlexDiv>

      <FlexDiv
        gapArray={[5]}
        width100
        flex={{ direction: "column", x: "flex-start", y: "space-between" }}
        padding={{ horizontal: [4], vertical: [3] }}
        className={styles.content}
      >
        <FlexDiv
          className={styles.tags}
          gapArray={[1]}
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        >
          {features.features.slice(0, 5)?.map((feature, key) => {
            // Limit to first 5 tags
            return (
              <Tag
                chosen={tagIndex === key}
                key={key}
                onClick={() => setTagIndex(key)}
              >
                {feature.title}
              </Tag>
            );
          })}
          {
            features.features.length > 5 && <Tag>...</Tag> // Check if there are more than 5 tags
          }
        </FlexDiv>
        <FlexDiv
          gapArray={[2]}
          width100
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.bottom}
        >
          <Button variant="primary" fit="grow" path={`/${lang}${path}`}>
            {translations.buttons.view}
          </Button>
          {cta2 && (
            <Button variant="secondary" fit="grow" path={`/${lang}${path}`}>
              {translations.buttons.contact}
            </Button>
          )}
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export const Services: React.FC<IServices> = ({ services }) => {
  const serviceGridServices: IService[] = [];
  const [lang] = useAtom(langData);
  const translations = getTranslations(lang);

  return (
    <Block title={translations.blockTitles.services} variant="grid">
      <FlexDiv flex={{ direction: "column" }} gapArray={[6, 7, 7, 8]} width100>
        <FlexDiv
          gapArray={[4]}
          flex={{ y: "flex-start" }}
          width100
          className={styles.services}
        >
          {services?.map((service: IService, key) => {
            service.processes && serviceGridServices.push(service);
            return (
              <Service
                {...service}
                cta2={!service.processes}
                key={key}
                number={key}
              />
            );
          })}
        </FlexDiv>
        <ServicesGrid services={serviceGridServices} />
      </FlexDiv>
    </Block>
  );
};
