const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Determine which module to build based on CF_PAGES_BRANCH or subdirectory
const buildModule = process.env.CF_MODULE || 'buyer'; // Default to buyer
const supportedModules = ['buyer', 'manager', 'seller', 'im'];

console.log(`Building module: ${buildModule}`);

if (!supportedModules.includes(buildModule)) {
    console.error(`Unsupported module: ${buildModule}`);
    process.exit(1);
}

const modulePath = path.join(__dirname, buildModule);

if (!fs.existsSync(modulePath)) {
    console.error(`Module directory not found: ${modulePath}`);
    process.exit(1);
}

try {
    // Change to module directory
    process.chdir(modulePath);
    
    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    
    // Build the project
    console.log('Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log(`Module ${buildModule} built successfully!`);
} catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exit(1);
}
