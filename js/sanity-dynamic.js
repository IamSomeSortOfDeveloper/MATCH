// Sanity Integration for Dynamic Pages
const projectId = 'sbueseii';
const dataset = 'production';
const apiVersion = '2023-01-01';

// Get Slug from URL
function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('slug')) {
    const slugParam = normalizeSlug(params.get('slug'));
    if (slugParam) return slugParam;
  }

  const path = window.location.pathname;
  if (path === '/') return null;

  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments.pop() || '';
  const pageName = lastSegment.replace(/\.html$/i, '');

  if (!pageName || pageName === 'dynamic' || pageName === 'guide' || pageName === 'index') {
    return null;
  }

  return pageName;
}

function normalizeSlug(value) {
  const raw = (value || '').trim();
  if (!raw) return '';
  return raw.replace(/^\{+|\}+$/g, '').trim();
}

function showMessage(message) {
  const container = document.getElementById('sanity-content-container');
  if (!container) return;
  container.innerHTML = `<section class="sanity-section"><div class="sanity-shell"><p>${message}</p></div></section>`;
}


async function fetchPageData(slug) {
  const query = encodeURIComponent(`*[_type == "page" && slug.current == $slug][0] {
    ...,
    content[] {
      ...,
      image { asset->{ url } },
      items[] {
        ...,
        image { asset->{ url } }
      }
    },
    pageContent[] {
      ...,
      image { asset->{ url } },
      featuresList[] {
        ...,
        icon { asset->{ url } }
      },
      profiles[] {
        ...,
        image { asset->{ url } }
      }
    }
  }`);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}&%24slug=${encodeURIComponent(JSON.stringify(slug))}`;

  try {
    const response = await fetch(url);
    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return null;
  }
}

async function fetchFirstPageData() {
  const query = encodeURIComponent(`*[_type == "page"]|order(_createdAt asc)[0] {
    ...,
    content[] {
      ...,
      image { asset->{ url } },
      items[] {
        ...,
        image { asset->{ url } }
      }
    },
    pageContent[] {
      ...,
      image { asset->{ url } },
      featuresList[] {
        ...,
        icon { asset->{ url } }
      },
      profiles[] {
        ...,
        image { asset->{ url } }
      }
    }
  }`);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const response = await fetch(url);
    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching fallback data from Sanity:", error);
    return null;
  }
}
function renderContentBlocks(blocks) {
  const container = document.getElementById('sanity-content-container');
  if (!container) return;

  container.innerHTML = '';

  const renderCta = (href, text) => {
    if (!href || !text) return '';
    return `<a href="${href}" class="sanity-cta">${text}</a>`;
  };

  blocks.forEach(block => {
    let blockHtml = '';

    switch (block._type) {
      // --- NEW JSON BLOCK TYPES ---
      case 'ctaBanner1':
        blockHtml = `
          <section class="sanity-section">
             <div class="sanity-shell">
               <div class="sanity-banner">
                 <div class="sanity-banner-grid">
                   <div>
                     ${block.heading ? `<h1 class="sanity-title">${block.heading}</h1>` : ''}
                     ${block.seoText ? `<p class="sanity-subtitle">${block.seoText}</p>` : ''}
                     ${renderCta(block.ctaLink, block.ctaText)}
                   </div>
                   <div>
                     ${block.image?.asset?.url ? `<img src="${block.image.asset.url}" class="sanity-banner-media" alt="${block.heading || ''}">` : ''}
                   </div>
                 </div>
               </div>
             </div>
          </section>
        `;
        break;

      case 'modelBanner':
        if (block.items && block.items.length > 0) {
          const profileList = block.items.map(p => `
              <article class="sanity-card">
                ${p.image?.asset?.url ? `<img src="${p.image.asset.url}" class="sanity-card-image" alt="${p.name || ''}">` : ''}
                <div class="sanity-card-body">
                  ${p.name ? `<h3 class="sanity-card-name">${p.name}</h3>` : ''}
                  ${p.description ? `<p class="sanity-card-text">${p.description}</p>` : ''}
                  ${p.ctaLink && p.ctaText ? `<a href="${p.ctaLink}" class="sanity-card-link">${p.ctaText}</a>` : ''}
                </div>
              </article>
            `).join('');
          blockHtml = `
            <section class="sanity-section">
              <div class="sanity-shell">
                <div class="sanity-preview-wrap">
                  ${block.heading ? `<h2 class="sanity-preview-title">${block.heading}</h2>` : ''}
                  <div class="sanity-card-grid">${profileList}</div>
                </div>
              </div>
            </section>
          `;
        }
        break;

      case 'textBlock1':
        blockHtml = `
          <section class="sanity-section">
            <div class="sanity-shell">
              <div class="sanity-center-box">
                ${block.heading ? `<h2 class="sanity-title">${block.heading}</h2>` : ''}
                ${block.seoText ? `<p class="sanity-subtitle mx-auto">${block.seoText}</p>` : ''}
                ${renderCta(block.ctaLink, block.ctaText)}
              </div>
            </div>
          </section>
        `;
        break;

      case 'textBlock2':
        blockHtml = `
          <section class="sanity-section">
            <div class="sanity-shell">
              <div class="sanity-banner">
                <div class="sanity-banner-grid">
                  <div class="sanity-banner-copy sanity-banner-copy--left">
                    ${block.heading ? `<h2 class="sanity-title">${block.heading}</h2>` : ''}
                    ${block.seoText ? `<p class="sanity-subtitle">${block.seoText}</p>` : ''}
                    ${renderCta(block.ctaUrl, block.ctaText)}
                  </div>
                  <div class="sanity-banner-visual">
                    ${block.image?.asset?.url ? `<img src="${block.image.asset.url}" class="sanity-banner-media" alt="${block.heading || ''}">` : ''}
                  </div>
                </div>
              </div>
            </div>
          </section>
        `;
        break;

      case 'textBlock3':
        blockHtml = `
          <section class="sanity-section">
            <div class="sanity-shell">
              <div class="sanity-banner">
                <div class="sanity-banner-grid sanity-banner-grid--reverse">
                  <div class="sanity-banner-visual">
                    ${block.image?.asset?.url ? `<img src="${block.image.asset.url}" class="sanity-banner-media" alt="${block.heading || ''}">` : ''}
                  </div>
                  <div class="sanity-banner-copy">
                    ${block.heading ? `<h2 class="sanity-title">${block.heading}</h2>` : ''}
                    ${block.seoText ? `<p class="sanity-subtitle">${block.seoText}</p>` : ''}
                    ${renderCta(block.ctaUrl, block.ctaText)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        `;
        break;

      case 'faqBlock':
        if (block.items && block.items.length > 0) {
          const faqList = block.items.map(q => `
            <div class="sanity-faq-item">
              <button class="sanity-faq-question" type="button" onclick="const answer=this.nextElementSibling; answer.classList.toggle('d-none'); this.querySelector('.icon').textContent = answer.classList.contains('d-none') ? '+' : '-'">
                <span>${q.question || ''}</span><span class="icon">+</span>
              </button>
              <p class="sanity-faq-answer d-none">${q.answer || ''}</p>
            </div>
          `).join('');
          blockHtml = `
            <section class="sanity-section">
              <div class="sanity-shell">
                <div class="sanity-faq">
                  ${block.heading ? `<h2 class="sanity-preview-title">${block.heading}</h2>` : ''}
                  ${faqList}
                </div>
              </div>
            </section>
          `;
        }
        break;

      case 'internallink':
        if (block.links && block.links.length > 0) {
          const linkListHTML = block.links.map(l => `
            <a href="${l.slug?.current ? `guide.html?slug=${encodeURIComponent(l.slug.current)}` : '#'}" class="sanity-link-item">${l.title || ''}</a>
          `).join('');
          blockHtml = `
            <section class="sanity-section">
              <div class="sanity-shell">
                <div class="sanity-links">
                  ${block.heading ? `<h2 class="sanity-preview-title">${block.heading}</h2>` : ''}
                  ${linkListHTML}
                </div>
              </div>
            </section>
          `;
        }
        break;

      case 'footerStrip':
        blockHtml = block.text ? `
          <section class="sanity-section">
            <div class="sanity-shell">
              <div class="sanity-footer">${block.text}</div>
            </div>
          </section>
        ` : '';
        break;

      // --- OLD SCHEMA BLOCK TYPES (Backwards Compatibility) ---
      case 'hero':
        blockHtml = `
          <section class="hero-block pb-5 pt-5 d-flex align-items-center">
             <div class="container row mx-auto align-items-center">
                <div class="col-md-6 text-start pe-md-5">
                   <h1 class="header__title text-dark mb-4" style="font-size: 56px; line-height: 1;">${block.heading || ''}</h1>
                   <p class="section__descr mb-5" style="font-size: 24px;">${block.text || ''}</p>
                   ${block.ctaLink && block.ctaText ? `<a href="${block.ctaLink}" class="contact__btn d-inline-block text-decoration-none px-5 py-3">${block.ctaText}</a>` : ''}
                </div>
                <div class="col-md-6 mt-5 mt-md-0 position-relative">
                   ${block.image?.asset?.url ? `<img src="${block.image.asset.url}" class="img-fluid w-100" style="border-radius: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" alt="Hero Image">` : ''}
                </div>
             </div>
          </section>
        `;
        break;

      case 'imageWithText':
        blockHtml = `
          <section class="image-text-block py-5 d-flex align-items-center">
             <div class="container row mx-auto align-items-center ${block.imagePosition === 'right' ? 'flex-row-reverse' : ''}">
                <div class="col-md-6 ${block.imagePosition === 'right' ? 'ps-md-5' : 'pe-md-5'} py-4 text-start">
                  <h2 class="section__header" style="font-size: 42px; margin-bottom: 24px;">${block.heading || ''}</h2>
                  <p class="section__descr" style="font-size: 20px; margin-bottom: 32px;">${block.text || ''}</p>
                  ${block.ctaLink && block.ctaText ? `<a href="${block.ctaLink}" class="contact__btn d-inline-block text-decoration-none">${block.ctaText}</a>` : ''}
                </div>
                <div class="col-md-6 text-center position-relative">
                  ${block.image?.asset?.url ? `<img src="${block.image.asset.url}" class="img-fluid w-100" style="border-radius: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" alt="Section Image">` : ''}
                </div>
             </div>
          </section>
        `;
        break;

      case 'faq':
        if (block.questions && block.questions.length > 0) {
          const legacyFaqList = block.questions.map(q => `
                <div class="faq-item mb-4 p-4 text-start" style="background: white; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
                   <h4 class="section__header" style="font-size: 20px; font-weight: bold;">${q.question}</h4>
                   <p class="section__descr mb-0 mt-3" style="font-size: 18px; line-height: 1.5;">${q.answer}</p>
                </div>
             `).join('');
          blockHtml = `
               <section class="faq-block py-5 container" style="max-width: 900px;">
                  <h2 class="section__header text-center mb-5" style="font-size: 42px;">${block.heading || ''}</h2>
                  ${legacyFaqList}
               </section>
             `;
        }
        break;

      case 'features':
        if (block.featuresList && block.featuresList.length > 0) {
          const featureList = block.featuresList.map(f => `
                <div class="col-md-4 mb-4 text-center">
                   <div class="p-4 border rounded h-100" style="background: white; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
                     <h4 class="section__header" style="font-size: 22px;">${f.title}</h4>
                     <p class="section__descr mt-3" style="font-size: 16px;">${f.description}</p>
                   </div>
                </div>
             `).join('');
          blockHtml = `
               <section class="features-block py-5 container">
                  <h2 class="section__header text-center mb-5" style="font-size: 42px;">${block.heading || ''}</h2>
                  <div class="row">
                     ${featureList}
                  </div>
               </section>
             `;
        }
        break;

      case 'cta':
        blockHtml = `
          <section class="cta-block py-5 mt-5 mb-5 text-center" style="background: rgba(10,10,9,0.03); border-radius: 40px; margin: 0 60px;">
             <div class="container p-5">
               <h2 class="section__header" style="font-size: 42px; margin-bottom: 24px;">${block.heading || ''}</h2>
               <p class="section__descr mb-4" style="font-size: 20px;">${block.text || ''}</p>
               ${block.ctaLink && block.ctaText ? `<a href="${block.ctaLink}" class="contact__btn d-inline-block text-decoration-none mt-3">${block.ctaText}</a>` : ''}
             </div>
          </section>
        `;
        break;

      case 'characterProfiles':
      case 'textBlock':
      case 'linkList':
        // Handling edge case if any were made with old generic naming before JSON update
        console.warn('Skipping redundant older schema rendering');
        break;

      default:
        console.warn(`Unsupported block type: ${block._type}`);
    }

    container.innerHTML += blockHtml;
  });
}

async function initSanityPage() {
  const slug = getSlugFromUrl();
  const container = document.getElementById('sanity-content-container');
  if (!container) return;

  if (window.location.protocol === 'file:') {
    showMessage('Open this page through http://localhost (not file://).');
    return;
  }

  const pageData = slug ? await fetchPageData(slug) : await fetchFirstPageData();

  if (!pageData) {
    showMessage(slug ? `No published page found for slug: ${slug}` : 'No published Sanity pages found.');
    return;
  }

  const pageMetatitle = pageData.metatitle || pageData.metaTitle;
  document.title = pageMetatitle || slug || pageData.title || 'Dynamic Page';

  const metaDescription = document.querySelector('meta[name="description"]');
  const pageMetadesc = pageData.metadescription || pageData.metaDescription;
  if (metaDescription && pageMetadesc) {
    metaDescription.setAttribute('content', pageMetadesc);
  }

  const allBlocks = pageData.content || pageData.pageContent;

  if (allBlocks && allBlocks.length > 0) {
    renderContentBlocks(allBlocks);
  } else {
    showMessage('This page is published but has no content blocks.');
  }
}

document.addEventListener('DOMContentLoaded', initSanityPage);
