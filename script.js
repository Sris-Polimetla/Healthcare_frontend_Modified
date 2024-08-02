document.addEventListener('DOMContentLoaded', function() {
    const doctors = [
        { id: 1, name: "Dr. Ramesh", specialization: "Cardiologist", address: "Gachibowli, HYD", contact: "555-123-4567" },
        { id: 2, name: "Dr. Suresh", specialization: "Pediatrician", address: "Ameerpet, HYD", contact: "555-987-6543" }
    ];

    const doctorList = document.querySelector('.doctor-list');
    const consultationHistoryList = document.getElementById('consultation-history-list');
    const medicineHistoryList = document.getElementById('medicine-history-list');
    const labHistoryList = document.getElementById('lab-history-list');

    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const authSection = document.getElementById('auth');
    const contentSections = document.querySelectorAll('.content-section');
    const doctorSearch = document.getElementById('doctor-search');

    function toggleAuthForms(showSignIn) {
        signInForm.style.display = showSignIn ? 'block' : 'none';
        signUpForm.style.display = showSignIn ? 'none' : 'block';
    }

    signInBtn.addEventListener('click', function() {
        toggleAuthForms(true);
        authSection.style.display = 'block';
        hideAllContentSections();
    });

    signUpBtn.addEventListener('click', function() {
        toggleAuthForms(false);
        authSection.style.display = 'block';
        hideAllContentSections();
    });

    signOutBtn.addEventListener('click', function() {
        signOut();
    });

    function signOut() {
        // Perform sign-out logic here
        signInBtn.style.display = 'inline';
        signUpBtn.style.display = 'inline';
        signOutBtn.style.display = 'none';
        authSection.style.display = 'block';
        hideAllContentSections();
    }

    document.getElementById('sign-in').addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform sign-in logic here
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        signOutBtn.style.display = 'inline';
        authSection.style.display = 'none';
        showSection('doctors');
    });

    document.getElementById('sign-up').addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform sign-up logic here
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        signOutBtn.style.display = 'inline';
        authSection.style.display = 'none';
        showSection('doctors');
    });

    function generateDoctorCards(doctors) {
        doctorList.innerHTML = ''; // Clear existing doctor cards
        doctors.forEach(doctor => {
            const card = document.createElement('div');
            card.classList.add('doctor-card');
            card.innerHTML = `
                <h3>${doctor.name}</h3>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                <p><strong>Address:</strong> ${doctor.address}</p>
                <p><strong>Contact:</strong> ${doctor.contact}</p>
                <button class="consult-btn" data-doctor-id="${doctor.id}">Consult</button>
            `;
            doctorList.appendChild(card);
        });
    }

    generateDoctorCards(doctors);

    doctorList.addEventListener('click', function(event) {
        if (event.target.classList.contains('consult-btn')) {
            const doctorId = event.target.dataset.doctorId;
            initiateConsultation(doctorId);
        }
    });

    function initiateConsultation(doctorId) {
        const doctor = doctors.find(doc => doc.id == doctorId);
        addToConsultationList(doctor.name, doctor.specialization);
        showNotification(`You have initiated a consultation with Dr. ${doctor.name}`);
    }

    function addToConsultationList(doctorName, specialization) {
        const listItem = document.createElement('li');
        listItem.textContent = `Consulted with ${doctorName} (${specialization})`;
        consultationHistoryList.appendChild(listItem);
    }

    document.getElementById('medicine-order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const medicineName = document.getElementById('medicine-name').value;
        const quantity = document.getElementById('quantity').value;
        const deliveryAddress = document.getElementById('delivery-address').value;

        addToMedicineHistory(medicineName, quantity, deliveryAddress);
        // Clear the form after submission
        this.reset();
    });

    function addToMedicineHistory(medicineName, quantity, deliveryAddress) {
        const listItem = document.createElement('li');
        listItem.textContent = `${quantity} x ${medicineName} - Delivery to: ${deliveryAddress}`;
        medicineHistoryList.appendChild(listItem);
    }

    document.getElementById('lab-test-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const testType = document.getElementById('test-type').value;
        const preferredDate = document.getElementById('preferred-date').value;
        const preferredTime = document.getElementById('preferred-time').value;
        const contactInfo = document.getElementById('contact-info').value;

        addToLabHistory(testType, preferredDate, preferredTime, contactInfo);
        // Clear the form after submission
        this.reset();
    });

    function addToLabHistory(testType, preferredDate, preferredTime, contactInfo) {
        const listItem = document.createElement('li');
        listItem.textContent = `${testType} on ${preferredDate} at ${preferredTime} - Contact: ${contactInfo}`;
        labHistoryList.appendChild(listItem);
    }

    // Function to show a specific section based on the navigation link clicked
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    function hideAllContentSections() {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Event listeners for navigation links to show respective sections
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Show the first section by default
    if (contentSections.length > 0) {
        contentSections[0].style.display = 'none';
    }

    // Function to create and show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Search functionality
    doctorSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredDoctors = doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialization.toLowerCase().includes(query) ||
            doctor.address.toLowerCase().includes(query)
        );
        generateDoctorCards(filteredDoctors);
    });
});
