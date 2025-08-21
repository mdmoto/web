#!/bin/bash

echo "Building Maollar Web Applications..."

# Function to build each module
build_module() {
    local module_name=$1
    echo "Building $module_name..."
    
    cd "$module_name" || exit 1
    
    # Remove node_modules if it exists to ensure clean install
    if [ -d "node_modules" ]; then
        rm -rf node_modules
    fi
    
    # Install dependencies with legacy peer deps to handle conflicts
    npm install --legacy-peer-deps || {
        echo "Failed to install dependencies for $module_name"
        return 1
    }
    
    # Build the application
    npm run build || {
        echo "Failed to build $module_name"
        return 1
    }
    
    echo "$module_name built successfully!"
    cd ..
}

# Build all modules
modules=("buyer" "manager" "seller" "im")

for module in "${modules[@]}"; do
    if [ -d "$module" ]; then
        build_module "$module"
    else
        echo "Module $module not found, skipping..."
    fi
done

echo "All modules built successfully!"
