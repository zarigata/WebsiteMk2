# Catchy - Digital Marketing Agency Website

A modern, responsive website for Catchy, a digital marketing agency based in Saudi Arabia. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 Responsive design that works on all devices
- ⚡ Fast performance with Next.js static generation
- 🎨 Modern UI with Tailwind CSS
- 📱 Mobile-first approach
- 📝 Contact form with form validation
- 📱 Social media integration
- 📍 Interactive map integration
- 📝 Blog section with categories and search

## Prerequisites

- Node.js 16.8 or later
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/catchy-website.git
   cd catchy-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the result.

## Deployment to GitHub Pages

### Prerequisites

- A GitHub account
- The repository must be named exactly `WebsiteMk2` (case-sensitive)

### Deployment Steps

1. **Make sure all your changes are committed and pushed** to the `main` branch.

2. **Run the deployment script**:
   ```bash
   # Make the script executable (Linux/Mac)
   chmod +x deploy.sh
   
   # Run the deployment script
   ./deploy.sh
   ```

   For Windows, you can use Git Bash or run:
   ```bash
   bash deploy.sh
   ```

3. **The script will**:
   - Install dependencies
   - Build the project
   - Export the static site
   - Push the built files to the `gh-pages` branch

4. **After the script completes**, your site will be live at:
   https://zarigata.github.io/WebsiteMk2

### Manual Deployment

If the script doesn't work, you can deploy manually:

1. **Build and export the site**:
   ```bash
   npm run build
   npm run export
   ```

2. **Create a new branch called `gh-pages`** and push the `out` directory:
   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   git add -f out/
   git mv out/* .
   touch .nojekyll
   git add .nojekyll
   git commit -m "Deploy to GitHub Pages"
   git push -f origin gh-pages
   ```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SITE_URL=https://zarigata.github.io/WebsiteMk2
NEXT_PUBLIC_BASE_PATH=/WebsiteMk2
```

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Export static files** (for hosting on GitHub Pages, Netlify, Vercel, etc.)
   ```bash
   npm run export
   # or
   yarn export
   ```

   The static files will be generated in the `out` directory.

## Deploying to GitHub Pages

1. Update `next.config.js` with your GitHub repository name:
   ```js
   const repo = 'catchy-website'; // Replace with your repository name
   const assetPrefix = `/${repo}/`;
   const basePath = `/${repo}`;

   module.exports = {
     assetPrefix: assetPrefix,
     basePath: basePath,
     // ... rest of the config
   };
   ```

2. Update `next.config.js` with your GitHub repository name:
   ```json
   {
     "homepage": "https://yourusername.github.io/catchy-website"
   }
   ```

3. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && npm run export && touch out/.nojekyll && gh-pages -d out"
   }
   ```

4. Install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   # or
   yarn add --dev gh-pages
   ```

5. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## Project Structure

```
catchy-website/
├── app/                    # App Router
│   ├── about/              # About page
│   ├── blog/               # Blog page
│   ├── contact/            # Contact page
│   ├── services/           # Services page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
├── public/                 # Static files
│   └── images/             # Image assets
├── .gitignore
├── next.config.js          # Next.js configuration
├── package.json
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Customization

### Colors

You can customize the color scheme by modifying the `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#E74C3C',
        accent: '#F39C12',
        light: '#ECF0F1',
        dark: '#2C3E50',
      },
    },
  },
};
```

### Fonts

The website uses the Inter font by default. You can change it in `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Then use it in your component
<div className={inter.className}>
  {/* Your content */}
</div>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
