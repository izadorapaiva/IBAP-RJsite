#!/bin/bash
# 📤 IBAP-RJ Site – Comandos para push no GitHub
# Cole esses comandos no seu terminal (dentro da pasta ibap-rj-site/)

# Copie a URL do seu repositório (ex: https://github.com/IBAP-RJ/ibap-rj-site.git)
REPO_URL="https://github.com/IBAP-RJ/ibap-rj-site.git"

echo "🚀 Inicializando repositório Git..."

# Se é a primeira vez
git init
git add .
git commit -m "feat: inicial - site institucional redesign 2026

- Hero com proposta e carrossel de destaques
- 8 núcleos em abas interativas
- Carrosséis responsivos com scroll-snap
- Contadores animados
- Menu hamburger acessível
- Clientes e parceiros em rolagem contínua
- Totalmente responsivo (320px a 2560px)
- WCAG AA (acessibilidade)
- Sem dependências externas"

# Renomear branch para main
git branch -M main

# Adicionar repositório remoto
git remote add origin "$REPO_URL"

# Fazer push
git push -u origin main

echo "✅ Pronto! Site enviado para $REPO_URL"
echo ""
echo "Próximos commits:"
echo "  git add ."
echo "  git commit -m 'seu-mensagem-aqui'"
echo "  git push"
