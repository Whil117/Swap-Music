import Head from 'next/head'
import { FC } from 'react'

export interface SeoProps {
  page?: string
  title?: string
  icon?: string
  image?: string
  description?: string
  website?: string
  sameAs?: string[]
  name?: string
  alternateName?: string
  keywords?: string[]
}

const AtomSeoLayout: FC<SeoProps> = ({
  children,
  title,
  icon,
  website,
  image,
  keywords,
  description,
  name,
  alternateName,
  sameAs,
}) => {
  return (
    <>
      <Head>
        <title>Swap - {title}</title>
        <link rel="icon" type="image/png" href={icon || `/favicon.png`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="canonical" content={website} />
        <meta
          name="keywords"
          content={keywords ? keywords.join(`, `) : `nextjs, typescript`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f80000" />
        <link rel="apple-touch-icon" href={image} />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <meta name="description" content={description} />
        <meta name="author" content="Stackly Code" />
        <meta name="copyright" content="Stackly Code" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={website} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:site" content="@StacklyCode" />
        <meta name="twitter:creator" content="@StacklyCode" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={website} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="manifest" href="manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': `https://schema.org`,
              '@type': `Organization`,
              name,
              alternateName,
              url: website || image,
              logo: `${website}`,
              contactPoint: {
                '@type': `ContactPoint`,
                telephone: ``,
                contactType: `customer service`,
                areaServed: [`AR`, `CO`, `MX`, `UY`, `SV`, `DO`],
                availableLanguage: [`en`, `es`],
              },
              sameAs,
            }),
          }}
        />
      </Head>
      {children}
    </>
  )
}

export default AtomSeoLayout
