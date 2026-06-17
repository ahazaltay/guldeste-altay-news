document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // TRANSLATIONS DICTIONARY
  // ==========================================
  const TRANSLATIONS = {
    tr: {
      "logo-sub": "Gazetecilik Çalışmaları",
      "nav-home": "Anasayfa",
      "nav-news": "Haberler",
      "nav-columns": "Köşe Yazıları",
      "nav-doc": "Belgesel",
      "nav-about": "Hakkımda",
      "nav-contact": "İletişim",
      "feat-doc-badge": "Öne Çıkan Belgesel",
      "feat-doc-title": "Doğu Türkistan'da Ne Oluyor?",
      "feat-doc-desc": "Çin’in Doğu Türkistan bölgesinde uygulanan asimilasyon politikalarını, toplama kamplarındaki insan hakları ihlallerini ve ailelerin arayışlarını ele alan sarsıcı araştırma belgeseli.",
      "feat-doc-action": "Videoyu İzle & Oku",
      "title-latest-news": "Son Haberler",
      "title-feat-column": "Öne Çıkan Köşe Yazısı",
      "title-about-author": "Yazar Hakkında",
      "title-news-archive": "Haber Arşivi",
      "title-columns": "Köşe Yazıları",
      "title-doc-works": "Belgesel Çalışmaları",
      "title-contact": "İletişime Geçin",
      "author-title": "Bağımsız Gazeteci",
      "author-bento-desc": "Akdeniz Üniversitesi İletişim Fakültesi Gazetecilik Bölümü mezunudur. Akil Haber Ajansı, Kanal D ve NTV haber merkezlerindeki deneyimleriyle televizyon haberciliği ve araştırmacı gazetecilik alanlarında çalışmalarını sürdürmektedir.",
      "author-bento-btn": "Detaylı Biyografi",
      "author-quote": "“Gerçeğin, hikayelerin ve arka planda kalan hayatların peşinde koşan bağımsız bir gazeteciyim.”",
      "about-bio-1": "Akdeniz Üniversitesi İletişim Fakültesi Gazetecilik Bölümü mezunudur. Mesleki deneyimine Akdeniz Üniversitesi bünyesindeki Akil Haber Ajansı’nda başlamış; ardından Kanal D haber merkezinde staj deneyimi edinmiştir. Yaklaşık bir yıldır NTV haber merkezinde mesleki deneyimini sürdürmekte; televizyon haberciliği, gündem takibi, haber dili ve editoryal süreçler alanında kendini geliştirmektedir.",
      "about-bio-2": "Çalışmalarında toplumsal meseleler, hak ihlalleri, dezavantajlı gruplar ve görünürlüğü sınırlı kalan yaşam deneyimlerine odaklanmaktadır. Çölyak hastalarının ekonomik ve sosyal sorunları, sağlık çalışanlarının mobbing ve tükenmişlik deneyimleri, Doğu Türkistan’daki aile hikâyeleri ve evsiz bireylerin yaşam koşulları üzerine haber, röportaj ve araştırma çalışmaları hazırlamıştır.",
      "about-bio-3": "Yazılı haberlerinin yanı sıra görsel habercilik ve belgesel video üretimiyle de ilgilenmekte; sahadan beslenen, insan odaklı ve araştırmaya dayalı bir gazetecilik anlayışıyla üretimlerine devam etmektedir.",
      "about-bio-4": "Bu web sitesi, yayımlanmış haber, röportaj, yazı, video ve belgesel çalışmalarını tek bir arşivde toplamak amacıyla hazırlanmıştır.",
      "doc-list-badge": "Araştırma Belgesel",
      "doc-list-title": "Doğu Türkistan'da Ne Oluyor?",
      "doc-list-desc": "Çin’in Doğu Türkistan bölgesinde uygulanan asimilasyon politikalarını, toplama kamplarındaki insan hakları ihlallerini ve ailelerin arayışlarını ele alan sarsıcı araştırma belgeseli.",
      "doc-list-readmore": "Videoyu İzle & Oku",
      "doc-soon-badge": "Yeni Çalışma",
      "doc-soon-title": "Çok Yakında",
      "doc-soon-desc": "Yeni belgesel ve görüntülü saha araştırması projeleri hazırlık aşamasındadır.",
      "doc-soon-placeholder": "Yakında",
      "doc-back-btn": "Belgesellere Geri Dön",
      "doc-detail-meta": "Araştırma Belgeseli & İnsan Hakları Çalışması",
      "doc-detail-title": "Doğu Türkistan'da Ne Oluyor?",
      "doc-body-1": "Çin’in Doğu Türkistan bölgesinde uzun yıllardır uyguladığı asimilasyon politikalarını, toplama kamplarındaki insan hakları ihlallerini ve ailelerin parçalanma hikâyelerini ele alan bu sarsıcı çalışma, Uygur Türklerinin sesi olmayı amaçlıyor. Gazeteci Güldeste Altay tarafından hazırlanan belgesel, özellikle sosyal medya platformlarında yayınlandığı andan itibaren geniş bir kamuoyu desteği ve etkileşimi toplamıştır.",
      "doc-body-2": "Belgeselin merkezinde, Çin’in toplama kamplarında yedi yılı aşkın süredir tutulan kız kardeşi Mevlüde Hilal’in izini süren Medine Nazimi’nin adalet ve özgürlük arayışı yer alıyor. Medine Nazimi, kardeşinin bir Türkiye Cumhuriyeti vatandaşı olduğunu vurgulayarak, yetkililere ve kamuoyuna \"kardeşime sahip çıkın\" çağrısında bulunuyor.",
      "doc-body-3": "Baskı rejiminin gölgesinde parçalanan aileler, haber alınamayan akrabalar ve uluslararası toplumun sessizliği... Bu çalışma, sadece bir ailenin değil, Doğu Türkistan’daki milyonlarca insanın sessiz çığlığını bağımsız gazetecilik perspektifiyle dijital dünyaya taşıyor.",
      "doc-watch-yt": "YouTube'da İzle",
      "contact-desc": "Haber ihbarları, röportaj teklifleri, ortak projeler veya çalışmalarım hakkındaki görüşleriniz için bana aşağıdaki kanallardan ulaşabilir ya da doğrudan formu doldurabilirsiniz.",
      "contact-label-email": "E-posta",
      "contact-label-location": "Lokasyon",
      "contact-value-location": "İstanbul, Türkiye",
      "contact-label-linkedin": "LinkedIn",
      "contact-form-name": "Adınız Soyadınız",
      "contact-form-email": "E-posta Adresiniz",
      "contact-form-subject": "Konu",
      "contact-form-message": "Mesajınız",
      "contact-form-submit": "Gönder",
      "contact-form-sending": "Gönderiliyor...",
      "contact-form-success": "Mesajınız başarıyla iletildi! En kısa zamanda dönüş yapılacaktır.",
      "contact-form-name-placeholder": "Adınızı girin",
      "contact-form-email-placeholder": "E-postanızı girin",
      "contact-form-subject-placeholder": "Mesajınızın konusu",
      "contact-form-message-placeholder": "Mesajınızı yazın...",
      "search-news-placeholder": "Haber başlığı ara...",
      "search-column-placeholder": "Köşe yazısı ara...",
      "no-news-found": "Aradığınız kriterlere uygun haber bulunamadı.",
      "no-columns-found": "Aradığınız kriterlere uygun köşe yazısı bulunamadı.",
      "drawer-copy-link": "Bağlantıyı Kopyala",
      "drawer-link-copied": "Bağlantı Kopyalandı!",
      "drawer-author": "Yazar: Güldeste Altay",
      "drawer-pub-date": "Yayın Tarihi",
      "theme-aria-label": "Temayı Değiştir",
      "menu-aria-label": "Menüyü Aç",
      "doc-watch-aria-label": "Doğu Türkistan'da Ne Oluyor? Belgeselini YouTube'da İzle",
      "read-article": "Haberi Oku",
      "read-column": "Köşe Yazısını Oku",
      "footer-copy": "&copy; 2026 Güldeste Altay. Tüm Hakları Saklıdır."
    },
    en: {
      "logo-sub": "Journalism Works",
      "nav-home": "Home",
      "nav-news": "News",
      "nav-columns": "Columns",
      "nav-doc": "Documentary",
      "nav-about": "About",
      "nav-contact": "Contact",
      "feat-doc-badge": "Featured Documentary",
      "feat-doc-title": "What is Happening in East Turkestan?",
      "feat-doc-desc": "A striking investigative documentary addressing the assimilation policies implemented by China in the East Turkestan region, human rights violations in concentration camps, and families' search for their loved ones.",
      "feat-doc-action": "Watch Video & Read",
      "title-latest-news": "Latest News",
      "title-feat-column": "Featured Column",
      "title-about-author": "About the Author",
      "title-news-archive": "News Archive",
      "title-columns": "Columns",
      "title-doc-works": "Documentary Works",
      "title-contact": "Get in Touch",
      "author-title": "Independent Journalist",
      "author-bento-desc": "Graduated from Akdeniz University, Faculty of Communication, Department of Journalism. She continues her work in television journalism and investigative journalism with her experiences at Akil News Agency, Kanal D, and NTV newsrooms.",
      "author-bento-btn": "Detailed Biography",
      "author-quote": "“I am an independent journalist chasing the truth, stories, and lives that remain in the background.”",
      "about-bio-1": "She graduated from Akdeniz University, Faculty of Communication, Department of Journalism. She started her professional experience at the Akil News Agency within Akdeniz University; then she completed an internship at the Kanal D news center. She has been continuing her professional experience at the NTV news center for about a year, developing herself in television journalism, agenda monitoring, news language, and editorial processes.",
      "about-bio-2": "In her works, she focuses on social issues, human rights violations, disadvantaged groups, and life experiences that remain limited in visibility. She has prepared news, interviews, and research studies on the economic and social problems of celiac patients, mobbing and burnout experiences of healthcare workers, family stories in East Turkestan, and the living conditions of homeless individuals.",
      "about-bio-3": "In addition to written news, she is interested in visual journalism and documentary video production; she continues her productions with an independent, human-oriented, and research-based journalism approach fed by the field.",
      "about-bio-4": "This website has been prepared to gather her published news, interviews, columns, videos, and documentary works in a single archive.",
      "doc-list-badge": "Research Documentary",
      "doc-list-title": "What is Happening in East Turkestan?",
      "doc-list-desc": "A striking investigative documentary addressing the assimilation policies implemented by China in the East Turkestan region, human rights violations in concentration camps, and families' search for their loved ones.",
      "doc-list-readmore": "Watch Video & Read",
      "doc-soon-badge": "New Work",
      "doc-soon-title": "Coming Soon",
      "doc-soon-desc": "New documentary and video-based field research projects are in preparation.",
      "doc-soon-placeholder": "Coming Soon",
      "doc-back-btn": "Back to Documentaries",
      "doc-detail-meta": "Research Documentary & Human Rights Work",
      "doc-detail-title": "What is Happening in East Turkestan?",
      "doc-body-1": "Aiming to be the voice of Uyghur Turks, this shocking work addresses the assimilation policies implemented by China in the East Turkestan region for many years, human rights violations in concentration camps, and stories of divided families. Prepared by journalist Güldeste Altay, the documentary has gathered wide public support and engagement, especially since its publication on social media platforms.",
      "doc-body-2": "At the center of the documentary is the quest for justice and freedom of Medine Nazimi, who traces her sister Mevlüde Hilal, held in China's concentration camps for over seven years. Medine Nazimi emphasizes that her sister is a citizen of the Republic of Turkey and calls upon the authorities and the public to 'claim my sister'.",
      "doc-body-3": "Families torn apart under the shadow of the oppressive regime, relatives from whom no news can be received, and the silence of the international community... This work carries the silent cry of not just one family, but millions of people in East Turkestan to the digital world through an independent journalism perspective.",
      "doc-watch-yt": "Watch on YouTube",
      "contact-desc": "You can reach me through the channels below or fill out the form directly for news tips, interview proposals, joint projects, or your feedback about my work.",
      "contact-label-email": "Email",
      "contact-label-location": "Location",
      "contact-value-location": "Istanbul, Turkey",
      "contact-label-linkedin": "LinkedIn",
      "contact-form-name": "Your Name",
      "contact-form-email": "Your Email",
      "contact-form-subject": "Subject",
      "contact-form-message": "Your Message",
      "contact-form-submit": "Send",
      "contact-form-sending": "Sending...",
      "contact-form-success": "Your message has been successfully sent! We will get back to you as soon as possible.",
      "contact-form-name-placeholder": "Enter your name",
      "contact-form-email-placeholder": "Enter your email",
      "contact-form-subject-placeholder": "Subject of your message",
      "contact-form-message-placeholder": "Write your message...",
      "search-news-placeholder": "Search news title...",
      "search-column-placeholder": "Search columns...",
      "no-news-found": "No news found matching your search criteria.",
      "no-columns-found": "No columns found matching your search criteria.",
      "drawer-copy-link": "Copy Link",
      "drawer-link-copied": "Link Copied!",
      "drawer-author": "Author: Güldeste Altay",
      "drawer-pub-date": "Publish Date",
      "theme-aria-label": "Toggle Theme",
      "menu-aria-label": "Open Menu",
      "doc-watch-aria-label": "Watch What is Happening in East Turkestan? Documentary on YouTube",
      "read-article": "Read Article",
      "read-column": "Read Column",
      "footer-copy": "&copy; 2026 Güldeste Altay. All Rights Reserved."
    }
  };

  // State
  let activeLang = localStorage.getItem('lang') || 'tr';

  // Helper: Title Case Converter with Turkish Support & Acronym Protection
  function toTitleCase(str, lang = 'tr') {
    if (!str) return '';
    
    const minorWordsTR = ['ve', 'veya', 'ile', 'de', 'da', 'ki', 'ama', 'fakat', 'ise', 'adlı'];
    const minorWordsEN = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'by', 'from', 'in', 'of', 'to', 'with', 'is', 'are'];
    const acronyms = ['TL', 'GTE', 'GPT', 'NTV', 'YT', 'US', 'UK', 'USA', 'EU', 'AI', 'SPA', 'YTÜ', 'CHATGPT', 'YARE', 'CHAT'];
    
    const minorWords = lang === 'en' ? minorWordsEN : minorWordsTR;
    const locale = lang === 'en' ? 'en-US' : 'tr-TR';
    
    const lowerStr = str.toLocaleLowerCase(locale);
    const words = lowerStr.split(/\s+/);
    
    const capitalizedWords = words.map((word, index) => {
      if (!word) return '';
      
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"']/g, "");
      const cleanUpper = cleanWord.toLocaleUpperCase(locale);
      
      if (acronyms.includes(cleanUpper)) {
        return word.toLocaleUpperCase(locale);
      }
      
      if (minorWords.includes(cleanWord) && index !== 0 && index !== words.length - 1) {
        return word;
      }
      
      let firstCharIndex = 0;
      while (firstCharIndex < word.length && !/[a-zA-ZçÇğĞıİöÖşŞüÜ]/.test(word[firstCharIndex])) {
        firstCharIndex++;
      }
      
      if (firstCharIndex >= word.length) {
        return word;
      }
      
      const prefix = word.substring(0, firstCharIndex);
      const charToCapitalize = word[firstCharIndex];
      const suffix = word.substring(firstCharIndex + 1);
      
      return prefix + charToCapitalize.toLocaleUpperCase(locale) + suffix;
    });
    
    return capitalizedWords.join(' ');
  }

  // ==========================================
  // 1. DATA INITIALIZATION & SELECTION
  // ==========================================
  
  // Articles for Slider (Ordered: 9, 14, 1, 5)
  const SLIDER_IDS = [9, 14, 1, 5];
  const sliderArticles = SLIDER_IDS.map(id => ARTICLES_DATA.find(art => art.id === id)).filter(Boolean);
  
  // Standard News (All articles except columns)
  const newsArticles = ARTICLES_DATA.filter(art => art.category !== "Köşe Yazısı");
  
  // Column Articles (category: "Köşe Yazısı")
  const columnArticles = ARTICLES_DATA.filter(art => art.category === "Köşe Yazısı");

  // Reordering for Haberler (News Archive) page: Slider articles first, then the rest
  const sliderIdsSet = new Set(SLIDER_IDS);
  const orderedNewsArticles = [
    ...sliderArticles,
    ...newsArticles.filter(art => !sliderIdsSet.has(art.id))
  ];

  // Reordering for Homepage Latest News Grid: First two are ID 7 ("Bu Lokanta Evsizlere...") and ID 8 ("Üniversite Öğrencileri...")
  const FIRST_TWO_HOME_IDS = [7, 8];
  const firstTwoHomeArticles = FIRST_TWO_HOME_IDS.map(id => ARTICLES_DATA.find(art => art.id === id)).filter(Boolean);
  const remainingHomeNews = newsArticles.filter(art => !FIRST_TWO_HOME_IDS.includes(art.id));
  const homeNewsArticles = [
    ...firstTwoHomeArticles,
    ...remainingHomeNews
  ];

  
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
  // LANGUAGE SWITCHING & DOM LOCALIZATION
  // ==========================================
  function updateLanguageUI() {
    // 1. Text elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[activeLang] && TRANSLATIONS[activeLang][key]) {
        el.innerHTML = TRANSLATIONS[activeLang][key];
      }
    });

    // 2. Input placeholders with data-i18n-placeholder
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      if (TRANSLATIONS[activeLang] && TRANSLATIONS[activeLang][key]) {
        input.placeholder = TRANSLATIONS[activeLang][key];
      }
    });

    // 3. Accessibility labels with data-i18n-aria-label
    const ariaElements = document.querySelectorAll('[data-i18n-aria-label]');
    ariaElements.forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (TRANSLATIONS[activeLang] && TRANSLATIONS[activeLang][key]) {
        el.setAttribute('aria-label', TRANSLATIONS[activeLang][key]);
      }
    });

    // 4. Document Lang Attribute
    document.documentElement.lang = activeLang;
  }

  // Update switcher buttons class active
  function updateLangButtonsActive() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === activeLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Event Listeners for language switches (header & footer)
  const langSwitchButtons = document.querySelectorAll('.lang-btn');
  langSwitchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang !== activeLang) {
        activeLang = selectedLang;
        localStorage.setItem('lang', activeLang);
        
        updateLangButtonsActive();
        updateLanguageUI();
        
        // Re-render dynamic elements
        renderSlider();
        renderGrid(latestNewsGrid, homeNewsArticles.slice(0, 6));
        renderGrid(allNewsGrid, orderedNewsArticles);
        renderColumns();
        renderBentoColumnist();
        
        // Refresh article drawer if open
        if (activeArticleId) {
          openArticle(activeArticleId);
        }
        
        // Clear search inputs
        if (searchInput) searchInput.value = '';
        if (columnSearchInput) columnSearchInput.value = '';
      }
    });
  });

  // Initialize Language on load
  updateLangButtonsActive();
  updateLanguageUI();

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
      const displayTitle = toTitleCase(activeLang === 'en' ? art.title_en : art.title, activeLang);
      const displayCategory = activeLang === 'en' ? art.category_en : art.category;
      
      const queueItem = document.createElement('div');
      queueItem.className = `queue-item ${index === 0 ? 'active' : ''}`;
      queueItem.innerHTML = `
        <div class="queue-item-thumb">
          <img src="${img}" alt="${displayTitle}">
        </div>
        <div class="queue-item-meta">
          <span class="queue-item-category">${displayCategory}</span>
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
    const displayTitle = toTitleCase(activeLang === 'en' ? art.title_en : art.title, activeLang);
    const displayCategory = activeLang === 'en' ? art.category_en : art.category;
    
    const sliderMainDisplay = document.getElementById('sliderMainDisplay');
    if (sliderMainDisplay) {
      sliderMainDisplay.innerHTML = `
        <div class="slide-main-item slide-art-${art.id}">
          <img src="${img}" class="slide-main-img" alt="${displayTitle}">
          <div class="slide-main-overlay"></div>
          <div class="slide-main-content">
            <span class="slide-main-category">${displayCategory}</span>
            <h1 class="slide-main-title">${displayTitle}</h1>
            <button class="slide-main-btn" data-id="${art.id}">${TRANSLATIONS[activeLang]["read-article"]}</button>
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
    window.location.hash = 'belgesel-detay';
  });

  viewDocLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'belgesel-detay';
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
          <p>${TRANSLATIONS[activeLang]["no-news-found"]}</p>
        </div>
      `;
      return;
    }

    articles.forEach(art => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.setAttribute('data-id', art.id);
      
      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/cropped-ee95c1ad-4216-4474-9ebd-9be6fbd2345d.jpg';
      const paragraphs = activeLang === 'en' ? art.paragraphs_en : art.paragraphs;
      const cleanExcerpt = paragraphs[0] ? paragraphs[0].substring(0, 120) + '...' : '';
      
      const displayTitle = toTitleCase(activeLang === 'en' ? art.title_en : art.title, activeLang);
      const displayCategory = activeLang === 'en' ? art.category_en : art.category;
      
      let titleStyle = '';
      if (displayTitle.length > 90) {
        titleStyle = 'style="font-size: 1.02rem; line-height: 1.3;"';
      } else if (displayTitle.length > 60) {
        titleStyle = 'style="font-size: 1.15rem; line-height: 1.3;"';
      }
      
      const dateHtml = formatDate(art.date) ? `<div class="card-meta">${formatDate(art.date)}</div>` : '';
      card.innerHTML = `
        <div class="card-img-container">
          <img src="${img}" class="card-img" alt="${displayTitle}" loading="lazy">
          <span class="card-category">${displayCategory}</span>
        </div>
        <div class="card-content">
          ${dateHtml}
          <h3 class="card-title" ${titleStyle}>${displayTitle}</h3>
          <p class="card-excerpt">${cleanExcerpt}</p>
          <span class="card-footer-link">
            <span>${TRANSLATIONS[activeLang]["read-article"]}</span>
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
      renderGrid(allNewsGrid, orderedNewsArticles);
      return;
    }

    const filtered = orderedNewsArticles.filter(art => {
      const title = activeLang === 'en' ? art.title_en : art.title;
      const paragraphs = activeLang === 'en' ? art.paragraphs_en : art.paragraphs;
      const inTitle = title.toLowerCase().includes(query);
      const inBody = paragraphs.some(p => p.toLowerCase().includes(query));
      return inTitle || inBody;
    });

    renderGrid(allNewsGrid, filtered);
  });

  // Render initial news lists
  renderGrid(latestNewsGrid, homeNewsArticles.slice(0, 6)); // First 2 are ID 7, 8 on Anasayfa
  renderGrid(allNewsGrid, orderedNewsArticles); // Slider articles first, then the rest on Haberler archive page

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
          <p style="text-align: center; color: var(--text-secondary);">${TRANSLATIONS[activeLang]["no-columns-found"]}</p>
        </div>
      `;
      return;
    }
    
    targetArticles.forEach(art => {
      const card = document.createElement('div');
      card.className = 'column-card';
      card.setAttribute('data-id', art.id);

      const img = art.featured_image || 'https://destealtay.wordpress.com/wp-content/uploads/2024/01/adobestock_311795109_preview.jpeg?w=1000';
      const paragraphs = activeLang === 'en' ? art.paragraphs_en : art.paragraphs;
      const cleanExcerpt = paragraphs[0] ? paragraphs[0].substring(0, 180) + '...' : '';
      
      const displayTitle = toTitleCase(activeLang === 'en' ? art.title_en : art.title, activeLang);

      const dateHtml = formatDate(art.date) ? `<div class="card-meta">${formatDate(art.date)}</div>` : '';
      card.innerHTML = `
        <img src="${img}" class="column-card-img" alt="${displayTitle}" loading="lazy">
        <div class="column-card-content">
          ${dateHtml}
          <h3 class="card-title" style="font-size: 1.6rem; margin-bottom: 8px;">${displayTitle}</h3>
          <p class="card-excerpt" style="margin-bottom: 16px;">${cleanExcerpt}</p>
          <span class="card-footer-link">
            <span>${TRANSLATIONS[activeLang]["read-column"]}</span>
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
        const title = activeLang === 'en' ? art.title_en : art.title;
        const paragraphs = activeLang === 'en' ? art.paragraphs_en : art.paragraphs;
        const inTitle = title.toLowerCase().includes(query);
        const inBody = paragraphs.some(p => p.toLowerCase().includes(query));
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
    const paragraphs = activeLang === 'en' ? latestColumn.paragraphs_en : latestColumn.paragraphs;
    const cleanExcerpt = paragraphs[0] ? paragraphs[0].substring(0, 180) + '...' : '';
    
    const displayTitle = toTitleCase(activeLang === 'en' ? latestColumn.title_en : latestColumn.title, activeLang);

    const dateHtml = formatDate(latestColumn.date) ? `<div class="card-meta">${formatDate(latestColumn.date)}</div>` : '';
    card.innerHTML = `
      <img src="${img}" class="column-card-img" alt="${displayTitle}" loading="lazy">
      <div class="column-card-content">
        ${dateHtml}
        <h3 class="card-title" style="font-size: 1.6rem; margin-bottom: 8px;">${displayTitle}</h3>
        <p class="card-excerpt" style="margin-bottom: 16px;">${cleanExcerpt}</p>
        <span class="card-footer-link">
          <span>${TRANSLATIONS[activeLang]["read-column"]}</span>
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
    
    const displayTitle = toTitleCase(activeLang === 'en' ? art.title_en : art.title, activeLang);
    const imgElement = art.featured_image ? `
      <div class="drawer-img-container">
        <img src="${art.featured_image}" alt="${displayTitle}">
      </div>
    ` : '';
    
    const paragraphs = activeLang === 'en' ? art.paragraphs_en : art.paragraphs;
    const bodyParagraphs = paragraphs.map(p => `<p>${p}</p>`).join('');

    const dateHtml = formatDate(art.date) ? `<span>${TRANSLATIONS[activeLang]["drawer-pub-date"]}: ${formatDate(art.date)}</span><span>&bull;</span>` : '';
    const displayCategory = activeLang === 'en' ? art.category_en : art.category;
    
    drawerBody.innerHTML = `
      <div class="drawer-meta">${displayCategory}</div>
      <h1 class="drawer-title">${displayTitle}</h1>
      <div class="drawer-pub-meta">
        ${dateHtml}
        <span>${TRANSLATIONS[activeLang]["drawer-author"]}</span>
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
      btnSpan.innerText = TRANSLATIONS[activeLang]["drawer-link-copied"];
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
    formSubmitBtn.querySelector('span').innerText = TRANSLATIONS[activeLang]["contact-form-sending"];

    // Simulate network delay
    setTimeout(() => {
      // Show success msg
      formSuccessMsg.innerText = TRANSLATIONS[activeLang]["contact-form-success"];
      formSuccessMsg.style.display = 'block';
      
      // Reset button
      formSubmitBtn.disabled = false;
      formSubmitBtn.querySelector('span').innerText = TRANSLATIONS[activeLang]["contact-form-submit"];
      
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
      return d.toLocaleDateString(activeLang === 'en' ? 'en-US' : 'tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return isoString;
    }
  }
});
