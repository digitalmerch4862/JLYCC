import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Jesus Lord of the Youth Christian Church (JLYCC)", 
  description = "A community of believers dedicated to raising leaders and spreading the love of Christ. Join us at JLYCC for spiritual growth, fellowship, and service.",
  keywords = "JLYCC, Jesus Lord of the Youth, Christian Church, Mandaluyong, Church, Youth Ministry, Leadership, Faith, Community",
  image = "https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-1/453783636_924875829678893_8484670298322969456_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=X-St79JfrFYQ7kNvwG3fXIP&_nc_oc=Adrz6NiXqrPvkHuLXp8NUlTnnbnC5H8ztOKfrXS0A4CJ3hzl95fj4p0IrzcH9GTWb64&_nc_zt=24&_nc_ht=scontent.fmnl30-1.fna&_nc_gid=cTbEn_ZsfHdBUlzMKXZbJQ&_nc_ss=7a3a8&oh=00_AfwR_AMyMCMIEF801PMjcRSaiSImgFbORNBSFihJ4NGAlQ&oe=69D15C14",
  url = "https://jlycc.org"
}: SEOProps) {
  const siteTitle = title.includes("JLYCC") ? title : `${title} | JLYCC`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="JLYCC" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
