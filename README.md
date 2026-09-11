# IBAP-RJ – Site Institucional (Redesign 2026)

Site institucional moderno e responsivo do Instituto Brasileiro de Administração Pública e Apoio Universitário do Rio de Janeiro.

## 🎯 Sobre

Redesign da página inicial com foco em modernidade, interatividade e clareza institucional. Construído com HTML5, CSS3 e JavaScript vanilla — sem dependências externas.

**Stack:** HTML5 semântico + CSS nativo + JavaScript vanilla  
**Responsividade:** Celular (320px) a TV (2560px+)  
**Acessibilidade:** WCAG AA (navegação por teclado, ARIA labels, contraste)  
**Performance:** Sem frameworks; carregamento rápido  

## 📁 Estrutura

```
ibap-rj-site/
├── index.html           # Página principal
├── css/
│   └── style.css        # Estilos (1615 linhas, organizados por seção)
├── js/
│   └── script.js        # Interatividade vanilla (337 linhas)
├── images/              # Logos e assets (a preencher)
└── README.md            # Este arquivo
```

## 🚀 Como usar

### Visualizar localmente

Abra `index.html` num navegador. Não precisa de servidor local.

Ou, com um servidor simples (Python):
```bash
python3 -m http.server 8000
# Acesse http://localhost:8000
```

### Publicar na web

1. Clone ou faça download do repositório
2. Baixe as imagens do acervo IBAP-RJ (veja `images/LEIA-ME.txt`)
3. Atualize os caminhos de imagem em `index.html`
4. Suba para seu servidor

## ✨ Funcionalidades

- **Menu responsivo:** Hamburger em celular, navbar completa em desktop; suporte total a teclado
- **Carrosséis:** Scroll-snap nativo com botões, setas e indicadores
- **Abas interativas:** 8 núcleos de atuação em formato de tabs
- **Animações discretas:** Reveal no scroll, entrada orquestrada do hero, faixas de logos
- **Contadores:** Animação suave até o número final
- **Acesso rápido:** Atalhos de transparência, editais, contracheque no topo
- **Clientes e parceiros:** Logos em rolagem contínua com pausa

## ♿ Acessibilidade

- Navegação por teclado completa
- Focus visível em todos os elementos interativos
- Atributos ARIA para menus, abas, modais, etc.
- Textos alternativos em imagens
- Contraste WCAG AA
- Respeita `prefers-reduced-motion` do sistema

## 📱 Responsividade testada

| Resolução | Dispositivo |
|---|---|
| 320×640 | Celular pequeno |
| 390×844 | Celular padrão |
| 768×1024 | Tablet |
| 1024×768 | Tablet paisagem |
| 1366×768 | Notebook |
| 1920×1080 | Desktop |
| 2560×1440 | TV/Monitor grande |

Sem overflow horizontal. Sem texto cortado. Todos os controles acessíveis.

## 🎨 Customização

Cores, fontes e espaçamentos estão em variáveis CSS no topo de `style.css`:

```css
:root {
    --azul-950: #0a1d33;
    --azul-900: #0e2a47;
    --azul-700: #1d4e7e;
    --verde-600: #17785a;
    /* ... mais cores */
}
```

Altere os valores hex e a página inteira se adapta.

## 🔧 JavaScript – O que faz cada função

| Função | Responsabilidade |
|---|---|
| `initHeader()` | Sombra no cabeçalho ao scroll |
| `initMenu()` | Menu hamburger, foco, Esc |
| `initScrollSpy()` | Destaca link do menu conforme seção visível |
| `initCarousels()` | Botões, setas, indicadores dos carrosséis |
| `initTabs()` | Abas das linhas de atuação (WAI-ARIA) |
| `initCounters()` | Anima números ao entrar na viewport |
| `initLogoMarquee()` | Faixas de logos em rolagem contínua |
| `initReveal()` | Revelaçãosuave de blocos ao scroll |
| `initBackToTop()` | Botão voltar ao topo |
| `initYear()` | Preenche ano no rodapé |

## 📝 Conteúdo

- **Hero:** Proposta do instituto + carrossel de destaques
- **Números:** Dados principais (fundação, núcleos, clientes, parcerias)
- **Quem somos:** Missão e 3 pilares (consultoria, RSA, certificações)
- **Linhas de atuação:** 8 núcleos em abas interativas
- **Projetos:** Carrossel com 5 projetos em destaque
- **Boletim:** Artigos recentes do Núcleo de Governança
- **Vagas:** Oportunidades de trabalho (monitor e PCD)
- **Clientes e parceiros:** Logos em rolagem contínua (2 categorias)
- **Contato:** Formas de falar com o instituto
- **Rodapé:** Links de navegação, transparência, área restrita

## ⚠️ Notas antes de publicar

1. **Resumos dos núcleos (linhas 345–425 no HTML):** Foram escritos a partir dos nomes e projetos do site atual. A equipe deve revisar e aprovar.

2. **Cores:** Escolhi azul instituci onal (#0e2a47) + verde (#17785a), mas puxe as cores oficiais da marca se forem diferentes.

3. **Imagens:** 
   - Logo, banners e fotos de clientes estão apontando para `ibap-rj.org.br/wp-content/uploads/...`
   - Para independência do WordPress, baixe para `images/` e atualize os caminhos
   - Veja `images/LEIA-ME.txt` para detalhes

4. **Dois links com ressalvas:**
   - Contracheque: usa `http://` + IP (sem HTTPS). Mantive como está, mas avise a TI.
   - Email de contato: "contato@" vs "ibap-rj@". Usei "ibap-rj@" (rodapé), confirme qual é a correta.

5. **Sem dependências externas:**
   - Fontes vindas de `fonts.googleapis.com` (Public Sans, Source Serif 4)
   - Se precisar hospedar as fontes, download de Google Fonts + atualize os `@import` no CSS

## 📜 Licença

Todos os componentes, estilos e lógica são propriedade do IBAP-RJ.

## 👥 Contato

Para dúvidas sobre o código ou customizações:
- Email: ibap-rj@ibap-rj.org.br
- Telefone: (21) 3806-1000

---

**Versão:** 1.0  
**Data:** Setembro 2026  
**Construído com:** HTML5 + CSS3 + JS Vanilla
