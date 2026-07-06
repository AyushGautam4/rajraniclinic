import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { diagnosticsInfo, faqList, hospitalInfo } from '../mockData';

const ROUTE_META = {
  '/': {
    title: {
      en: 'Rajrani Hospital | Multi-Specialty Hospital in Old Kondli, New Delhi',
      hi: 'राजरानी हॉस्पिटल | ओल्ड कोंडली, नई दिल्ली'
    },
    description: {
      en: 'Rajrani Hospital offers OPD, emergency care, X-Ray, ultrasound, surgery, diagnostics, and experienced doctors in Old Kondli, New Delhi.',
      hi: 'राजरानी हॉस्पिटल में ओपीडी, इमरजेंसी, एक्स-रे, अल्ट्रासाउंड, सर्जरी और डायग्नोस्टिक सुविधाएं उपलब्ध हैं।'
    },
    keywords: 'Rajrani Hospital, hospital in Old Kondli, hospital in New Delhi, OPD services, emergency care, ultrasound, X-Ray, diagnostics'
  },
  '/services': {
    title: {
      en: 'Our Medical Services | Rajrani Hospital',
      hi: 'हमारी सेवाएं | राजरानी हॉस्पिटल'
    },
    description: {
      en: 'Explore Rajrani Hospital services including OPD, emergency care, physiotherapy, surgery, orthopedics, gynecology, pediatrics, X-Ray, ultrasound, and lab tests.',
      hi: 'राजरानी हॉस्पिटल की सेवाओं में ओपीडी, इमरजेंसी, फिजियोथेरेपी, सर्जरी, ऑर्थोपेडिक्स, स्त्री रोग, बाल रोग और डायग्नोस्टिक्स शामिल हैं।'
    },
    keywords: 'medical services, OPD, emergency care, physiotherapy, surgery, orthopedics, gynecology, pediatrics, Rajrani Hospital services'
  },
  '/doctors': {
    title: {
      en: 'Experienced Doctors | Rajrani Hospital',
      hi: 'अनुभवी डॉक्टर | राजरानी हॉस्पिटल'
    },
    description: {
      en: 'Meet experienced doctors at Rajrani Hospital for general medicine, surgery, orthopedics, gynecology, and pediatrics in Old Kondli, New Delhi.',
      hi: 'राजरानी हॉस्पिटल के अनुभवी डॉक्टर जनरल मेडिसिन, सर्जरी, ऑर्थोपेडिक्स, स्त्री रोग और बाल रोग में सेवाएं देते हैं।'
    },
    keywords: 'hospital doctors, general physician, surgeon, orthopedic doctor, gynecologist, pediatrician, Rajrani Hospital doctors'
  },
  '/about': {
    title: {
      en: 'About Rajrani Hospital | Mission, Facilities, and Care',
      hi: 'राजरानी हॉस्पिटल के बारे में | मिशन और सुविधाएं'
    },
    description: {
      en: 'Learn about Rajrani Hospital, our mission, healthcare values, facilities, and patient-first approach in Old Kondli, New Delhi.',
      hi: 'राजरानी हॉस्पिटल के मिशन, मूल्यों, सुविधाओं और मरीज-प्रथम दृष्टिकोण के बारे में जानें।'
    },
    keywords: 'about Rajrani Hospital, hospital mission, hospital facilities, patient care, Old Kondli hospital'
  },
  '/contact': {
    title: {
      en: 'Contact Rajrani Hospital | Call, WhatsApp, and Location',
      hi: 'संपर्क करें | राजरानी हॉस्पिटल'
    },
    description: {
      en: 'Contact Rajrani Hospital by phone or WhatsApp, get directions, and find our location in Old Kondli, New Delhi.',
      hi: 'राजरानी हॉस्पिटल से कॉल, व्हाट्सऐप या लोकेशन के जरिए संपर्क करें।'
    },
    keywords: 'contact Rajrani Hospital, hospital phone number, hospital address, Old Kondli hospital contact'
  },
  '/diagnostics': {
    title: {
      en: 'Relax Diagnostics | Blood Tests, X-Ray, Ultrasound in Kondli',
      hi: 'रिलैक्स डायग्नोस्टिक्स | ब्लड टेस्ट, एक्स-रे, अल्ट्रासाउंड'
    },
    description: {
      en: 'Relax Diagnostics provides blood tests, X-Ray, ultrasound, ECG, and preventive health packages near Kondli, New Delhi.',
      hi: 'रिलैक्स डायग्नोस्टिक्स में ब्लड टेस्ट, एक्स-रे, अल्ट्रासाउंड, ईसीजी और हेल्थ पैकेज उपलब्ध हैं।'
    },
    keywords: 'Relax Diagnostics, blood test in Kondli, X-Ray, ultrasound, ECG, diagnostic center New Delhi'
  },
  '*': {
    title: {
      en: 'Rajrani Hospital',
      hi: 'राजरानी हॉस्पिटल'
    },
    description: {
      en: 'Rajrani Hospital provides reliable healthcare services in Old Kondli, New Delhi.',
      hi: 'राजरानी हॉस्पिटल ओल्ड कोंडली, नई दिल्ली में विश्वसनीय स्वास्थ्य सेवाएं प्रदान करता है।'
    },
    keywords: 'Rajrani Hospital, healthcare, hospital in Old Kondli'
  }
};

const PAGE_LABELS = {
  '/': 'Home',
  '/services': 'Services',
  '/doctors': 'Doctors',
  '/about': 'About',
  '/contact': 'Contact',
  '/diagnostics': 'Diagnostics'
};

const ensureMetaTag = (selector, attr, value) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, selector.match(/"(.+?)"/)?.[1] || '');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
};

const ensureLinkTag = (rel, href) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const ensureHrefLang = (hrefLang, href) => {
  let tag = document.head.querySelector(`link[rel="alternate"][hreflang="${hrefLang}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'alternate');
    tag.setAttribute('hreflang', hrefLang);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const ensureStructuredData = (data) => {
  let tag = document.head.querySelector('#site-structured-data');
  if (!tag) {
    tag = document.createElement('script');
    tag.id = 'site-structured-data';
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
};

const AppEffects = ({ darkMode, language }) => {
  const location = useLocation();

  useEffect(() => {
    const pageMeta = ROUTE_META[location.pathname] || ROUTE_META['*'];
    const title = pageMeta.title[language] || pageMeta.title.en;
    const description = pageMeta.description[language] || pageMeta.description.en;
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    const previewTitle = title.replace(/\s+\|\s+Rajrani Hospital$/, '');
    const previewImage = `${window.location.origin}/images/hospital/hospital-main.jpg`;
    const breadcrumbName = PAGE_LABELS[location.pathname] || 'Page';
    const faqSchema = location.pathname === '/contact'
      ? {
          '@type': 'FAQPage',
          mainEntity: faqList.slice(0, 8).map((faq) => ({
            '@type': 'Question',
            name: language === 'hi' ? faq.qHindi : faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: language === 'hi' ? faq.aHindi : faq.a
            }
          }))
        }
      : null;

    document.title = title;
    document.documentElement.lang = language === 'hi' ? 'hi-IN' : 'en';

    ensureMetaTag('meta[name="description"]', 'name', description);
    ensureMetaTag('meta[name="keywords"]', 'name', pageMeta.keywords);
    ensureMetaTag('meta[name="robots"]', 'name', 'index, follow, max-image-preview:large');
    ensureMetaTag('meta[name="author"]', 'name', hospitalInfo.name);
    ensureMetaTag('meta[name="application-name"]', 'name', hospitalInfo.name);
    ensureMetaTag('meta[name="referrer"]', 'name', 'strict-origin-when-cross-origin');
    ensureMetaTag('meta[name="format-detection"]', 'name', 'telephone=yes');
    ensureMetaTag('meta[name="theme-color"]', 'name', darkMode ? '#020617' : '#ffffff');
    ensureMetaTag('meta[property="og:locale"]', 'property', language === 'hi' ? 'hi_IN' : 'en_IN');
    ensureMetaTag('meta[property="og:type"]', 'property', 'website');
    ensureMetaTag('meta[property="og:site_name"]', 'property', hospitalInfo.name);
    ensureMetaTag('meta[property="og:title"]', 'property', previewTitle);
    ensureMetaTag('meta[property="og:description"]', 'property', description);
    ensureMetaTag('meta[property="og:url"]', 'property', canonicalUrl);
    ensureMetaTag('meta[property="og:image"]', 'property', previewImage);
    ensureMetaTag('meta[property="og:image:alt"]', 'property', 'Rajrani Hospital healthcare preview');
    ensureMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    ensureMetaTag('meta[name="twitter:title"]', 'name', previewTitle);
    ensureMetaTag('meta[name="twitter:description"]', 'name', description);
    ensureMetaTag('meta[name="twitter:image"]', 'name', previewImage);
    ensureLinkTag('canonical', canonicalUrl);
    ensureHrefLang('en-IN', canonicalUrl);
    ensureHrefLang('hi-IN', canonicalUrl);
    ensureHrefLang('x-default', canonicalUrl);

    ensureStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: hospitalInfo.name,
        url: window.location.origin,
        inLanguage: language === 'hi' ? 'hi-IN' : 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: hospitalInfo.name,
        url: window.location.origin,
        email: hospitalInfo.email,
        telephone: hospitalInfo.phone,
        logo: previewImage,
        sameAs: [hospitalInfo.facebook, hospitalInfo.instagram].filter(Boolean)
      },
      {
        '@context': 'https://schema.org',
        '@type': location.pathname === '/diagnostics' ? 'MedicalBusiness' : 'Hospital',
        name: location.pathname === '/diagnostics' ? diagnosticsInfo.name : hospitalInfo.name,
        description,
        url: canonicalUrl,
        image: previewImage,
        telephone: location.pathname === '/diagnostics' ? diagnosticsInfo.phone : hospitalInfo.phone,
        email: hospitalInfo.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.pathname === '/diagnostics' ? diagnosticsInfo.address : hospitalInfo.address,
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          postalCode: '110096',
          addressCountry: 'IN'
        },
        areaServed: ['Old Kondli', 'Kondli', 'East Delhi', 'New Delhi'],
        medicalSpecialty: ['General Medicine', 'Emergency Care', 'Diagnostics', 'Orthopedics', 'Gynecology', 'Pediatrics'],
        sameAs: [hospitalInfo.facebook, hospitalInfo.instagram].filter(Boolean)
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: window.location.origin
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbName,
            item: canonicalUrl
          }
        ]
      },
      faqSchema
    ].filter(Boolean));
  }, [darkMode, language, location.pathname]);

  return null;
};

export default AppEffects;
