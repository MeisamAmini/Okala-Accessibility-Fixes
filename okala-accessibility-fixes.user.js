// ==UserScript==
// @name         Okala Accessibility Fixes
// @version      0.1
// @description  Fixes some problems in the Okala website.
// @author       Meisam Amini
// @match        https://okala.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The website uses Ajax to change pages. Repeat the script every 1 second so the fixes are done for all pages.
    setInterval(function() {
        // Fix the product titles which are heading level 3 and link.
        let links = document.querySelectorAll("h3 > a[aria-label]");
        
        if (links) {
            links.forEach(function(link){
                link.setAttribute("aria-label", link.textContent);
            });
        }

        // Fixes the titles which are links and are situated above every heading level 3 title.
        links = document.querySelectorAll("div.imageContainer > a[aria-label]");
        
        if (links) {
            links.forEach(function(link){
                const image = link.querySelector("div > img");
                if (image) {link.setAttribute("aria-label", image.alt);}
            });
        }
        
        // Fix the label of add to cart buttons.
        const buttons = document.querySelectorAll("button[aria-label='add to cart']");
        
        if (buttons) {
            buttons.forEach(function(button) {
                button.setAttribute("aria-label", "اضافه‌کردن به سبد خرید");
            });
        }
    }, 1000);
})();