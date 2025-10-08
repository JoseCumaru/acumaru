# Estrutura de Componentes - Acumaru Consultoria Ambiental

## 📁 Estrutura do Projeto

Este projeto foi modularizado para facilitar a manutenção e reutilização de código. Os componentes HTML foram separados em arquivos individuais na pasta `components/`.

### Estrutura de Pastas:
```
acumaru/
├── index.html              # Página principal (agora modularizada)
├── components/             # Componentes reutilizáveis
│   ├── header.html        # Cabeçalho com navegação
│   ├── footer.html        # Rodapé com informações e links
│   ├── cards.html         # Cards de serviços
│   └── whatsapp-button.html # Botão flutuante do WhatsApp
├── css/
│   └── style.css          # Estilos globais
├── js/
│   ├── components-loader.js # Carregador de componentes
│   └── script.js          # Scripts principais
├── assets/                # Imagens e recursos
└── services/              # Páginas de serviços individuais
```

## 🧩 Componentes

### 1. Header (`components/header.html`)
**Descrição:** Cabeçalho do site com logo, navegação e menu hambúrguer para mobile.

**Conteúdo:**
- Logo Acumaru
- Menu de navegação (Sobre, Serviços, Por que Acumaru, Contatos)
- Botão de menu mobile

**Uso:** Carregado automaticamente no placeholder `#header-placeholder`

---

### 2. Footer (`components/footer.html`)
**Descrição:** Rodapé com informações da empresa, links rápidos e redes sociais.

**Conteúdo:**
- Logo e descrição da empresa
- Links rápidos para seções
- Informações de contato
- Ícones de redes sociais (LinkedIn, Instagram)
- Copyright dinâmico

**Uso:** Carregado automaticamente no placeholder `#footer-placeholder`

---

### 3. Cards (`components/cards.html`)
**Descrição:** Cards de serviços oferecidos pela Acumaru.

**Conteúdo:**
- PGRS (Plano de Gerenciamento de Resíduos Sólidos)
- Licenciamento Ambiental
- Programas Ambientais
- Laudos e Pareceres Técnicos
- Certidão de Viabilidade Ambiental

**Uso:** Carregado automaticamente no placeholder `#cards-placeholder`

---

### 4. WhatsApp Button (`components/whatsapp-button.html`)
**Descrição:** Botão flutuante do WhatsApp com estilos inline.

**Conteúdo:**
- Botão fixo no canto inferior direito
- Link direto para WhatsApp
- Estilos CSS incluídos

**Uso:** Carregado automaticamente no placeholder `#whatsapp-placeholder`

---

## 🔧 Como Funciona

### Carregamento de Componentes

O arquivo `js/components-loader.js` é responsável por carregar todos os componentes dinamicamente:

```javascript
// Função que busca e insere o HTML dos componentes
async function loadComponent(elementId, componentPath) {
  const response = await fetch(componentPath);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}
```

### Ordem de Carregamento

1. **components-loader.js** - Carrega primeiro (antes do script.js)
2. **Componentes HTML** - Carregados via fetch
3. **Lucide Icons** - Reinicializados após carregar os componentes
4. **script.js** - Inicializa funcionalidades (menu, tabs, etc.)

---

## 📝 Como Usar os Componentes

### No index.html:

```html
<!-- Adicione um placeholder onde deseja inserir o componente -->
<div id="nome-do-placeholder"></div>
```

### No components-loader.js:

```javascript
await loadComponent('nome-do-placeholder', 'components/arquivo.html');
```

---

## ✅ Benefícios da Modularização

1. **Manutenção Facilitada:** Altere um componente uma vez, reflita em todo o site
2. **Reutilização:** Use os mesmos componentes em múltiplas páginas
3. **Organização:** Código mais limpo e organizado
4. **Colaboração:** Diferentes desenvolvedores podem trabalhar em componentes diferentes
5. **Performance:** Componentes podem ser carregados sob demanda

---

## 🚀 Próximos Passos Recomendados

1. **Aplicar componentes nas páginas de serviços:**
   - `services/pgrs.html`
   - `services/licenciamento.html`
   - `services/programas.html`
   - `services/laudos.html`
   - `services/viabilidade.html`

2. **Criar mais componentes:**
   - `hero-section.html` - Seção hero
   - `sobre-section.html` - Seção sobre
   - `porque-acumaru-section.html` - Seção "Por que Acumaru"
   - `contato-section.html` - Seção de contato

3. **Otimizações:**
   - Minificar CSS e JS para produção
   - Adicionar lazy loading para imagens
   - Implementar cache para componentes

---

## 🔍 Testando

Para testar localmente, use um servidor local (não funciona abrindo diretamente o arquivo HTML):

### Opção 1: Live Server (VS Code)
```bash
# Instale a extensão Live Server no VS Code
# Clique com botão direito no index.html > "Open with Live Server"
```

### Opção 2: Python
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Opção 3: Node.js (http-server)
```bash
npx http-server
# Acesse: http://localhost:8080
```

---

## 📧 Contato

**Acumaru Consultoria Ambiental**
- Email: adrianescumaru@gmail.com
- WhatsApp: +55 48 98853-6486

---

## 📄 Licença

© 2025 Acumaru Consultoria Ambiental. Todos os direitos reservados.
