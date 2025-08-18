#!/bin/bash

# Script pour créer un nouveau projet dans le portfolio
# Usage: ./create-project.sh <nom-du-projet>

# Configuration des langues supportées
LANGUAGES=("en" "fr")

# Vérification des paramètres
if [ $# -eq 0 ]; then
    echo "❌ Erreur: Veuillez fournir un nom de projet"
    echo "Usage: ./create-project.sh <nom-du-projet>"
    exit 1
fi

PROJECT_NAME="$1"
PROJECT_SLUG=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

echo "🚀 Création du projet: $PROJECT_NAME"
echo "📁 Slug du projet: $PROJECT_SLUG"

# Chemins des dossiers
CONTENT_DIR="./content/projects/$PROJECT_SLUG"
IMAGES_DIR="./public/images/projects/$PROJECT_SLUG"

# Vérifier si le projet existe déjà
if [ -d "$CONTENT_DIR" ] || [ -d "$IMAGES_DIR" ]; then
    echo "❌ Erreur: Le projet '$PROJECT_SLUG' existe déjà!"
    exit 1
fi

echo "📂 Création de la structure de contenu..."

# Créer la structure de contenu pour chaque langue
for lang in "${LANGUAGES[@]}"; do
    mkdir -p "$CONTENT_DIR/$lang"
done

# Créer meta.json
cat > "$CONTENT_DIR/meta.json" << EOF
{
  "name": "$PROJECT_NAME",
  "date": "$(date +%Y-%m)",
  "large": false,
  "featured": false,
  "cardTheme": "light",
  "cardImages": {
    "default": {
      "src": "/images/projects/$PROJECT_SLUG/card.png",
      "srcMobile": "/images/projects/$PROJECT_SLUG/card-mobile.png"
    },
    "large": {
      "src": "/images/projects/$PROJECT_SLUG/card-large.png",
      "srcMobile": "/images/projects/$PROJECT_SLUG/card-mobile-large.png"
    }
  },
  "website": "",
  "figma": "",
  "github": "",
  "techStack": [
    "tailwindcss"
  ]
}
EOF

# Créer carousel.json
cat > "$CONTENT_DIR/carousel.json" << EOF
{
  "images": [
    {
      "src": "/images/projects/$PROJECT_SLUG/carousel/screenshot-1.png",
      "alt": {
        "en": "Main interface of $PROJECT_NAME",
        "fr": "Interface principale de $PROJECT_NAME"
      }
    }
  ]
}
EOF

# Créer les fichiers markdown pour chaque langue
for lang in "${LANGUAGES[@]}"; do
    if [ "$lang" = "en" ]; then
        # Fichiers EN
        cat > "$CONTENT_DIR/$lang/description.md" << EOF
This is the description of $PROJECT_NAME. Please update this content with the actual project description.

Add details about what the project does, its purpose, and key features.
EOF

        cat > "$CONTENT_DIR/$lang/main-functionnalities.md" << EOF
- Main functionality 1
- Main functionality 2
- Main functionality 3
EOF

        cat > "$CONTENT_DIR/$lang/my-role.md" << EOF
As the developer of this project, I was responsible for:

- Design and development
- Technical architecture
- Implementation of key features
EOF
    elif [ "$lang" = "fr" ]; then
        # Fichiers FR
        cat > "$CONTENT_DIR/$lang/description.md" << EOF
Ceci est la description de $PROJECT_NAME. Veuillez mettre à jour ce contenu avec la description réelle du projet.

Ajoutez des détails sur ce que fait le projet, son objectif et ses fonctionnalités clés.
EOF

        cat > "$CONTENT_DIR/$lang/main-functionnalities.md" << EOF
- Fonctionnalité principale 1
- Fonctionnalité principale 2
- Fonctionnalité principale 3
EOF

        cat > "$CONTENT_DIR/$lang/my-role.md" << EOF
En tant que développeur de ce projet, j'étais responsable de :

- Conception et développement
- Architecture technique
- Implémentation des fonctionnalités clés
EOF
    fi
done

echo "🖼️  Création de la structure d'images..."

# Créer la structure d'images (dossiers seulement)
mkdir -p "$IMAGES_DIR/carousel"

echo ""
echo "✅ Projet '$PROJECT_NAME' créé avec succès!"
echo ""
echo "📁 Structure créée:"
echo "   └── $CONTENT_DIR/"
echo "       ├── meta.json"
echo "       ├── carousel.json"
for lang in "${LANGUAGES[@]}"; do
    echo "       ├── $lang/"
    echo "       │   ├── description.md"
    echo "       │   ├── main-functionnalities.md"
    echo "       │   └── my-role.md"
done
echo ""
echo "   └── $IMAGES_DIR/"
echo "       └── carousel/ (dossier vide)"
echo ""
echo "🔧 Prochaines étapes:"
echo "1. Ajoutez vos images dans $IMAGES_DIR/ (card.png, card-mobile.png, card-large.png, card-mobile-large.png)"
echo "2. Mettez à jour le contenu dans $CONTENT_DIR/"
echo "3. Modifiez meta.json avec les bonnes informations"
echo "4. Ajoutez vos captures d'écran dans carousel/ et mettez à jour carousel.json"
echo ""
echo "🎉 Votre projet est prêt à être personnalisé!"
