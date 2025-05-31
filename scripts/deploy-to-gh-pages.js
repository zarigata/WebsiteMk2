const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment to GitHub Pages...');

// 1. Build the project
console.log('🔨 Building the project...');
execSync('npm run build', { stdio: 'inherit' });

// 2. Export the static site
console.log('📦 Exporting static site...');
try {
  execSync('npm run export', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Export failed. Make sure you have `next export` configured correctly.');
  process.exit(1);
}

// 3. Create a temporary directory for the deployment
const tempDir = path.join(process.cwd(), 'deploy-temp');
const outDir = path.join(process.cwd(), 'out');

// 4. Copy the contents of the out directory to the temp directory
console.log('📂 Preparing files for deployment...');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir);

// Copy all files from out to temp directory
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

copyRecursiveSync(outDir, tempDir);

// 5. Create .nojekyll file
fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

// 6. Create a CNAME file if it exists in the public directory
const cnamePath = path.join(process.cwd(), 'public', 'CNAME');
if (fs.existsSync(cnamePath)) {
  fs.copyFileSync(cnamePath, path.join(tempDir, 'CNAME'));
}

// 7. Initialize a git repository in the temp directory
process.chdir(tempDir);

try {
  // Initialize git repository
  execSync('git init', { stdio: 'inherit' });
  
  // Add all files
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit the changes
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  
  // Add the GitHub repository as a remote
  const repoUrl = 'https://github.com/zarigata/WebsiteMk2.git';
  execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
  
  // Force push to the gh-pages branch
  console.log('🚀 Pushing to GitHub Pages...');
  execSync('git push -f origin main:gh-pages', { stdio: 'inherit' });
  
  console.log('✅ Successfully deployed to GitHub Pages!');
  console.log('🔗 Your site is live at: https://zarigata.github.io/WebsiteMk2');
} catch (error) {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
} finally {
  // Clean up
  process.chdir(process.cwd());
  fs.rmSync(tempDir, { recursive: true, force: true });
}
