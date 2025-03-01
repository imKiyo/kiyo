// Create this file as src/scripts/site-enhancements.js

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  setupThemeToggle();
  
  // Scroll animations
  setupScrollAnimations();
  
  // Scroll progress indicator
  setupScrollProgress();
  
  // Back to top button
  setupBackToTop();
});

function setupThemeToggle() {
  // Create the theme toggle button
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  document.body.appendChild(themeToggle);
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    updateThemeIcon(themeToggle, 'light');
  }
  
  themeToggle.addEventListener('click', () => {
    const isLightTheme = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    updateThemeIcon(themeToggle, isLightTheme ? 'light' : 'dark');
  });
}

function updateThemeIcon(themeToggle, theme) {
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  
  themeToggle.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

function setupScrollAnimations() {
  const elementsToAnimate = [
    { selector: '.intro', className: 'animate-slide-left', offset: 50 },
    { selector: '.profile', className: 'animate-slide-right', offset: 50 },
    { selector: '.skill-card', className: 'animate-slide-up', offset: 150 },
    { selector: '.timeline-item', className: 'animate-slide-left', offset: 150 },
    { selector: '.project-card', className: 'animate-slide-up', offset: 150 },
    { selector: '.contact-info', className: 'animate-slide-left', offset: 150 },
    { selector: '.contact-form', className: 'animate-slide-right', offset: 150 }
  ];
  
  // Remove initial animations to prevent flashing
  elementsToAnimate.forEach(item => {
    document.querySelectorAll(item.selector).forEach(el => {
      el.style.opacity = '0';
    });
  });
  
  // Create an intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.dataset.animation);
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  
  // Observe elements
  elementsToAnimate.forEach(item => {
    document.querySelectorAll(item.selector).forEach(el => {
      el.dataset.animation = item.className;
      observer.observe(el);
    });
  });
}

function setupScrollProgress() {
  // Create scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = `${scrollPercentage}%`;
  });
}

function setupBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(backToTop);
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}
