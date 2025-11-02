import React from 'react'
import { Helmet } from 'react-helmet-async'

const pageInfo = {
    title: "Nami Software Solutions",
    description: "For website design and development services and phone applications operating on the Android and iOS operating systems, the company provides integrated web solutions to all institutions in the world and has a huge customer base in all countries of the world.",
    icon: "/src/assets/photo/global/Namiicon.svg",
    image: "/src/assets/photo/global/namilogo.svg",
    type: "Organization",
    url: "/",
    language: "en_US",
    keywords: "website design, development services, phone applications, Android, iOS, systems, integrated web solutions, Cloud services, Technical consulting, Design services, Digital marketing",
    LD_Json: { "foundingDate": "2017" }
}

function PageHead({ pageTitle, title = pageInfo.title, description = pageInfo.description, image = pageInfo.image, icon = pageInfo.icon, type = pageInfo.type, url = pageInfo.url, language = pageInfo.language, keywords = pageInfo.keywords, LD_Json = pageInfo.LD_Json }) {

    const LD_Json_Schema = {
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "url": url,
        "logo": image,
        "description": description,
        ...LD_Json,
        "contactPoint":
            [
                {
                    "@type": "ContactPoint",
                    "telephone": "+201099347981",
                    "email": "sales@nami-tec.com",
                    "contactType": "sales",
                    "areaServed": "Worldwide",
                    "availableLanguage": ["English", "Arabic"]
                },
                {
                    "@type": "ContactPoint",
                    "telephone": "+201040215480",
                    "email": "info@nami-tec.com",
                    "contactType": "customer support",
                    "areaServed": "Worldwide",
                    "availableLanguage": ["English", "Arabic"]
                },
                {
                    "@type": "ContactPoint",
                    "telephone": "+201040652696",
                    "email": "hr@nami-tec.com",
                    "contactType": "human resources",
                    "areaServed": "Worldwide",
                    "availableLanguage": ["English", "Arabic"]
                }
            ],
        "sameAs": [
            "https://www.linkedin.com/company/nami-tec",
            "https://twitter.com/nami_tech",
            "https://facebook.com/nami.tech",
            "https://www.instagram.com/nami_software/",
            "https://www.snapchat.com/@namifortech?share_id=NkdTI5a2Ro0&locale=ar-EG"
        ]
    }

    return (
        <Helmet>
            {/* <!-- meta --> */ }
            <meta charset="UTF-8" />
            <meta name="application-name" content={title} />
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta name="generator" content="React-dom" />
            <meta name="author" content={ title } />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://www.google.com https://www.gstatic.com;frame-src https://www.google.com;" />

            <meta property="og:title" content={ title } />
            <meta property="og:site_name" content={ title } />
            <meta property="og:description" content={ description } />
            <meta property="og:type" content={ type } />
            <meta property="og:image" content={ image } />
            <meta property="og:image:alt" content={ title } />
            <meta property="og:url" content={ url } />
            <meta property="og:locale" content={ language } />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@Nami_software" />
            <meta name="twitter:creator" content="@Nami_software" />
            <meta name="twitter:title" content={ title } />
            <meta name="twitter:description" content={ description } />
            <meta name="twitter:image" content={ image } />
            <meta name="twitter:image:alt" content={ title } />

            {/* <!-- link --> */ }
            <link rel="canonical" href={ url } />
            <link rel="author" href="/" />

            <link rel="alternate" href="https://localhost:5173/ar/" hreflang="ar" />
            <link rel="alternate" href="https://localhost:5173/en/" hreflang="en" />

            <link rel="icon" type="image/svg+xml" href={ icon } />

            <link rel="preload" href="/src/assets/font/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Bold.woff2" as="font" type="font/woff2" crossorigin />
            <link rel="preload" href="/src/assets/font/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Regular.woff2" as="font" type="font/woff2" crossorigin />

            {/* <!-- script --> */ }
            <script type="application/ld+json">
                { JSON.stringify(LD_Json_Schema) }
            </script>

            {/* <!-- title --> */ }
            { pageTitle && <title>{ pageTitle }</title> }

        </Helmet>
    )
}

export default PageHead