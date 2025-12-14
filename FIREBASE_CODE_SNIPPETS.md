# Firebase Integration Code Snippets

## For index.html
Add this code BEFORE the closing `</body>` tag (after line 252, before `</body>`):

```html
<!-- Firebase SDK -->
<script type="module">
    import { initializeCounter } from './firebase-config.js';
    // Initialize counter for main index page
    initializeCounter('counters/index');
</script>
```

## For advanced_version/index.html

### Step 1: Replace the counter image (line 54)
Replace this line:
```html
<img src="https://visit-counter.vercel.app/counter.png?page=badboytest.info%2Fadvanced_version%2F&s=20&c=000000&bg=f0f0f0&no=10&ff=electrolize&tb=Total+visits+%3A+&ta=" alt="visits">
```

With this:
```html
<div id="visit-counter" style="font-family: 'Electrolize', sans-serif; font-size: 20px; color: #000000; background-color: #f0f0f0; padding: 10px; display: inline-block; border-radius: 5px;">
    Total visits : <span id="counter-value">Loading...</span>
</div>
```

### Step 2: Add Firebase initialization
Add this code BEFORE the closing `</body>` tag (after line 110, before `</body>`):

```html
<!-- Firebase SDK -->
<script type="module">
    import { initializeCounter } from '../firebase-config.js';
    // Initialize counter for advanced version page
    initializeCounter('counters/advanced_version');
</script>
```

## For myman/index.html
Add this code BEFORE the closing `</body>` tag (after line 143, before `</body>`):

```html
<!-- Firebase SDK -->
<script type="module">
    import { initializeCounter } from '../firebase-config.js';
    // Initialize counter for myman page
    initializeCounter('counters/myman');
</script>
```

## Summary of Changes Needed

1. ✅ **index.html** - Counter display updated, need to add Firebase script
2. ⏳ **advanced_version/index.html** - Need to replace counter image AND add Firebase script  
3. ✅ **myman/index.html** - Counter display updated, need to add Firebase script
4. ⏳ **firebase-config.js** - Need to update with your actual Firebase credentials
5. ⏳ **Firebase Database Rules** - Need to apply the rules in Firebase Console

## Quick Copy-Paste Guide

1. Get your Firebase config from Firebase Console
2. Update `firebase-config.js` with your actual credentials
3. Copy the appropriate code snippet above for each HTML file
4. Paste it in the correct location (before `</body>` tag)
5. Apply the database rules in Firebase Console
6. Test locally, then deploy!
