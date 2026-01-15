# Configuration Vercel avec SQLite

## ⚠️ Erreur actuelle

```
Error code 14: Unable to open the database file
```

Cette erreur signifie que SQLite ne peut pas créer/écrire le fichier de base de données sur Vercel.

## ✅ Solution : Utiliser /tmp pour SQLite

Sur Vercel, le système de fichiers est éphémère. Il faut utiliser le répertoire `/tmp` qui est accessible en écriture.

### Étape 1 : Configurer DATABASE_URL sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `myjira`
3. Allez dans **Settings** → **Environment Variables**

### Étape 2 : Ajouter la variable DATABASE_URL

**Utilisez le répertoire `/tmp` qui est accessible en écriture :**

```
DATABASE_URL=file:/tmp/dev.db
```

⚠️ **IMPORTANT** :
- Utilisez `/tmp` (chemin absolu) et non `./tmp` (chemin relatif)
- Le fichier sera créé automatiquement lors de la première migration
- Les données seront perdues à chaque redéploiement (c'est normal avec SQLite sur Vercel)

### Étape 3 : Ajouter les autres variables

```
NEXTAUTH_SECRET=cuhiuhdijooqkokjiijfjuf
```

```
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

**Pour chaque variable :**
- Cochez **Production**, **Preview**, et **Development**
- Cliquez sur **Save**

### Étape 4 : Redéployer

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **Redeploy**

## 🔍 Vérification

Après le redéploiement :

1. **Vérifiez les logs de build** :
   - Allez dans votre déploiement
   - Cliquez sur **Build Logs**
   - Vérifiez que `prisma migrate deploy` s'exécute sans erreur

2. **Testez l'application** :
   - Essayez de créer un compte
   - Essayez de vous connecter

## 📝 Format DATABASE_URL pour SQLite sur Vercel

**Format recommandé pour Vercel :**

```
file:/tmp/dev.db
```

**Autres options (moins recommandées) :**

- `file:./prisma/dev.db` - Peut ne pas fonctionner si le répertoire n'existe pas
- `file:/tmp/prisma/dev.db` - Nécessite de créer le répertoire d'abord

## ⚠️ Limitations importantes

- **Données éphémères** : Les données SQLite seront perdues à chaque redéploiement
- **Pas de persistance** : SQLite n'est pas adapté pour la production sur Vercel
- **Pour la production** : Utilisez PostgreSQL (Supabase, Vercel Postgres, Neon, etc.)

## 🚀 Alternative recommandée : PostgreSQL

Pour une vraie persistance, migrez vers PostgreSQL :

1. Créez une base de données PostgreSQL (Supabase, Vercel Postgres, etc.)
2. Mettez à jour `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Configurez `DATABASE_URL` avec l'URL PostgreSQL sur Vercel
4. Exécutez les migrations
