import React from "react";

import { IBlog } from "../../data";
import { Blog } from "./blocks/Blog/Blog";
import { SEO } from "../SEO";

export interface BlogPageProps {
  title: string;
  metaDesc: string;
  blog: IBlog;
}

export const BlogPage: React.FC<BlogPageProps> = (props) => {
  return (
    props.title && (
      <>
        <SEO
          title={props.title}
          description={props.metaDesc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/blog"
        />
        <Blog {...props.blog} />
      </>
    )
  );
};
