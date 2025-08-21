# Cloudflare Pages Deployment Guide for Maollar Web Platform

This guide will help you deploy the Maollar web applications to Cloudflare Pages.

## Prerequisites

1. Cloudflare account (free tier is sufficient)
2. GitHub repository: `mdmoto/web` ✅ (已创建)
3. AWS ECS backend running (configured at `52.33.226.250:8888`) ✅

## Deployment Strategy

We recommend deploying each application as a separate Cloudflare Pages project for better isolation and performance.

## Step-by-Step Deployment

### 1. Access Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Choose **Connect to Git**
4. Select your GitHub repository: `mdmoto/web`

### 2. Deploy Buyer Application (Customer Storefront)

Configure the project:
```
Project name: maollar-buyer
Production branch: master
Build command: CF_MODULE=buyer npm run build
Build output directory: buyer/dist
```

Environment variables:
```
CF_MODULE = buyer
NODE_VERSION = 18
```

### 3. Deploy Manager Application (Admin Panel)

Configure the project:
```
Project name: maollar-manager
Production branch: master
Build command: CF_MODULE=manager npm run build
Build output directory: manager/dist
```

Environment variables:
```
CF_MODULE = manager
NODE_VERSION = 18
```

### 4. Deploy Seller Application (Merchant Dashboard)

Configure the project:
```
Project name: maollar-seller
Production branch: master
Build command: CF_MODULE=seller npm run build
Build output directory: seller/dist
```

Environment variables:
```
CF_MODULE = seller
NODE_VERSION = 18
```

### 5. Deploy IM Application (Instant Messaging)

Configure the project:
```
Project name: maollar-im
Production branch: master
Build command: CF_MODULE=im npm run build
Build output directory: im/dist
```

Environment variables:
```
CF_MODULE = im
NODE_VERSION = 18
```

## Expected Deployment URLs

After deployment, your applications will be available at:

- **🛒 Buyer (Customer)**: `https://maollar-buyer.pages.dev`
- **⚙️ Manager (Admin)**: `https://maollar-manager.pages.dev`
- **🏪 Seller (Merchant)**: `https://maollar-seller.pages.dev`
- **💬 IM (Chat)**: `https://maollar-im.pages.dev`

## Custom Domains (Optional)

You can add custom domains in each project's settings:
- Buyer: `buyer.maollar.com`
- Manager: `admin.maollar.com`
- Seller: `seller.maollar.com`
- IM: `chat.maollar.com`

## Build Configuration Details

Each application uses these key configurations:

### Common Build Settings
- **Framework preset**: None (custom build)
- **Node.js version**: 18
- **Build command**: Uses environment variable `CF_MODULE` to determine which app to build
- **Install command**: `npm install --legacy-peer-deps` (handled automatically by build script)

### API Endpoints
All applications are configured to connect to your AWS ECS backend:
- **API Base URL**: `http://52.33.226.250:8888`
- **WebSocket URL**: `ws://52.33.226.250:8888/lili/webSocket`

## Testing Backend Connectivity

You can test the API connectivity using the included test page:
1. Open `api-test.html` in your browser (located in project root)
2. Test all API endpoints
3. Verify WebSocket connection

### Manual API Test Commands

```bash
# Test backend health
curl -I http://52.33.226.250:8888/health

# Test buyer API
curl http://52.33.226.250:8888/buyer/goods/category

# Test common API
curl http://52.33.226.250:8888/common/common/region/region
```

## Troubleshooting

### Build Failures

If builds fail, check:

1. **Node.js version**: Should be 18 or higher
2. **Memory issues**: Cloudflare Pages has build limits
3. **Dependencies**: The `--legacy-peer-deps` flag should handle most conflicts

Common fixes:
- Verify `CF_MODULE` environment variable is set correctly
- Check that the build output directory matches the configured path
- Review build logs for specific error messages

### CORS Issues

If you encounter CORS errors:

1. Ensure your AWS backend allows requests from Cloudflare Pages domains
2. Update AWS security groups if needed
3. Check that API endpoints are accessible from the internet

### Empty/White Pages

If deployed apps show blank pages:

1. Check browser console for JavaScript errors
2. Verify API connectivity using the test page
3. Ensure backend is running and accessible at `52.33.226.250:8888`
4. Check that the correct API endpoints are configured

## Deployment Monitoring

Monitor your deployments in Cloudflare Pages:
- **Build logs**: For troubleshooting build issues
- **Analytics**: For usage metrics and performance
- **Functions**: If needed for API proxying or edge computing

## Project Structure

```
maollar-web-platform/
├── buyer/                     # Customer storefront
├── manager/                   # Admin management
├── seller/                    # Merchant dashboard  
├── im/                        # Instant messaging
├── package.json              # Root build config
├── cloudflare-build.js       # Build automation
├── build-all.sh             # Local build script
├── api-test.html            # Backend connectivity test
└── README.md                # Project documentation
```

## Support

If you encounter issues:
1. Check the build logs in Cloudflare Pages dashboard
2. Verify AWS backend connectivity using the test commands above
3. Test locally first with `npm run build` in each module directory
4. Review this guide for common solutions

## Next Steps

1. ✅ **Code pushed to GitHub**: Repository `mdmoto/web` is ready
2. 🚀 **Deploy to Cloudflare**: Follow the step-by-step guide above  
3. 🧪 **Test deployments**: Use the provided test tools
4. 🌐 **Configure custom domains**: Optional but recommended for production
5. 📊 **Monitor and optimize**: Use Cloudflare Analytics for insights

---

**Ready to deploy!** Your Maollar web platform is fully configured and ready for Cloudflare Pages deployment.
