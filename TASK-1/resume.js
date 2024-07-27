function generateCV(event) {
    event.preventDefault();

    // Get input values
    let firstName = document.getElementById('fnameField').value;
    let lastName = document.getElementById('lnameField').value;
    let email = document.getElementById('emailField').value;
    let phone = document.getElementById('contactField').value;
    let address = document.getElementById('addressField').value;
    let hobbies = document.getElementById('hobbieField').value;
    let website = document.getElementById('websiteField').value;
    let linkedIn = document.getElementById('linkedField').value;
    let github = document.getElementById('githubField').value;
    let overview = document.getElementById('overviewField').value;
    let education = document.getElementById('educationField').value;
    let experience = document.getElementById('experienceField').value;
    let certifications = document.getElementById('certificationsField').value;
    let skills = document.getElementById('skillsField').value;
    let template = document.getElementById('templateSelect').value;

    // Update preview fields
    document.getElementById('nameT').innerText = `${firstName} ${lastName}`;
    document.getElementById('contactT').innerText = phone;
    document.getElementById('addressT').innerText = address;
    document.getElementById('emailT').innerText = email;
    document.getElementById('hobbieT').innerText = hobbies;

    // Update links
    document.getElementById('websiteT').innerHTML = `<a href="${website}" target="_blank">Website</a>`;
    document.getElementById('linkedT').innerHTML = `<a href="${linkedIn}" target="_blank">LinkedIn</a>`;
    document.getElementById('githubT').innerHTML = `<a href="${github}" target="_blank">GitHub</a>`;

    // If you want to display the full name in a different place
    document.getElementById('nameT2').innerText = `${firstName} ${lastName}`;

    // Update other sections if present in the preview
    document.querySelector('.overview-section p').innerText = overview;
    document.querySelector('.education-section p').innerText = education;
    document.querySelector('.experience-section p').innerText = experience;
    document.querySelector('.certifications-section p').innerText = certifications;
    document.querySelector('.skills-section p').innerText = skills;

    // Apply selected template styles
    applyTemplate(template);

    // Toggle display of form and preview
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.preview').style.display = 'block';
}

function printCV() {
    window.print();
}

function applyTemplate(template) {
    // Select the preview element
    const previewElement = document.querySelector('.preview');

    // Remove any existing template classes
    previewElement.classList.remove('template1', 'template2', 'template3');
    
    // Add the selected template class
    if (template) {
        previewElement.classList.add(template);
    }
}

