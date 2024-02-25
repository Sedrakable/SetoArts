import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Form.module.scss";
import cn from "classnames";
import { Button } from "../../reuse/Button";
import { FancyText } from "../../reuse/FancyText";
import FlexDiv from "../../reuse/FlexDiv";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { IForm } from "../../../data";

export const Form: React.FC<IForm> = ({ desc, cta, formFields }) => {
  const form = useRef<HTMLFormElement>(null);
  const { isMobileOrTablet, isLaptop } = useWindowResize();
  const [budget, setBudget] = useState<string>("");

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    console.log(numericValue);
    // Ensure that only numeric characters are entered
    setBudget(`CAD ${numericValue}`);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .sendForm("gmail", "contact-seto", form.current!, "bVxK7PZwLIutCAifw")
      .then(
        (result) => {
          console.log("sent");
        },
        (error) => {
          console.log("didint work", error);
        }
      );
  };
  const handleKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const contact = (
    <FlexDiv
      width100
      flex={{
        direction: isMobileOrTablet || isLaptop ? "column" : "row",
        y: "flex-start",
      }}
      gapArray={[4]}
    >
      <FancyText {...desc} paragraph textAlign="center" />
      <form
        ref={form}
        className={cn(styles.form, styles.contactForm)}
        onSubmit={sendEmail}
      >
        <div className={styles.info}>
          <input type="text" name="user_name" placeholder={formFields.name} />
          <input
            type="email"
            name="user_email"
            placeholder={formFields.email}
          />
        </div>
        <div className={styles.info}>
          <input
            type="text"
            name="company_name"
            placeholder={formFields.companyName}
          />
          <input
            type="text"
            name="budget"
            placeholder={formFields.budget}
            onChange={handleBudgetChange}
            value={budget}
          />
        </div>

        <textarea
          onKeyDown={handleKeyDown}
          name="message"
          placeholder={formFields.message}
        />

        <Button variant="fancy">{cta.text}</Button>
      </form>
    </FlexDiv>
  );
  return contact;
};
