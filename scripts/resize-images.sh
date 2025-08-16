#!/bin/bash

# Script to resize project images using ImageMagick's mogrify
# Usage: ./resize-images.sh [project-name]
# If no project name is provided, it will process all projects

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if ImageMagick is installed
if ! command -v mogrify &> /dev/null; then
    print_error "ImageMagick (mogrify) is not installed. Please install it first:"
    print_info "Ubuntu/Debian: sudo apt-get install imagemagick"
    print_info "macOS: brew install imagemagick"
    exit 1
fi

# Base directory for project images
BASE_DIR="./public/images/projects"

# Function to resize images in a project directory
resize_project_images() {
    local project_name="$1"
    local project_dir="$BASE_DIR/$project_name"
    
    if [ ! -d "$project_dir" ]; then
        print_warning "Project directory '$project_dir' does not exist. Skipping."
        return
    fi
    
    print_info "Processing project: $project_name"
    
    # Navigate to project directory
    cd "$project_dir"
    
    # Resize card.png to 667x667
    if [ -f "card.png" ]; then
        print_info "  Resizing card.png to 667x667..."
        mogrify -resize 667x667^ -gravity north -extent 667x667 card.png
        print_success "  ✓ card.png resized"
    else
        print_warning "  card.png not found"
    fi
    
    # Resize card-mobile.png to 1000x667
    if [ -f "card-mobile.png" ]; then
        print_info "  Resizing card-mobile.png to 1000x667..."
        mogrify -resize 1000x667^ -gravity north -extent 1000x667 card-mobile.png
        print_success "  ✓ card-mobile.png resized"
    else
        print_warning "  card-mobile.png not found"
    fi
    
    # Resize card-large.png to 1000x667
    if [ -f "card-large.png" ]; then
        print_info "  Resizing card-large.png to 1000x667..."
        mogrify -resize 1000x667^ -gravity north -extent 1000x667 card-large.png
        print_success "  ✓ card-large.png resized"
    else
        print_warning "  card-large.png not found"
    fi
    
    # Resize card-mobile-large.png to 1000x1500
    if [ -f "card-mobile-large.png" ]; then
        print_info "  Resizing card-mobile-large.png to 1000x1500..."
        mogrify -resize 1000x1500^ -gravity north -extent 1000x1500 card-mobile-large.png
        print_success "  ✓ card-mobile-large.png resized"
    else
        print_warning "  card-mobile-large.png not found"
    fi
    
    # Resize carousel images to 1152x648 with top-center alignment
    if [ -d "carousel" ]; then
        carousel_count=$(find carousel -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l)
        if [ "$carousel_count" -gt 0 ]; then
            print_info "  Resizing $carousel_count carousel images to 1152x648 (top-center alignment)..."
            # Use -gravity north for top-center alignment
            mogrify -path carousel -resize 1152x648^ -gravity north -extent 1152x648 carousel/*.{png,jpg,jpeg} 2>/dev/null || true
            print_success "  ✓ Carousel images resized"
        else
            print_warning "  No images found in carousel directory"
        fi
    else
        print_warning "  carousel directory not found"
    fi
    
    # Return to base directory
    cd - > /dev/null
    
    print_success "Completed processing: $project_name"
    echo
}

# Main script logic
main() {
    # Check if we're in the correct directory
    if [ ! -d "$BASE_DIR" ]; then
        print_error "Directory '$BASE_DIR' not found. Please run this script from the project root."
        exit 1
    fi
    
    print_info "Starting image resize process..."
    echo
    
    if [ $# -eq 0 ]; then
        # No arguments provided, process all projects
        print_info "No project specified. Processing all projects in $BASE_DIR"
        echo
        
        for project_dir in "$BASE_DIR"/*; do
            if [ -d "$project_dir" ]; then
                project_name=$(basename "$project_dir")
                resize_project_images "$project_name"
            fi
        done
    else
        # Process specific project
        project_name="$1"
        resize_project_images "$project_name"
    fi
    
    print_success "All image resize operations completed!"
}

# Show usage if help is requested
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "Usage: $0 [project-name]"
    echo
    echo "Resize project images using ImageMagick's mogrify command."
    echo
    echo "Image resize specifications:"
    echo "  • card.png: 667x667"
    echo "  • card-mobile.png: 1000x667"
    echo "  • card-large.png: 1000x667"
    echo "  • card-mobile-large.png: 1000x1500"
    echo "  • carousel/*.{png,jpg,jpeg}: 1920x1080 (top-center aligned)"
    echo
    echo "Arguments:"
    echo "  project-name    Name of the specific project to process"
    echo "                  If omitted, all projects will be processed"
    echo
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo
    echo "Examples:"
    echo "  $0                    # Process all projects"
    echo "  $0 cybercave         # Process only the cybercave project"
    exit 0
fi

# Run main function
main "$@"
