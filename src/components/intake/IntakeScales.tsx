import React from "react";
import cn from "classnames";
import styles from "./Intake.module.scss";
import { Paragraph } from "@/components/reuse/Text/Paragraph/Paragraph";
import { IntakeScalePair } from "@/lib/intake/questions";

const DOTS = [1, 2, 3, 4, 5];

interface IntakeScalesProps {
  questionId: string;
  pairs: readonly IntakeScalePair[];
  values: Record<number, number>;
  onChange: (pairIndex: number, value: number) => void;
  isInvalid?: boolean;
}

// One bipolar row per pair: a word on each side and five tappable dots between.
// Each dot is a real radio so a whole row is one radio group — keyboard and
// screen-reader friendly, restyled to dots.
export const IntakeScales: React.FC<IntakeScalesProps> = ({
  questionId,
  pairs,
  values,
  onChange,
  isInvalid = false,
}) => (
  <div className={styles.scales} role="group">
    {pairs.map((pair, pairIndex) => {
      const selected = values[pairIndex];
      const rowMissing = isInvalid && typeof selected !== "number";
      const groupName = `${questionId}-${pairIndex}`;

      return (
        <div
          key={pairIndex}
          className={cn(styles.scaleRow, {
            [styles.scaleRowInvalid]: rowMissing,
          })}
        >
          <Paragraph
            level="regular"
            color="black"
            weight={600}
            className={styles.scalePole}
          >
            {pair.left}
          </Paragraph>

          <div className={styles.scaleDots}>
            {DOTS.map((dot) => {
              const checked = selected === dot;
              return (
                <label key={dot} className={styles.scaleDotLabel}>
                  <input
                    type="radio"
                    className={styles.scaleRadio}
                    name={groupName}
                    checked={checked}
                    onChange={() => onChange(pairIndex, dot)}
                    aria-label={`${pair.left} to ${pair.right}: ${dot} of 5`}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(styles.scaleDot, {
                      [styles.scaleDotChecked]: checked,
                    })}
                  />
                </label>
              );
            })}
          </div>

          <Paragraph
            level="regular"
            color="black"
            weight={600}
            className={cn(styles.scalePole, styles.scalePoleRight)}
          >
            {pair.right}
          </Paragraph>
        </div>
      );
    })}
  </div>
);
