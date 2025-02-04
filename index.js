
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

function renderWorkExperience(translations, language) {
    const workContainer = document.querySelector('.work');
    workContainer.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.className = 'title';
    titleElement.textContent = translations[language]['workExperience'];
    workContainer.appendChild(titleElement);

    const workData = translations[language]['workData'];
    workData.forEach(work => {
        const workDiv = document.createElement('div');

        const position = document.createElement('h4');
        position.className = 'workPosition';
        position.innerHTML = `<span>${work.position}</span> <span class="organization">${work.organization}</span>`;
        workDiv.appendChild(position);

        const period = document.createElement('p');
        period.className = 'period';
        period.textContent = work.period;
        workDiv.appendChild(period);

        if (work.responsibilities && work.responsibilities.length > 0) {
            const responsibilitiesList = document.createElement('ul');
            responsibilitiesList.className = 'workList';
            responsibilitiesList.innerHTML = work.responsibilities
                .map(item => `<li class="workListItem">${item}</li>`)
                .join('');
            workDiv.appendChild(responsibilitiesList);
        }

        workContainer.appendChild(workDiv);
    });
}

function renderEducation(translations, language) {
    const educationContainer = document.querySelector('.education-university');
    educationContainer.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.className = 'title';
    titleElement.textContent = translations[language]['education'];
    educationContainer.appendChild(titleElement);

    const educationData = translations[language]['educationData'];
    educationData.forEach(edu => {
        const eduDiv = document.createElement('div');

        const title = document.createElement('h4');
        title.className = 'eduTitle';
        title.textContent = edu.title;
        eduDiv.appendChild(title);

        const speciality = document.createElement('h5');
        speciality.className = 'speciality';
        speciality.textContent = edu.speciality;
        eduDiv.appendChild(speciality);

        const degree = document.createElement('p');
        degree.className = 'period2';
        degree.textContent = edu.degree;
        eduDiv.appendChild(degree);

        const period = document.createElement('p');
        period.className = 'period';
        period.textContent = edu.period;
        eduDiv.appendChild(period);

        educationContainer.appendChild(eduDiv);
    });
}

function renderCourses(translations, language) {
    const coursesContainer = document.querySelector('.education-courses');
    coursesContainer.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.className = 'title';
    titleElement.textContent = translations[language]['courses'];
    coursesContainer.appendChild(titleElement);

    const courses = translations[language]['coursesData'];
    courses.forEach(course => {
        const courseDiv = document.createElement('div');

        const title = document.createElement('h4');
        title.className = 'eduTitle';
        title.textContent = course.title;
        courseDiv.appendChild(title);

        const speciality = document.createElement('h5');
        speciality.className = 'speciality';
        speciality.textContent = course.description;
        courseDiv.appendChild(speciality);

        const details = document.createElement('p');
        details.className = 'period2';
        details.textContent = course.details;
        courseDiv.appendChild(details);

        coursesContainer.appendChild(courseDiv);
    });
}

function renderContacts(translations, language) {
    const contactsContainer = document.querySelector('.contacts');
    contactsContainer.innerHTML = '';

    const titleElement = document.createElement('h3');
    titleElement.className = 'sidebarTitle';
    titleElement.textContent = translations[language]['contactsTitle'];
    contactsContainer.appendChild(titleElement);

    const contactsData = translations[language]['contactsData'];
    const contactsDiv = document.createElement('div');

    const phoneElement = document.createElement('p');
    phoneElement.className = 'contacts-paragraph';
    phoneElement.innerHTML = `<span class="contactType">${contactsData.phone.type}</span>
        <a href="tel:${contactsData.phone.value}" class="contactLink">${contactsData.phone.value}</a>`;
    contactsDiv.appendChild(phoneElement);

    const emailElement = document.createElement('p');
    emailElement.className = 'contacts-paragraph';
    emailElement.innerHTML = `<span class="contactType">${contactsData.email.type}</span>
        <a href="mailto:${contactsData.email.value}" class="contactLink">${contactsData.email.value}</a>`;
    contactsDiv.appendChild(emailElement);

    const linkedinElement = document.createElement('p');
    linkedinElement.className = 'contacts-paragraph';
    linkedinElement.innerHTML = `<span class="contactType">${contactsData.linkedin.type}</span>
        <a href="${contactsData.linkedin.value}" class="contactLink">${contactsData.linkedin.title}</a>`;
    contactsDiv.appendChild(linkedinElement);

    const githubElement = document.createElement('p');
    githubElement.className = 'contacts-paragraph';
    githubElement.innerHTML = `<span class="contactType">${contactsData.gitHub.type}</span>
        <a href="${contactsData.gitHub.value}" class="contactLink">${contactsData.gitHub.title}</a>`;
    contactsDiv.appendChild(githubElement);

    contactsContainer.appendChild(contactsDiv);
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

        renderWorkExperience(translations, language);
        renderEducation(translations, language);
        renderCourses(translations, language);
        renderContacts(translations, language);
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
