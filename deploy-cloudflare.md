# Cloudflare Pages Deployment - Step by Step

## 🚨 SOLUTION FOR INTERNAL ERROR

The internal error occurs because Cloudflare Pages is confused by the multi-module structure. Here's how to fix it:

## Option 1: Single Module Deployment (EASIEST - START HERE)

### Deploy Only the Buyer Module First

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com/
2. **Pages → Create a project → Connect to Git**
3. **Select Repository**: `mdmoto/web`
4. **Configure as follows**:

```
Project name: maollar-buyer
Production branch: master
Framework preset: None
Build command: cd buyer && npm install --legacy-peer-deps && npm run build
Build output directory: buyer/dist
Root directory (path): /
```

**Environment Variables**:
```
NODE_VERSION = 18
NODE_OPTIONS = --max_old_space_size=2048
```

### This Should Work Immediately! ✅

---

## Option 2: Use the Original Multi-Module Build (ADVANCED)

If you want to use the original CF_MODULE setup:

**Use these settings**:
```
Project name: maollar-buyer
Production branch: master
Framework preset: None
Build command: CF_MODULE=buyer npm run build
Build output directory: buyer/dist
Root directory: /
```

**Environment Variables**:
```
CF_MODULE = buyer
NODE_VERSION = 18
NODE_OPTIONS = --max_old_space_size=2048
```

---

## Option 3: Manual Upload (BACKUP PLAN)

If both above fail, you can build locally and upload:

```bash
cd /Users/adam/projects/web-maollar/buyer
npm install --legacy-peer-deps
npm run build
```

Then create a new Cloudflare Pages project and drag-drop the `buyer/dist` folder.

---

## 🎯 RECOMMENDED APPROACH

**Start with Option 1** - it's the most reliable. Once one module works, you can create additional projects for manager, seller, and im using the same pattern.

## Expected Results

- ✅ **Buyer**: https://maollar-buyer.pages.dev
- ✅ **Manager**: https://maollar-manager.pages.dev (create separately)
- ✅ **Seller**: https://maollar-seller.pages.dev (create separately)
- ✅ **IM**: https://maollar-im.pages.dev (create separately)

## Troubleshooting

If build still fails:
1. Check build logs in Cloudflare dashboard
2. Try reducing Node memory: `NODE_OPTIONS = --max_old_space_size=1024`
3. Build locally first to ensure it works
4. Use manual upload as fallback

## Testing

Once deployed, test with:
- Open the deployed URL
- Check browser console for errors
- Use the `api-test.html` page to verify backend connectivity
