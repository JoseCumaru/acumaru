// Função para carregar componentes HTML
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar ${componentPath}: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error('Erro ao carregar componente:', error);
  }
}

// Carregar todos os componentes quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
  // Carregar componentes
  await loadComponent('header-placeholder', 'components/header.html');
  await loadComponent('footer-placeholder', 'components/footer.html');
  await loadComponent('cards-placeholder', 'components/cards.html');
  await loadComponent('whatsapp-placeholder', 'components/whatsapp-button.html');
  
  // Reinicializar ícones do Lucide após carregar os cards
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Inicializar funcionalidade do menu hambúrguer após carregar o header
  initMobileMenu();
  
  // Atualizar o ano no rodapé
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});

// Função para inicializar o menu mobile
function initMobileMenu() {
  const menuToggleButton = document.getElementById('menu-toggle-button');
  const mainNav = document.getElementById('main-nav');

  function closeMobileMenu() {
    if (mainNav) {
      mainNav.classList.remove('mobile-menu-open');
    }
    if (menuToggleButton) {
      menuToggleButton.setAttribute('aria-expanded', 'false');
      const icon = menuToggleButton.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      menuToggleButton.setAttribute('aria-label', 'Abrir menu');
    }
  }

  function openMobileMenu() {
    if (mainNav) {
      mainNav.classList.add('mobile-menu-open');
    }
    if (menuToggleButton) {
      menuToggleButton.setAttribute('aria-expanded', 'true');
      const icon = menuToggleButton.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
      menuToggleButton.setAttribute('aria-label', 'Fechar menu');
    }
  }

  if (menuToggleButton && mainNav) {
    menuToggleButton.addEventListener('click', (event) => {
      event.stopPropagation(); 
      const isMenuOpen = mainNav.classList.contains('mobile-menu-open');
      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('mobile-menu-open')) {
          closeMobileMenu();
        }
      });
    });

    document.addEventListener('click', (event) => {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggleButton = menuToggleButton.contains(event.target);

      if (mainNav.classList.contains('mobile-menu-open') && !isClickInsideNav && !isClickOnToggleButton) {
        closeMobileMenu();
      }
    });

    mainNav.addEventListener('click', (event) => {
        event.stopPropagation();
    });
  }
}
