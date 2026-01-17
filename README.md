# FocusGram (Icare Lite) - Build iOS IPA via GitHub Actions

Ce dépôt permet de générer une IPA iOS de l'application Icare Lite sans avoir besoin d'un Mac local, en utilisant GitHub Actions.

## 📱 Description

FocusGram/Icare Lite est une version d'Instagram qui bloque les distractions :
- ❌ Reels
- ❌ Explorer  
- ❌ Publicités

## ✅ Ce qui a été configuré

1. **GitHub Actions Workflow** (`.github/workflows/build-ios.yml`)
   - Runner macOS avec Xcode
   - Build automatique
   - Export IPA
   - Upload comme artefact

2. **ExportOptions.plist** (`ios/ExportOptions.plist`)
   - Signature automatique
   - Export en mode development

## 🚧 Fichiers iOS restants à créer

Pour que le workflow fonctionne, vous devez créer ces fichiers dans le dossier `ios/` :

### Structure requise :
```
ios/
├── IcareLite.xcodeproj/
│   └── project.pbxproj
├── IcareLite/
│   ├── IcareLiteApp.swift
│   ├── ContentView.swift
│   ├── WebView.swift
│   ├── InjectedScript.js
│   └── Info.plist
├── ExportOptions.plist ✅ (déjà créé)
└── IcareLite.entitlements
```

## 🔧 Configuration des secrets GitHub

Avant de lancer le workflow, configurez ces secrets dans GitHub :

1. Allez dans **Settings → Secrets and variables → Actions**
2. Ajoutez ces secrets :

| Nom | Description |
|-----|-------------|
| `APPLE_ID` | Votre Apple ID (email) |
| `APPLE_PASSWORD` | Mot de passe Apple ID ou app-specific password |
| `TEAM_ID` | Votre Apple Developer Team ID |

## 🚀 Lancer le build

1. Allez dans l'onglet **Actions**
2. Cliquez sur le workflow **Build iOS IPA**
3. Cliquez sur **Run workflow**
4. Attendez 5-10 minutes
5. Téléchargez l'artefact **IcareLite-IPA**

## 📥 Installation de l'IPA

Installez l'IPA sur votre iPhone avec :
- **AltStore**
- **Sideloadly**  
- **Antigravity**

## 📋 Prochaines étapes

1. Créer le projet Xcode complet avec tous les fichiers Swift
2. Ajouter le script JavaScript injecté
3. Configurer les secrets GitHub
4. Lancer le workflow

## 📄 License

Projet indépendant, non affilié à Meta/Instagram.
