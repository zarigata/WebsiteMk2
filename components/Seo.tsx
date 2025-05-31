import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import siteConfig from '@/config/site';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    site_name?: string;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
  noindex?: boolean;
  nofollow?: boolean;
  children?: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = siteConfig.description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
  noindex = false,
  nofollow = false,
  children,
}) => {
  const router = useRouter();
  const defaultTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const defaultDescription = description || siteConfig.description;
  const url = canonical || `${siteConfig.url}${router.asPath || ''}`;
  const defaultOpenGraph = {
    ...siteConfig.openGraph,
    ...openGraph,
    url,
    title: openGraph?.title || defaultTitle,
    description: openGraph?.description || defaultDescription,
  };
  const defaultTwitter = {
    ...siteConfig.twitter,
    ...twitter,
  };

  return (
    <>
      <DefaultSeo
        title={defaultTitle}
        description={defaultDescription}
        canonical={url}
        openGraph={defaultOpenGraph}
        twitter={defaultTwitter}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
          {
            name: 'theme-color',
            content: siteConfig.themeColor,
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
          ...additionalMetaTags,
        ]}
        noindex={noindex}
        nofollow={nofollow}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {children}
      </Head>
    </>
  );
};

export default Seo;
