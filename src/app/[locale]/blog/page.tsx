import { useFetchPage } from "@/app/api/useFetchPage";
import { Blog } from "@/components/pages/blocks/Blog/Blog";
import { IBlog } from "@/data.d";
import { LangType } from "@/i18n";
import React from "react";

export interface BlogPageProps {
  title: string;
  metaDesc: string;
  blog: IBlog;
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const blogQuery = `*[_type == 'blogPage' && lang == '${locale}'][0]{
    ...,
    blog ->{
      articles[]->{
        path,
        title,
        desc,
        date,
        customImage
      }
    }
}`;
  const blogPageData: BlogPageProps = await useFetchPage(blogQuery, "blogPage");
  return (
    blogPageData.title && (
      <>
        {/* FIX <SEO
          title={props.title}
          description={props.metaDesc}
          imgUrl="https://i.imgur.com/u9EH6vH.png"
          url="https://www.setoxarts.com/en/blog"
        /> */}
        <Blog {...blogPageData.blog} />
      </>
    )
  );
}
