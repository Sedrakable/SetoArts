import React, { use, useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import cn from "classnames";
import FlexDiv from "../../FlexDiv";
import { InputWrapper, InputWrapperProps } from "../InputWrapper/InputWrapper";
import { BaseInputProps } from "../Input/Input";
import { Paragraph } from "../../Paragraph/Paragraph";
import { outfit } from "../../Heading";
import ReactSlider, { ReactSliderProps } from "react-slider";

interface SliderProps
  extends InputWrapperProps,
    Omit<BaseInputProps, "value" | "onChange"> {
  min: number;
  max: number;
  step?: number;
  unit?: string;
  values: number | number[]; // Supports both single and range
  onChange: (value: number | [number, number]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  onChange,
  values,
  min,
  max,
  step = 1,
  unit = "",
  required = false,
  isInvalid = false,
}) => {
  const customLabel = `${label}`;
  const isRange = Array.isArray(values) && values.length > 1;

  return (
    <InputWrapper label={customLabel} required={required} isInvalid={isInvalid}>
      <FlexDiv
        width100
        gapArray={[3, 3, 3, 4]}
        className={styles.sliderWrapper}
        padding={{ top: [2, 2, 2, 3], bottom: [5, 5, 5, 6] }}
      >
        {/* Minimum value marker */}
        <Paragraph
          level="small"
          color={isInvalid ? "error" : "black"} // Gray color for min/max
          className={styles.marker}
          weight={600}
        >
          {isRange ? values[0] : values} {unit}
        </Paragraph>

        {/* Slider Input */}
        <div className={styles.sliderContainer}>
          <ReactSlider
            className={styles.slider}
            thumbClassName={styles.thumb}
            trackClassName={isRange ? styles.rangeTrack : styles.track}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            minDistance={step} // Ensures thumbs don’t overlap
            withTracks
            pearling
            value={values}
          />
        </div>

        {/* Max Value Marker */}
        <Paragraph
          level="small"
          color={isInvalid ? "error" : "black"}
          className={styles.marker}
          weight={600}
        >
          {isRange ? values[1] : max} {unit}
        </Paragraph>
      </FlexDiv>
    </InputWrapper>
  );
};
