document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. DATA INITIALIZATION & SELECTION
  // ==========================================
  
  // Articles for Slider (IDs: 1, 9, 12, 14)
  const SLIDER_IDS = [14, 12, 1, 9];
  const sliderArticles = ARTICLES_DATA.filter(art => SLIDER_IDS.includes(art.id));
  
  // Standard News (All articles except columns. We can display them all in the grid)
  const newsArticles = ARTICLES_DATA.filter(art => art.category !== "Köşe Yazısı");
  
  // Column Articles (category: "Köşe Yazısı")
  const columnArticles = ARTICLES_DATA.filter(art => art.category === "Köşe Yazısı");
  
  // Documentary Article (id: 7 - "BU LOKANTA EVSİZLERE SICAK YUVA OLUYOR")
  const docArticle = ARTICLES_DATA.find(art => art.id === 7) || ARTICLES_DATA[6];

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

    // Handle Active Nav Link
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
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

    // If navigating to Belgesel page, update info block
    if (targetId === 'belgesel') {
      renderDocPageDetails();
    }
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
    const validSections = ['anasayfa', 'haberler', 'kose-yazilari', 'belgesel', 'hakkimda', 'iletisim'];
    
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
  // 4. HERO SLIDER (CAROUSEL)
  // ==========================================
  const sliderWrapper = document.getElementById('sliderWrapper');
  const sliderDots = document.getElementById('sliderDots');
  const sliderPrevBtn = document.getElementById('sliderPrevBtn');
  const sliderNextBtn = document.getElementById('sliderNextBtn');
  let currentSlideIndex = 0;
  let slideInterval;

  function renderSlider() {
    sliderWrapper.innerHTML = '';
    sliderDots.innerHTML = '';
    
    sliderArticles.forEach((art, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = `slide ${index === 0 ? 'active' : ''}`;
      
      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/cropped-ee95c1ad-4216-4474-9ebd-9be6fbd2345d.jpg';
      const dateHtml = formatDate(art.date) ? `<div class="slide-meta">${formatDate(art.date)}</div>` : '';
      slide.innerHTML = `
        <img src="${img}" class="slide-img" alt="${art.title}">
        <div class="slide-overlay"></div>
        <div class="slide-content container">
          <h1 class="slide-title">${art.title}</h1>
          ${dateHtml}
          <button class="slide-btn" data-id="${art.id}">Haberi Oku</button>
        </div>
      `;
      sliderWrapper.appendChild(slide);

      // Create dot
      const dot = document.createElement('button');
      dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', index);
      dot.setAttribute('aria-label', `Slayt ${index + 1}`);
      sliderDots.appendChild(dot);
    });

    // Add listeners to new slide buttons
    document.querySelectorAll('.slide-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        openArticle(id);
      });
    });
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlideIndex = index;
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentSlideIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 7000); // Rotate every 7 seconds
  }

  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Slider controls listeners
  sliderNextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });

  sliderPrevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });

  sliderDots.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider-dot')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      goToSlide(index);
      startAutoSlide();
    }
  });

  // Hover pauses auto slider
  const heroSlider = document.getElementById('heroSlider');
  heroSlider.addEventListener('mouseenter', stopAutoSlide);
  heroSlider.addEventListener('mouseleave', startAutoSlide);

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
    // Auto play when navigating
    setTimeout(() => {
      const video = document.getElementById('docVideo');
      if (video) playVideo(video);
    }, 400);
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
  // 7. KÖŞE YAZILARI PAGE RENDER
  // ==========================================
  const columnsContainer = document.getElementById('columnsContainer');

  function renderColumns() {
    columnsContainer.innerHTML = '';
    
    columnArticles.forEach(art => {
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

  // ==========================================
  // 8. DOCUMENTARY (BELGESEL) PAGE DETAILS
  // ==========================================
  const docInfoBlock = document.getElementById('docInfoBlock');

  function renderDocPageDetails() {
    if (!docInfoBlock || docInfoBlock.innerHTML.trim() !== '') return;
    
    const bodyText = docArticle.paragraphs.map(p => `<p>${p}</p>`).join('');
    
    docInfoBlock.innerHTML = `
      <div class="doc-meta">Antalya Sokak Röportajı & Saha Belgeseli</div>
      <h3 class="doc-title">${docArticle.title}</h3>
      <div class="doc-body">
        ${bodyText}
      </div>
    `;
  }

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

  // ==========================================
  // 10. CUSTOM HTML5 VIDEO PLAYER CONTROLS
  // ==========================================
  const videoContainer = document.getElementById('videoContainer');
  const docVideo = document.getElementById('docVideo');
  const videoLargePlayBtn = document.getElementById('videoLargePlayBtn');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoMuteBtn = document.getElementById('videoMuteBtn');
  const videoVolumeSlider = document.getElementById('videoVolumeSlider');
  const videoFullscreenBtn = document.getElementById('videoFullscreenBtn');
  const videoProgress = document.getElementById('videoProgress');
  const progressBarContainer = document.getElementById('progressBarContainer');
  const videoTimeDisplay = document.getElementById('videoTimeDisplay');

  function togglePlay() {
    if (docVideo.paused) {
      playVideo(docVideo);
    } else {
      pauseVideo(docVideo);
    }
  }

  function playVideo(video) {
    video.play();
    videoLargePlayBtn.style.display = 'none';
    
    // Switch controls icons
    videoPlayBtn.querySelector('.play-icon').style.display = 'none';
    videoPlayBtn.querySelector('.pause-icon').style.display = 'block';
  }

  function pauseVideo(video) {
    video.pause();
    videoLargePlayBtn.style.display = 'flex';
    
    // Switch controls icons
    videoPlayBtn.querySelector('.play-icon').style.display = 'block';
    videoPlayBtn.querySelector('.pause-icon').style.display = 'none';
  }

  // Play button listeners
  videoLargePlayBtn.addEventListener('click', togglePlay);
  videoPlayBtn.addEventListener('click', togglePlay);
  docVideo.addEventListener('click', togglePlay);

  // Update Progress & Time display
  docVideo.addEventListener('timeupdate', () => {
    if (docVideo.duration) {
      const pct = (docVideo.currentTime / docVideo.duration) * 100;
      videoProgress.style.width = `${pct}%`;
      
      // Update Time Text
      videoTimeDisplay.innerText = `${formatTime(docVideo.currentTime)} / ${formatTime(docVideo.duration)}`;
    }
  });

  // Progress Bar click navigation
  progressBarContainer.addEventListener('click', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    docVideo.currentTime = pos * docVideo.duration;
  });

  // Volume control slider
  videoVolumeSlider.addEventListener('input', (e) => {
    docVideo.volume = e.target.value;
    docVideo.muted = e.target.value == 0;
    updateMuteIcon();
  });

  // Mute button click
  videoMuteBtn.addEventListener('click', () => {
    docVideo.muted = !docVideo.muted;
    if (docVideo.muted) {
      videoVolumeSlider.value = 0;
    } else {
      videoVolumeSlider.value = docVideo.volume;
    }
    updateMuteIcon();
  });

  function updateMuteIcon() {
    const upIcon = videoMuteBtn.querySelector('.volume-up-icon');
    const muteIcon = videoMuteBtn.querySelector('.volume-mute-icon');
    if (docVideo.muted || docVideo.volume == 0) {
      upIcon.style.display = 'none';
      muteIcon.style.display = 'block';
    } else {
      upIcon.style.display = 'block';
      muteIcon.style.display = 'none';
    }
  }

  // Fullscreen button
  videoFullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // Helper: Format seconds to MM:SS
  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

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
