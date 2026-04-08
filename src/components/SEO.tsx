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
  image = "/android-chrome-512x512.png",
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
