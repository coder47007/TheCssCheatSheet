// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle (Light/Dark Mode)
const themeToggle = document.createElement('button');
themeToggle.textContent = 'Toggle Theme';
themeToggle.style.position = 'fixed';
themeToggle.style.top = '10px';
themeToggle.style.right = '10px';
themeToggle.style.padding = '10px';
themeToggle.style.backgroundColor = '#3498db';
themeToggle.style.color = '#fff';
themeToggle.style.border = 'none';
themeToggle.style.borderRadius = '5px';
themeToggle.style.cursor = 'pointer';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
        .dark-theme {
            background-color: #333;
            color: #f9f9f9;
        }
        .dark-theme header, .dark-theme footer {
            background-color: #222;
        }
        .dark-theme pre, .dark-theme code {
            background-color: #555;
            color: #fff;
        }
    </style>`
);

// Copy code snippets to clipboard
document.querySelectorAll('pre code').forEach(block => {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.marginTop = '10px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.backgroundColor = '#3498db';
    copyButton.style.color = '#fff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '5px';
    copyButton.style.cursor = 'pointer';
    block.parentNode.appendChild(copyButton);

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => (copyButton.textContent = 'Copy'), 2000);
        });
    });
});

// Highlight section as the user scrolls
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        if (
            section.offsetTop <= scrollPos &&
            section.offsetTop + section.offsetHeight > scrollPos
        ) {
            section.style.backgroundColor = '#f0f8ff';
        } else {
            section.style.backgroundColor = '#fff';
        }
    });
});

// Create the navigation bar
const toc = document.createElement('nav');
toc.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    height: 100%;
    background: #f8f9fa;
    border-right: 2px solid #ddd;
    padding: 20px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

// Add content for the TOC
toc.innerHTML = `
    <h3 style="text-align: center; font-family: Arial, sans-serif; margin-bottom: 20px; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Table of Contents</h3>
    <ul style="list-style: none; padding: 0; margin: 0;"></ul>
`;

// Append the TOC to the body
document.body.appendChild(toc);

// Generate links dynamically based on sections
document.querySelectorAll('section').forEach((section) => {
    const listItem = document.createElement('li');
    listItem.style.cssText = 'margin-bottom: 15px;';
    
    const link = document.createElement('a');
    link.textContent = section.querySelector('h2').textContent;
    link.href = `#${section.id}`;
    link.style.cssText = `
        text-decoration: none;
        color: #007bff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        display: block;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background 0.3s, color 0.3s;
    `;

    link.addEventListener('mouseover', () => {
        link.style.background = '#007bff';
        link.style.color = 'white';
    });

    link.addEventListener('mouseout', () => {
        link.style.background = 'transparent';
        link.style.color = '#007bff';
    });

    listItem.appendChild(link);
    toc.querySelector('ul').appendChild(listItem);
});

// Add some margin to the main content to avoid overlapping
document.body.style.paddingLeft = '260px';
