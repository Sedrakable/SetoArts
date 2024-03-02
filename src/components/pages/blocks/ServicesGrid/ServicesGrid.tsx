import React from "react";
import styles from "./ServicesGrid.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { IService } from "../../../../data";
import { Paragraph } from "../../../reuse/Paragraph";
import { Heading } from "../../../reuse/Heading";

export const ServicesGrid: React.FC<{ services: IService[] }> = ({
  services,
}) => {
  const renderCheckmark = (service: any, feature: string) => {
    return service.features.features.some((f: any) => f.title === feature) ? (
      <Heading as="h5" level="5" font="Cursive" color="yellow">
        &#10003;
      </Heading>
    ) : (
      <Heading as="h5" level="5" font="Cursive" color="grey">
        &#10007;
      </Heading>
    );
  };

  const allFeatures: string[] = Array.from(
    new Set(
      services
        ?.map((service: any) =>
          service.features.features?.map((feature: any) => feature.title)
        )
        .flat()
    )
  );

  return (
    <FlexDiv width100 className={styles.container}>
      <div className={styles.scrollWrapper}>
        <table>
          <thead>
            <tr>
              <th className={styles.mainColumn}></th>
              {services?.map((service) => {
                return (
                  <th key={service.title}>
                    <Paragraph level="big" color="white" weight="regular">
                      {service.title}
                    </Paragraph>
                    {service?.price && (
                      <FlexDiv
                        className={styles.priceWrapper}
                        padding={{ top: [1, 1, 1, 2], horizontal: [3] }}
                      >
                        <Paragraph
                          level="regular"
                          color="yellow"
                          weight="regular"
                        >
                          {service?.price.toString() + "CAD"}
                        </Paragraph>
                      </FlexDiv>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allFeatures?.map((feature: string) => {
              return (
                <tr key={feature}>
                  <td className={styles.mainColumn}>
                    <Paragraph level="small" color="black" weight="regular">
                      {feature}
                    </Paragraph>
                  </td>
                  {services?.map((service) => (
                    <td key={service.title}>
                      {renderCheckmark(service, feature)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </FlexDiv>
  );
};
