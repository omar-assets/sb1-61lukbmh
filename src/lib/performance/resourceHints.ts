export function addResourceHints() {
  // DNS Prefetch
  const domains = [
    'images.unsplash.com',
    'brixasset.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect
  const preconnectDomains = [
    'https://images.unsplash.com',
    'https://brixasset.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical assets
  const criticalAssets = [
    { path: '/brix-logo.svg', as: 'image' },
    { path: '/brix-icon.svg', as: 'image' }
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.path;
    link.as = asset.as;
    document.head.appendChild(link);
  });
}