// ==UserScript==
// @name         Okala Accessibility Fixes
// @version      0.2
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

        // Fixes the product titles in the main page
        links = document.querySelectorAll("a[aria-label]");

        if (links) {
            links.forEach(function(link){
                const image = link.querySelector("div > img");
                if (image) {link.setAttribute("aria-label", image.alt);}
            });
        }

        // Fixes the links underneath product titles in the main page
        links = document.querySelectorAll("a[aria-label]");

        if (links) {
            links.forEach(function(link){
                const title = link.querySelector("h3");
                if (title) {link.setAttribute("aria-label", title.textContent);}
            });
        }

        // Turns     discount price into paragraph
        const level5Headings = document.querySelectorAll("h5");
        level5Headings.forEach(toParagraph);
        const level6Headings = document.querySelectorAll("h6");
        level6Headings.forEach(toParagraph);
        
        function toParagraph(heading) {
            if (heading.textContent.includes("ريال") || heading.textContent.includes("%") || heading.textContent.includes("٬")) {
                const parent = heading.parentNode;
                const paragraph = document.createElement("p");
                paragraph.innerHTML = heading.textContent;
                parent.insertBefore(paragraph, heading);
                heading.remove();
                parent.normalize();
            }
        }
        
        // Fixes the label of add to cart buttons.
        const buttons = document.querySelectorAll("button[aria-label='add to cart']");
        
        if (buttons) {
            buttons.forEach(function(button) {
                button.setAttribute("aria-label", "اضافه‌کردن به سبد خرید");
            });
        }
        
        // Fixes the label of remove from cart buttons.
        const removeButtons = document.querySelectorAll("button[aria-label='remove form cart']");
        
        if (removeButtons) {
            removeButtons.forEach(function(removeButton) {
                removeButton.setAttribute("aria-label", "حذف از سبد خرید");
            });
        }
        
        // Fixes the label of user profile button.
        const userProfileButton = document.querySelector("button[aria-label='user profile dropdown']");
        
        if (userProfileButton) {
            userProfileButton.setAttribute("aria-label", "حساب کاربری");
        }
    }, 1000);
})();