const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  // If the click is NOT inside the menu or the hamburger
  if (
    !offScreenMenu.contains(e.target) &&
    !hamMenu.contains(e.target)
  ) {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  }
});

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };
  
    try {
      // Use the new Google Apps Script Web App URL
      const response = await fetch('https://script.google.com/macros/s/AKfycbwij1_4OYwAmBtUZL6M-SUm7z-rOeWcCvPYcT8t5KJVdvzI0hx3fDYnt2BQB8WKU254wQ/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      if (result.status === 'success') {
        alert('Thank you! Your message has been submitted.');
        document.getElementById('contactForm').reset(); // Clear the form
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error); // Debugging: Log error
      alert('An error occurred. Please try again.');
    }
  });