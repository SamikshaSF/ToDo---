
    


const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get student details
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let dob = document.getElementById("dob").value;
    let department = document.getElementById("department").value;

    let gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    let courses = document.querySelectorAll(
        'input[name="course"]:checked'
    );

    let error = document.getElementById("error");

    // Validation
    if (!name || !email || !phone || !dob ||
        !gender || courses.length === 0 || !department) {

        error.textContent = "Please fill all required fields!";
        return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        error.textContent = "Please enter a valid name.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = "Please enter a valid email.";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        error.textContent = "Enter a valid 10-digit phone number.";
        return;
    }

    if (new Date(dob) >= new Date()) {
        error.textContent = "Date of birth must be in the past.";
        return;
    }

    // Get selected courses
    let selectedCourses = [];

    courses.forEach(function(course) {
        selectedCourses.push(course.value);
    });

    // Display student details
    let details = `
        <p><strong>Name:</strong> ${escapeHTML(name)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
        <p><strong>Date of Birth:</strong> ${escapeHTML(dob)}</p>
        <p><strong>Gender:</strong> ${escapeHTML(gender.value)}</p>
        <p><strong>Courses:</strong> ${escapeHTML(selectedCourses.join(", "))}</p>
        <p><strong>Department:</strong> ${escapeHTML(department)}</p>
    `;

    document.getElementById("studentDetails").innerHTML = details;

    document.getElementById("result").style.display = "block";

    error.textContent = "";

    alert("Student Registered Successfully!");

});

// Safely display user-entered text
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[char];
    });
}

// Clear displayed details when form is reset
form.addEventListener("reset", function() {
    document.getElementById("result").style.display = "none";
    document.getElementById("error").textContent = "";
});
