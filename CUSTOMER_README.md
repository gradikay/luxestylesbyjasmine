# Luxe Styles by Jasmine - Website Guide

## How to Update Your Images

### Main Hero Image
- Open `index.html` 
- Find the line with `<img class="hero-main-img"`
- Change the `src="..."` to your new image path
- Example: `src="attached_assets/my-new-hero-image.jpg"`

### Gallery Images
- All gallery images are in the HTML file under the "Gallery" section
- Each image has this format: `<img src="attached_assets/your-image.jpg" alt="Description">`
- Simply change the `src="..."` to your new image path
- Change the `alt="..."` to describe your image

### Adding New Images
1. Upload your images to the `attached_assets` folder
2. Use the image name in the `src` attribute
3. Always use web-friendly formats: `.jpg`, `.png`, or `.webp`

## How to Update Business Hours

### Easy Hours Editing
- Open the `hours.js` file
- You'll see clear sections for each day of the week
- Change the times using AM/PM format (like "9:00 AM" or "6:00 PM")

### Example: Changing Monday Hours
```
MONDAY: {
    isOpen: true,
    openTime: "8:00 AM",    // Change this
    closeTime: "7:00 PM"    // Change this
}
```

### To Close on a Specific Day
Change `isOpen: true` to `isOpen: false`

### Adding Holiday Closures
- Find the "SPECIAL CLOSED DATES" section
- Add dates like: `"2025-12-25"` (Christmas Day)
- Use the format: YYYY-MM-DD

## Important Files (Don't Touch)

### Never Edit These Files:
- `styles.css` - Controls the design and colors
- `script.js` - Controls website functionality  
- Logo files and design elements

### Safe to Edit:
- `index.html` - All your content and images
- `hours.js` - Business hours and special dates
- Images in `attached_assets` folder

## Getting Help

If you need to make changes and something breaks:
1. Check that image file names match exactly (including .jpg, .png extensions)
2. Make sure times in hours.js use AM/PM format
3. Verify dates use YYYY-MM-DD format

The website automatically updates when you save changes to the files.