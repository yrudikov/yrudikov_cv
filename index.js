
let currentLanguage = 'en';

async function loadTranslations() {
    try {
        const response = await fetch('assets/translations.json');
        if (!response.ok) {
            throw new Error('Failed to load translations');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {};
    }
}

function applyTranslations(translations, language) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
        const translationKey = element.getAttribute('data-i18n');
        let translation = translations[language][translationKey];

        if (Array.isArray(translation)) {
            if (element.classList.contains('skillsList')) {
                element.innerHTML = translation.map(item => `<li class="skillsItem"><span class="skillsText">${item}</span></li>`).join('');
            } else if (element.classList.contains('workList')) {
                element.innerHTML = translation.map(item => `<li class="workListItem">${item}</li>`).join('');
            } else {
                element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
            }
        } else {
            element.textContent = translation || '';
        }
    });
}

async function switchLanguage() {
    currentLanguage = currentLanguage === 'pl' ? 'en' : 'pl';
    const translations = await loadTranslations();
    applyTranslations(translations, currentLanguage);

    const languageToggle = document.getElementById('language-toggle');
    languageToggle.textContent = translations[currentLanguage]['languageSwitch'];
}

async function initializeTranslations() {
    const translations = await loadTranslations();
    applyTranslations(translations, currentLanguage);

    const languageToggle = document.getElementById('language-toggle');
    languageToggle.textContent = translations[currentLanguage]['languageSwitch'];

    languageToggle.addEventListener('click', switchLanguage);
}

document.addEventListener('DOMContentLoaded', initializeTranslations);
