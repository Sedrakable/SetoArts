"use client";
import React from "react";
import styles from "./Services.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Text/Heading/Heading";
import { Block } from "../../containers/Block";
import {
  IService,
  IServices,
  LocalPaths,
  LocalTargets,
} from "../../../../data.d";
import { Button } from "../../../reuse/Button/Button";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import { Tag } from "@/components/reuse/Tag/Tag";
import { AnimatedWrapper } from "../../containers/AnimatedWrapper/AnimatedWrapper";

const Service: React.FC<IService> = ({
  title,
  svgName,
  featureBlock,
  path,
}) => {
  const SvgComponent = useSvgComponent(svgName || "Bulb");
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const numberOfTags = 5;

  return (
    <FlexDiv
      flex={{ direction: "column", x: "center", y: "flex-start" }}
      width100
      className={cn(styles.container)}
      gapArray={[3]}
    >
      <div className={styles.assetWrapper}>
        {SvgComponent && <SvgComponent />}
      </div>
      <Heading
        font="Cursive"
        level="3"
        as="h2"
        color="black"
        weight={900}
        textAlign="center"
        className={styles.title}
      >
        {title}
      </Heading>

      <FlexDiv
        gapArray={[5]}
        width100
        flex={{ direction: "column", x: "flex-start" }}
        className={styles.content}
      >
        {featureBlock && (
          <FlexDiv
            className={styles.tags}
            gapArray={[3]}
            flex={{ x: "center", y: "flex-start" }}
            wrap
          >
            {featureBlock.features &&
              featureBlock.features
                .slice(0, numberOfTags)
                ?.map((feature, key) => {
                  return <Tag key={key}>{feature.title}</Tag>;
                })}
            {featureBlock?.featureStrings &&
              featureBlock.featureStrings
                .slice(0, numberOfTags)
                ?.map((text, key) => {
                  return <Tag key={key}>{text}</Tag>;
                })}
          </FlexDiv>
        )}
        <FlexDiv
          gapArray={[3]}
          width100
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.bottom}
          padding={{ horizontal: [4] }}
          // wrap
        >
          {/* TODO SET THE RIGHT PATHS */}
          <Button
            variant="black"
            fit="grow"
            path={
              path
                ? `/${locale}${LocalPaths.DIGITAL}${path}`
                : `/${locale}${LocalPaths.ABOUT}`
            }
          >
            {path ? translations.buttons.view : translations.buttons.viewMyWork}
          </Button>
          {!path && (
            <Button
              variant="primary"
              fit="grow"
              path={`/${locale}${LocalPaths.CONTACT}`}
            >
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
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <Block
      title={{
        children: translations.titles.services,
        font: "Outfit",
        color: "black",
        weight: 900,
      }}
      theme="light"
      id={LocalTargets.SERVICESBLOCK}
    >
      <FlexDiv
        gapArray={[5, 6, 6, 7]}
        flex={{ y: "flex-start" }}
        width100
        className={styles.services}
        as="ul"
      >
        {services?.map((service: IService, key) => {
          serviceGridServices.push(service);
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Service {...service} />
            </AnimatedWrapper>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
