import { useFetchPage } from "@/app/api/useFetchPage";
import { setMetadata } from "@/components/SEO";
import { Blog } from "@/components/pages/blocks/Blog/Blog";
import { IBlog, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import React from "react";

export interface BlogPageProps {
  meta: ISeo;
  blog: IBlog;
}

const getBlogPageData = async (locale: LangType) => {
  const type = "blogPage";
  const blogQuery = `*[_type == '${type}' && lang == '${locale}'][0]{
    meta,
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const blogPageData: BlogPageProps = await useFetchPage(blogQuery, type);
  return blogPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const blogPageData: BlogPageProps = await getBlogPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = blogPageData.meta;
  const path = LocalPaths.BLOG;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const blogPageData: BlogPageProps = await getBlogPageData(locale);
  return blogPageData && <Blog {...blogPageData.blog} />;
}
