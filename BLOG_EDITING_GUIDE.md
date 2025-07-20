# Blog Section Editing Guide for Non-Programmers

This guide will help you easily modify the blog section of your hair salon website without any programming knowledge.

## 📝 What Can You Change?

- **Blog post images**: Replace with your own photos
- **Blog post titles**: Change the headlines
- **Blog post descriptions**: Update the preview text
- **Blog post dates**: Set when articles were published
- **Blog post categories**: Change topic labels (like "Protective Styles")
- **Newsletter text**: Modify subscription messages

## 📍 Where to Find the Blog Section

The blog section is located in the main website file: `index.html`

Look for this comment in the file:
```html
<!-- Blog Section - Hair Care Tips and Articles -->
```

## 🖼️ How to Change Blog Post Images

1. **Add your new image**: Place your new image file in the `assets` folder
2. **Find the image line**: Look for lines that start with `<img src="assets/`
3. **Replace the filename**: Change the filename to your new image

**Example:**
```html
<!-- BEFORE -->
<img src="assets/hair-style-1-hero_1752954432622_1752969817951.webp" alt="Protective styling tips">

<!-- AFTER (with your new image) -->
<img src="assets/my-new-blog-image.jpg" alt="Protective styling tips">
```

## ✏️ How to Change Blog Post Content

Each blog post has several parts you can edit:

### 1. Blog Post Title
Look for: `<h3 class="blog-title">Your Title Here</h3>`

**Example:**
```html
<!-- Change this text -->
<h3 class="blog-title">5 Essential Tips for Maintaining Protective Styles</h3>
```

### 2. Blog Post Description
Look for: `<p class="blog-excerpt">Your description here...</p>`

**Example:**
```html
<!-- Change this text -->
<p class="blog-excerpt">Keep your protective styles looking fresh and your hair healthy with these expert tips...</p>
```

### 3. Blog Post Category
Look for: `<div class="blog-category">Your Category</div>`

**Example:**
```html
<!-- Change this text -->
<div class="blog-category">Protective Styles</div>
```

### 4. Blog Post Date
Look for: `<span class="blog-date">January 15, 2025</span>`

**Example:**
```html
<!-- Change this date -->
<span class="blog-date"><i class="fas fa-calendar"></i> January 15, 2025</span>
```

### 5. Reading Time
Look for: `<span class="blog-read-time">3 min read</span>`

**Example:**
```html
<!-- Change this time -->
<span class="blog-read-time"><i class="fas fa-clock"></i> 3 min read</span>
```

## ➕ How to Add a New Blog Post

1. **Copy an existing blog post**: Find one complete blog post section (from `<article class="blog-card">` to `</article>`)
2. **Paste it**: Add it right after the last blog post
3. **Modify the content**: Change the image, title, description, category, date, and reading time
4. **Save the file**: Your new blog post will appear on the website

**Complete example of a blog post structure:**
```html
<article class="blog-card">
    <div class="blog-image">
        <!-- Change this image path -->
        <img src="assets/your-image.jpg" alt="Your image description">
        <!-- Change this category -->
        <div class="blog-category">Your Category</div>
    </div>
    <div class="blog-content">
        <!-- Change this title -->
        <h3 class="blog-title">Your Blog Post Title</h3>
        <!-- Change this description -->
        <p class="blog-excerpt">Your blog post description goes here...</p>
        <div class="blog-meta">
            <!-- Change this date -->
            <span class="blog-date"><i class="fas fa-calendar"></i> Your Date</span>
            <!-- Change this reading time -->
            <span class="blog-read-time"><i class="fas fa-clock"></i> X min read</span>
        </div>
        <button class="blog-read-more">Read More</button>
    </div>
</article>
```

## 📧 How to Change Newsletter Text

Look for the newsletter section:
```html
<!-- Newsletter Subscription Section -->
<div class="blog-newsletter">
    <div class="newsletter-content">
        <!-- Change this title -->
        <h3>Stay Updated with Hair Care Tips</h3>
        <!-- Change this description -->
        <p>Get the latest hair care advice, trends, and exclusive tips delivered to your inbox.</p>
```

## 🎨 How to Change Colors (CSS File)

The blog colors are controlled in the `css/styles.css` file. Look for these sections:

### Blog Card Background
```css
.blog-card {
    background: var(--black); /* Change this color */
}
```

### Newsletter Background
```css
.blog-newsletter {
    background: linear-gradient(135deg, var(--primary-pink), var(--dark-pink));
    /* Change these colors for different newsletter background */
}
```

## 💡 Tips for Success

1. **Always make a backup**: Copy your files before making changes
2. **Test on mobile**: Check how your changes look on phones and tablets
3. **Keep images similar size**: Use images that are roughly the same dimensions
4. **Use clear descriptions**: Write helpful alt text for images
5. **Stay consistent**: Keep the same writing style across all blog posts

## 🚫 What NOT to Change

- Don't modify anything with `class=` or `id=` 
- Don't change text inside `<script>` tags
- Don't alter file paths unless you're moving files
- Don't remove the `<div>`, `<article>`, or other HTML tags

## ❓ Need Help?

If something isn't working:
1. Check that you didn't accidentally delete any `<` or `>` symbols
2. Make sure you didn't change any `class=` or `id=` attributes
3. Verify that image file names match exactly (including the file extension)
4. Refresh your browser to see changes

Remember: Small changes make a big difference. Start with one blog post and test it before making more changes!