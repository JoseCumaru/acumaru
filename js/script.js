// Função para controlar as abas
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // Encontra o container pai das abas para limitar o escopo da busca
  var parentTabsContainer = null;
  if (evt && evt.currentTarget) {
    parentTabsContainer = evt.currentTarget.closest('.tabs-container-wrapper');
  } else {
    const activeTabElement = document.getElementById(tabName);
    if (activeTabElement) {
      parentTabsContainer = activeTabElement.closest('.tabs-container-wrapper');
    }
  }

  if (!parentTabsContainer) return; 

  tabcontent = parentTabsContainer.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  tablinks = parentTabsContainer.parentElement.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  const currentTab = document.getElementById(tabName);
  if (currentTab) {
    currentTab.style.display = "block";
    currentTab.classList.add("active");
  }
  
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  } else if (tablinks.length > 0) {

    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].getAttribute('onclick').includes(tabName)) {
            tablinks[i].classList.add('active');
            break;
        }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: false 
  });

  // Funcionalidade do Menu Hambúrguer
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


  const firstActiveTabButton = document.querySelector('#porque-acumaru .tab-link.active');
  if (firstActiveTabButton) {
    // Extrai o ID da aba do atributo onclick
    const onclickAttribute = firstActiveTabButton.getAttribute('onclick');
    const tabIdMatch = onclickAttribute ? onclickAttribute.match(/'([^']+)'/g) : null;
    if (tabIdMatch && tabIdMatch.length > 1) {
        const tabId = tabIdMatch[1].replace(/'/g, '');
        if (document.getElementById(tabId)) {
            openTab(null, tabId); 
        }
    }
  }


  // Atualizar o ano no rodapé
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Inicializar Lucide Icons (se você estiver usando)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
