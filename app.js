document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. DATA INITIALIZATION & SELECTION
  // ==========================================
  
  // Articles for Slider (Ordered: 9, 14, 1, 5)
  const SLIDER_IDS = [9, 14, 1, 5];
  const sliderArticles = SLIDER_IDS.map(id => ARTICLES_DATA.find(art => art.id === id)).filter(Boolean);
  
  // Standard News (All articles except columns. We can display them all in the grid)
  const newsArticles = ARTICLES_DATA.filter(art => art.category !== "Köşe Yazısı");
  
  // Column Articles (category: "Köşe Yazısı")
  const columnArticles = ARTICLES_DATA.filter(art => art.category === "Köşe Yazısı");
  
  // Yönlendirme ve Sayfa Yönetimi Bileşenleri

  // ==========================================
  // 2. SPA ROUTING
  // ==========================================
  const pageSections = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');
  const footerNavItems = document.querySelectorAll('.footer-nav-item');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const logoLink = document.getElementById('logoLink');

  function navigateTo(targetId) {
    // Hide mobile menu if open
    navLinks.classList.remove('mobile-active');

    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Handle Active Nav Link (Keep "Belgesel" active when viewing documentary details)
    navItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === targetId || (targetId === 'belgesel-detay' && target === 'belgesel')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Handle Active Page Section
    pageSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }

  function handleRoute() {
    const hash = window.location.hash || '#anasayfa';
    
    // Check if the hash is a deep link to an article (e.g. #article/5)
    if (hash.startsWith('#article/')) {
      const artId = parseInt(hash.split('/')[1]);
      if (artId) {
        openArticle(artId);
        // Fallback to home page under the overlay only if no section is active
        const activeSection = document.querySelector('.page-section.active');
        if (!activeSection) {
          navigateTo('anasayfa');
        }
      }
      return;
    }

    const targetId = hash.replace('#', '');
    const validSections = ['anasayfa', 'haberler', 'kose-yazilari', 'belgesel', 'belgesel-detay', 'hakkimda', 'iletisim'];
    
    if (validSections.includes(targetId)) {
      navigateTo(targetId);
    } else {
      navigateTo('anasayfa');
    }
  }

  // Event Listeners for Nav
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      window.location.hash = target;
    });
  });

  footerNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      window.location.hash = href;
    });
  });

  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'anasayfa';
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
  });

  window.addEventListener('hashchange', handleRoute);
  
  // Initial Route Load
  handleRoute();

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. THEME TOGGLE (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', storedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // 4. HERO SPLIT SLIDER (CAROUSEL)
  // ==========================================
  let currentSlideIndex = 0;
  let slideInterval;

  function renderSlider() {
    const sliderSidebarQueue = document.getElementById('sliderSidebarQueue');
    if (!sliderSidebarQueue) return;
    
    sliderSidebarQueue.innerHTML = '';
    
    sliderArticles.forEach((art, index) => {
      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/cropped-ee95c1ad-4216-4474-9ebd-9be6fbd2345d.jpg';
      let displayTitle = art.title;
      if (art.id === 14) {
        displayTitle = "Afgan Hükümetinin Kadın Haklarını Yok Sayan Yönetiminin Tam Ortasında Doğmuş, Hayalleri Yerle Bir Olmuş Bir Kadın: Nergis Ahmadi";
      }
      
      const queueItem = document.createElement('div');
      queueItem.className = `queue-item ${index === 0 ? 'active' : ''}`;
      queueItem.innerHTML = `
        <div class="queue-item-thumb">
          <img src="${img}" alt="${displayTitle}">
        </div>
        <div class="queue-item-meta">
          <span class="queue-item-category">${art.category}</span>
          <h4 class="queue-item-title">${displayTitle}</h4>
        </div>
        <div class="queue-progress-bar"></div>
      `;
      
      queueItem.addEventListener('click', () => {
        goToSlide(index);
        startAutoSlide();
      });
      
      sliderSidebarQueue.appendChild(queueItem);
    });
    
    // Load the first slide
    goToSlide(0);
  }

  function goToSlide(index) {
    if (index >= sliderArticles.length) index = 0;
    if (index < 0) index = sliderArticles.length - 1;
    
    currentSlideIndex = index;
    const art = sliderArticles[index];
    if (!art) return;
    
    // Update main display
    const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/cropped-ee95c1ad-4216-4474-9ebd-9be6fbd2345d.jpg';
    let displayTitle = art.title;
    if (art.id === 14) {
      displayTitle = "Afgan Hükümetinin Kadın Haklarını Yok Sayan Yönetiminin Tam Ortasında Doğmuş, Hayalleri Yerle Bir Olmuş Bir Kadın: Nergis Ahmadi";
    }
    
    const sliderMainDisplay = document.getElementById('sliderMainDisplay');
    if (sliderMainDisplay) {
      sliderMainDisplay.innerHTML = `
        <div class="slide-main-item slide-art-${art.id}">
          <img src="${img}" class="slide-main-img" alt="${displayTitle}">
          <div class="slide-main-overlay"></div>
          <div class="slide-main-content">
            <span class="slide-main-category">${art.category}</span>
            <h1 class="slide-main-title">${displayTitle}</h1>
            <button class="slide-main-btn" data-id="${art.id}">Haberi Oku</button>
          </div>
        </div>
      `;
      
      // Attach listener to the new button
      const btn = sliderMainDisplay.querySelector('.slide-main-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          openArticle(art.id);
        });
      }
    }
    
    // Update active state in sidebar queue
    const queueItems = document.querySelectorAll('.queue-item');
    queueItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 10000); // Rotate every 10 seconds
  }

  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Hover pauses auto slider
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
  }

  // Initialize Slider
  renderSlider();
  startAutoSlide();

  // ==========================================
  // 5. FEATURED VIDEO (DOCUMENTARY) CARD ON HOMEPAGE
  // ==========================================
  const videoTeaserBtn = document.getElementById('videoTeaserBtn');
  const viewDocLink = document.getElementById('viewDocLink');

  videoTeaserBtn.addEventListener('click', () => {
    window.location.hash = 'belgesel';
  });

  viewDocLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'belgesel';
  });

  // ==========================================
  // 6. NEWS GRID RENDER & SEARCH
  // ==========================================
  const latestNewsGrid = document.getElementById('latestNewsGrid');
  const allNewsGrid = document.getElementById('allNewsGrid');
  const searchInput = document.getElementById('searchInput');

  function renderGrid(gridElement, articles) {
    if (!gridElement) return;
    gridElement.innerHTML = '';
    
    if (articles.length === 0) {
      gridElement.innerHTML = `
        <div class="no-results">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <p>Aradığınız kriterlere uygun haber bulunamadı.</p>
        </div>
      `;
      return;
    }

    articles.forEach(art => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.setAttribute('data-id', art.id);
      
      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/cropped-ee95c1ad-4216-4474-9ebd-9be6fbd2345d.jpg';
      const cleanExcerpt = art.paragraphs[0] ? art.paragraphs[0].substring(0, 120) + '...' : '';
      
      const dateHtml = formatDate(art.date) ? `<div class="card-meta">${formatDate(art.date)}</div>` : '';
      card.innerHTML = `
        <div class="card-img-container">
          <img src="${img}" class="card-img" alt="${art.title}" loading="lazy">
          <span class="card-category">${art.category}</span>
        </div>
        <div class="card-content">
          ${dateHtml}
          <h3 class="card-title">${art.title}</h3>
          <p class="card-excerpt">${cleanExcerpt}</p>
          <span class="card-footer-link">
            <span>Haberi Oku</span>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </span>
        </div>
      `;
      
      card.addEventListener('click', () => openArticle(art.id));
      gridElement.appendChild(card);
    });
  }

  // Instant Search Event Listener (only for allNewsGrid)
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderGrid(allNewsGrid, newsArticles);
      return;
    }

    const filtered = newsArticles.filter(art => {
      const inTitle = art.title.toLowerCase().includes(query);
      const inBody = art.paragraphs.some(p => p.toLowerCase().includes(query));
      return inTitle || inBody;
    });

    renderGrid(allNewsGrid, filtered);
  });

  // Render initial news lists
  renderGrid(latestNewsGrid, newsArticles.slice(0, 6)); // Only 6 latest news articles on Anasayfa
  renderGrid(allNewsGrid, newsArticles); // All news articles on Haberler archive page

  // ==========================================
  // 7. KÖŞE YAZILARI PAGE RENDER & SEARCH
  // ==========================================
  const columnsContainer = document.getElementById('columnsContainer');
  const columnSearchInput = document.getElementById('columnSearchInput');

  function renderColumns(articlesToShow) {
    columnsContainer.innerHTML = '';
    const targetArticles = articlesToShow || columnArticles;
    
    if (targetArticles.length === 0) {
      columnsContainer.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; width: 100%; padding: 40px 0;">
          <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; margin: 0 auto 16px; display: block; color: var(--text-tertiary);">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <p style="text-align: center; color: var(--text-secondary);">Aradığınız kriterlere uygun köşe yazısı bulunamadı.</p>
        </div>
      `;
      return;
    }
    
    targetArticles.forEach(art => {
      const card = document.createElement('div');
      card.className = 'column-card';
      card.setAttribute('data-id', art.id);

      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/adobestock_311795109_preview.jpeg?w=1000';
      const cleanExcerpt = art.paragraphs[0] ? art.paragraphs[0].substring(0, 180) + '...' : '';

      const dateHtml = formatDate(art.date) ? `<div class="card-meta">${formatDate(art.date)}</div>` : '';
      card.innerHTML = `
        <img src="${img}" class="column-card-img" alt="${art.title}" loading="lazy">
        <div class="column-card-content">
          ${dateHtml}
          <h3 class="card-title" style="font-size: 1.6rem; margin-bottom: 8px;">${art.title}</h3>
          <p class="card-excerpt" style="margin-bottom: 16px;">${cleanExcerpt}</p>
          <span class="card-footer-link">
            <span>Köşe Yazısını Oku</span>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </span>
        </div>
      `;

      card.addEventListener('click', () => openArticle(art.id));
      columnsContainer.appendChild(card);
    });
  }

  if (columnSearchInput) {
    columnSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        renderColumns(columnArticles);
        return;
      }

      const filtered = columnArticles.filter(art => {
        const inTitle = art.title.toLowerCase().includes(query);
        const inBody = art.paragraphs.some(p => p.toLowerCase().includes(query));
        return inTitle || inBody;
      });

      renderColumns(filtered);
    });
  }

  renderColumns();

  // ==========================================
  // BENTO ROW COLUMNIST RENDER (ON HOMEPAGE)
  // ==========================================
  const bentoColumnistCard = document.getElementById('bentoColumnistCard');

  function renderBentoColumnist() {
    if (!bentoColumnistCard) return;
    bentoColumnistCard.innerHTML = '';
    
    const latestColumn = columnArticles[0];
    if (!latestColumn) return;

    const card = document.createElement('div');
    card.className = 'column-card';
    card.setAttribute('data-id', latestColumn.id);

    const img = latestColumn.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/adobestock_311795109_preview.jpeg?w=1000';
    const cleanExcerpt = latestColumn.paragraphs[0] ? latestColumn.paragraphs[0].substring(0, 180) + '...' : '';

    const dateHtml = formatDate(latestColumn.date) ? `<div class="card-meta">${formatDate(latestColumn.date)}</div>` : '';
    card.innerHTML = `
      <img src="${img}" class="column-card-img" alt="${latestColumn.title}" loading="lazy">
      <div class="column-card-content">
        ${dateHtml}
        <h3 class="card-title" style="font-size: 1.6rem; margin-bottom: 8px;">${latestColumn.title}</h3>
        <p class="card-excerpt" style="margin-bottom: 16px;">${cleanExcerpt}</p>
        <span class="card-footer-link">
          <span>Köşe Yazısını Oku</span>
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </span>
      </div>
    `;

    card.addEventListener('click', () => openArticle(latestColumn.id));
    bentoColumnistCard.appendChild(card);
  }

  renderBentoColumnist();

  // Belgesel detayları doğrudan HTML üzerinden statik ve SEO uyumlu olarak yönetilmektedir.

  // ==========================================
  // 9. ARTICLE MODAL / DRAWER SYSTEM
  // ==========================================
  const drawerOverlay = document.getElementById('drawerOverlay');
  const articleDrawer = document.getElementById('articleDrawer');
  const drawerBody = document.getElementById('drawerBody');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerCopyLinkBtn = document.getElementById('drawerCopyLinkBtn');
  const readingProgressBar = document.getElementById('readingProgressBar');
  let activeArticleId = null;

  function openArticle(id) {
    const art = ARTICLES_DATA.find(a => a.id === id);
    if (!art) return;

    activeArticleId = id;
    window.location.hash = `article/${id}`;
    
    const imgElement = art.featured_image ? `
      <div class="drawer-img-container">
        <img src="${art.featured_image}" alt="${art.title}">
      </div>
    ` : '';
    
    const bodyParagraphs = art.paragraphs.map(p => `<p>${p}</p>`).join('');

    const dateHtml = formatDate(art.date) ? `<span>Yayın Tarihi: ${formatDate(art.date)}</span><span>&bull;</span>` : '';
    drawerBody.innerHTML = `
      <div class="drawer-meta">${art.category}</div>
      <h1 class="drawer-title">${art.title}</h1>
      <div class="drawer-pub-meta">
        ${dateHtml}
        <span>Yazar: Güldeste Altay</span>
      </div>
      ${imgElement}
      <div class="drawer-text">
        ${bodyParagraphs}
      </div>
    `;

    // Reset progress
    readingProgressBar.style.width = '0%';
    drawerBody.scrollTop = 0;

    // Open Drawer
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock main scroll
  }

  function closeArticle() {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock main scroll
    activeArticleId = null;
    
    // Clear URL Hash back to correct parent section
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) {
      window.location.hash = activeSection.id;
    } else {
      window.location.hash = 'anasayfa';
    }
  }

  drawerCloseBtn.addEventListener('click', closeArticle);
  
  // Close when clicking outside on overlay
  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      closeArticle();
    }
  });

  // Track Reading Progress Scroll
  drawerBody.addEventListener('scroll', () => {
    const totalHeight = drawerBody.scrollHeight - drawerBody.clientHeight;
    if (totalHeight > 0) {
      const scrollPct = (drawerBody.scrollTop / totalHeight) * 100;
      readingProgressBar.style.width = `${scrollPct}%`;
    }
  });

  // Copy Deep Link
  drawerCopyLinkBtn.addEventListener('click', () => {
    if (!activeArticleId) return;
    
    const deepLink = `${window.location.origin}${window.location.pathname}#article/${activeArticleId}`;
    navigator.clipboard.writeText(deepLink).then(() => {
      // Feedback to user
      const btnSpan = drawerCopyLinkBtn.querySelector('span');
      const originalText = btnSpan.innerText;
      btnSpan.innerText = 'Bağlantı Kopyalandı!';
      drawerCopyLinkBtn.style.borderColor = '#28a745';
      drawerCopyLinkBtn.style.color = '#28a745';
      
      setTimeout(() => {
        btnSpan.innerText = originalText;
        drawerCopyLinkBtn.style.borderColor = '';
        drawerCopyLinkBtn.style.color = '';
      }, 2000);
    });
  });

  // Custom video controls section removed since video was replaced with a YouTube iframe.

  // ==========================================
  // 11. CONTACT FORM HANDLER
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessMsg = document.getElementById('formSuccessMsg');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable submit to prevent double sends
    formSubmitBtn.disabled = true;
    formSubmitBtn.querySelector('span').innerText = 'Gönderiliyor...';

    // Simulate network delay
    setTimeout(() => {
      // Show success msg
      formSuccessMsg.style.display = 'block';
      
      // Reset button
      formSubmitBtn.disabled = false;
      formSubmitBtn.querySelector('span').innerText = 'Gönder';
      
      // Reset form fields
      contactForm.reset();

      // Fade out success msg after 5s
      setTimeout(() => {
        formSuccessMsg.style.display = 'none';
      }, 5000);
    }, 1500);
  });

  // ==========================================
  // 12. HELPER UTILS
  // ==========================================
  function formatDate(isoString) {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      // If it is 15 January 2024, return empty string to hide it
      if (d.getFullYear() === 2024 && d.getMonth() === 0 && d.getDate() === 15) {
        return '';
      }
      return d.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return isoString;
    }
  }
});
