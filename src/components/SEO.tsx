import React, { FC } from "react";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
}

//FIX SEO
export const SEO: FC<SEOProps> = ({ title, description, url, imgUrl }) => {
  return (
    <>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content="Seto X Arts" />
      <meta name="twitter:card" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      {/* End Twitter tags */}
    </>
  );
};
