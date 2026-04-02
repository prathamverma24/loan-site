# Hanumath Enterprises - Website

A modern, fully-animated financial services website built with HTML, CSS, JavaScript, and GSAP.

## 📁 Project Structure

```
LOAN SITE/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling with animations
├── script.js           # GSAP animations and interactivity
└── README.md           # This file
```

## 🎨 Features Included

### 1. **Navbar**
- Fixed navigation with smooth scroll effect
- Active link indicator
- Apply Now button with gradient
- Responsive hamburger menu for mobile

### 2. **Hero Section**
- Animated title with word-by-word reveal
- Subtitle fade-in animation
- Floating image placeholder with parallax effect
- Animated scroll indicator with mouse animation
- Responsive grid layout

### 3. **About Section**
- Section header with centered layout
- Company information with animated stats
- Counter animation for numbers (10+, 50K+, ₹500Cr+)
- Feature cards with hover animations
- Icons with descriptions

### 4. **Services Section**
- 4 service cards (Personal Loans, Business Loans, Investment Plans, Insurance)
- Card icons with bounce animations
- Hover effects with scale transformation
- Feature lists for each service
- Gradient backgrounds and borders

### 5. **Testimonials Section**
- 3 testimonial cards with star ratings
- Author avatars with initials
- Carousel navigation (prev/next buttons)
- Grid layout on desktop, carousel on mobile
- Smooth transitions between testimonials

### 6. **Contact Section**
- Contact information cards (Address, Phone, Email, Hours)
- Animated contact form
- Form validation and success message
- Responsive 2-column layout

### 7. **Footer**
- Dark background with gradient text
- Multiple footer sections
- Social media links
- Quick navigation links
- Copyright information

## 🎬 Animations Implemented

### GSAP Animations:
- **Scroll Trigger Effects**: Elements animate in as they enter the viewport
- **Parallax**: Image floats and parallax effect on scroll
- **Text Reveal**: Titles and text elements fade in with transforms
- **Stagger Animation**: Multiple elements animate in sequence
- **Counter Animation**: Numbers count up automatically
- **Carousel**: Smooth testimonial slide transitions
- **Hover Effects**: Buttons and cards transform on interaction
- **Scroll Progress Bar**: Visual indicator of page scroll position

### CSS Animations:
- Icon bounce animations
- Smooth hover transitions
- Border color transitions
- Transform effects (scale, translateY, translateX)

## 🎨 Color Palette

- **Primary Orange**: #FF8C00
- **Dark Orange**: #E07C00
- **Light Orange**: #FFA500
- **Accent Gold**: #D4AF37
- **Dark Background**: #0F1419
- **Light Background**: #F8F9FA
- **Text Dark**: #1A1A1A
- **Text Light**: #FFFFFF

## 📱 Responsive Design

- **Desktop**: Full grid layouts with multiple columns
- **Tablet**: Adjusted grid and spacing
- **Mobile**: Single column layouts with hamburger menu
- **Breakpoints**: 768px and 480px

## 🚀 How to Use

1. **Open the Website**:
   - Simply open `index.html` in your web browser

2. **Customize Content**:
   - Edit text content in `index.html`
   - Update service names and descriptions
   - Change contact information
   - Add your company name/branding

3. **Customize Colors**:
   - Open `styles.css`
   - Find the `:root` section at the top
   - Change the CSS variables:
     ```css
     --primary-orange: #FF8C00;
     --dark-orange: #E07C00;
     /* ... change other colors as needed ... */
     ```

4. **Customize Images**:
   - Replace the `.image-placeholder` div with actual images
   - Add `<img>` tags in the HTML
   - Update testimonial avatars with real profile pictures

5. **Add More Sections**:
   - Add new section HTML
   - Style in `styles.css`
   - Add GSAP animations in `script.js`

## 📋 Customization Tips

### Change Hero Section Text
```html
<!-- In index.html, find the hero-title section and edit: -->
<span class="word">Your Financial</span>
<span class="word">Growth Starts</span>
<span class="word">Here</span>
```

### Add/Remove Services
```html
<!-- Duplicate .service-card to add more services -->
<div class="service-card">
    <div class="service-icon">💰</div>
    <h3>Your Service Name</h3>
    <!-- ... -->
</div>
```

### Adjust Animation Speed
```javascript
// In script.js, find the animation you want to adjust
gsap.to('.element', {
    duration: 0.8,  // ← Change this value (in seconds)
    // ... other properties
});
```

### Change Navbar Colors
```css
/* In styles.css */
.navbar {
    background: rgba(255, 255, 255, 0.95);
    /* Change to your desired color */
}
```

## 🔧 Dependencies

- **GSAP**: For smooth scroll animations and effects
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **No other external dependencies needed!**

## 📦 Files Breakdown

### index.html
- Semantic HTML5 structure
- All sections properly organized
- Ready for content customization

### styles.css
- CSS Grid and Flexbox layouts
- Responsive design with media queries
- Smooth transitions and animations
- Local font styling with fallbacks

### script.js
- GSAP animation triggers
- ScrollTrigger integration
- Navigation functionality
- Form handling
- Responsive behavior

## 🌟 Advanced Features

- **Scroll Progress Bar**: Visual indicator at top
- **Active Navigation Links**: Highlights current section
- **Mobile Hamburger Menu**: Responsive navigation
- **Form Validation**: Contact form submission
- **Reduced Motion Support**: Respects user preferences
- **Performance Optimization**: Smooth 60fps animations

## 🎯 Next Steps to Customize

1. ✏️ Replace all placeholder text with your content
2. 🎨 Update colors in `:root` CSS variables
3. 📸 Replace placeholder images with real images
4. 📞 Update contact information
5. 💼 Add your company logo
6. 🔗 Update social media links
7. 📧 Connect form to backend email service
8. 🌐 Deploy to web hosting

## 💡 Tips for Best Results

- Keep text concise and impactful
- Use high-quality images
- Test on multiple devices
- Test animations on older browsers
- Optimize images for web (use tools like TinyPNG)
- Remove console.log statements before deployment

## 🆘 Troubleshooting

**Animations not playing?**
- Ensure GSAP scripts are loaded from CDN
- Check browser console for errors
- Verify script.js is properly linked

**Layout issues on mobile?**
- Check media queries in styles.css
- Test with DevTools mobile view
- Ensure viewport meta tag is present

**Form not working?**
- Check form inputs have proper attributes
- Add backend integration for actual email sending
- Verify JavaScript console for errors

---

**Build with ❤️ for Hanumath Enterprises**

Last Updated: April 2, 2026