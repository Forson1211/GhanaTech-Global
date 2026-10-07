export function updatePageMetadata(title: string, description: string, path: string, privatePage = false) {
  const origin = new URL(import.meta.env.VITE_SITE_URL || window.location.origin).origin;
  const canonicalUrl = origin + path;
  function meta(attribute: 'name' | 'property', key: string, content: string) {
    let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
    element.content = content;
  }
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = canonicalUrl;
  meta('name', 'robots', privatePage ? 'noindex, nofollow' : 'index, follow');
  meta('property', 'og:type', 'website'); meta('property', 'og:site_name', 'GhanaTech Global');
  meta('property', 'og:title', title); meta('property', 'og:description', description); meta('property', 'og:url', canonicalUrl);
  meta('property', 'og:image', origin + '/images/hero-talent.jpg');
  meta('name', 'twitter:card', 'summary_large_image'); meta('name', 'twitter:title', title); meta('name', 'twitter:description', description); meta('name', 'twitter:image', origin + '/images/hero-talent.jpg');
}
