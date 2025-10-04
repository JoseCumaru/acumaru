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
});
