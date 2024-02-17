import React from "react";
import { Hero } from "../../reuse/Hero";
import styles from "./ContactPage.module.scss";
import { Form } from "./Form";

const socials: string = require("../../../assets/photos/Steampunk/Thumbnail/Instagram.png");

const header = {
  title: "Contact Us",
  desc: "Here are all the ways you can find, follow or support us!",
};

const ContactPage = () => {
  return (
    <div>
      {/* <Hero
        title={header.title}
        description={header.desc}
        image={{ src: socials, alt: "socials" }}
      /> */}
      <div className={styles.content}>
        <Form withMessage />
      </div>
    </div>
  );
};

export default ContactPage;
