import Head from "next/head";

interface MetaProps {
  title: string;
  content: string;
  url?: string;
  keywords?: string;
  image?: string;
}

export const Meta = ({ title, content, url, keywords, image }: MetaProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={content} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={content} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />

    <meta name="twitter:card" content={content} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={content} />
    <meta name="twitter:site" content={url} />
    <meta property="twitter:image" content={image} />

    <meta name="keywords" content={keywords} />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href={url} />
  </Head>
);
