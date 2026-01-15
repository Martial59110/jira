# Configuration Vercel avec SQLite

## ⚠️ Erreur actuelle

```
Error validating datasource `db`: the URL must start with the protocol `file:`.
```

Cette erreur signifie que la variable `DATABASE_URL` sur Vercel n'est pas au bon format.

## ✅ Solution : Configurer DATABASE_URL sur Vercel

### Étape 1 : Aller sur Vercel Dashboard

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `myjira`
3. Allez dans **Settings** → **Environment Variables**

### Étape 2 : Vérifier/Modifier la variable DATABASE_URL

**Le format EXACT pour SQLite doit être :**

```
file:./prisma/dev.db
```

⚠️ **IMPORTANT** :
- Le format doit commencer par `file:`
- Ne pas mettre de guillemets autour de la valeur
- Le chemin est relatif au répertoire du projet

### Étape 3 : Ajouter toutes les variables nécessaires

Ajoutez/modifiez ces variables sur Vercel :

```
DATABASE_URL=file:./prisma/dev.db
```

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
   - Vérifiez que `prisma generate` s'exécute sans erreur

2. **Testez l'application** :
   - Essayez de créer un compte
   - Essayez de vous connecter

3. **Si l'erreur persiste** :
   - Vérifiez que `DATABASE_URL` commence bien par `file:`
   - Vérifiez qu'il n'y a pas d'espaces avant/après la valeur
   - Vérifiez que la variable est bien activée pour **Production**

## 📝 Format DATABASE_URL pour SQLite

Le format correct est **obligatoirement** :

```
file:./chemin/vers/database.db
```

**Exemples valides :**
- `file:./prisma/dev.db` ✅
- `file:./tmp/dev.db` ✅
- `file:/tmp/dev.db` ✅ (chemin absolu)

**Exemples invalides :**
- `postgresql://...` ❌ (format PostgreSQL)
- `./prisma/dev.db` ❌ (manque le préfixe `file:`)
- `file://./prisma/dev.db` ❌ (trop de slashes)

## ⚠️ Limitations de SQLite sur Vercel

- Le système de fichiers est **éphémère**
- Les données peuvent être **perdues** lors des redéploiements
- Pour une vraie persistance, utilisez **PostgreSQL** (Supabase, Vercel Postgres, etc.)
