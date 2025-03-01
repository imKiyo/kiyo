// Create this file as src/scripts/contact-form.js
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const formProps = Object.fromEntries(formData);
      
      // Form validation
      const nameField = contactForm.querySelector('#name');
      const emailField = contactForm.querySelector('#email');
      const messageField = contactForm.querySelector('#message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Reset previous validation states
      [nameField, emailField, messageField].forEach(field => {
        field.classList.remove('error');
      });
      
      // Simple validation
      let isValid = true;
      
      if (!formProps.name.trim()) {
        nameField.classList.add('error');
        isValid = false;
      }
      
      if (!formProps.email.trim() || !formProps.email.includes('@')) {
        emailField.classList.add('error');
        isValid = false;
      }
      
      if (!formProps.message.trim()) {
        messageField.classList.add('error');
        isValid = false;
      }
      
      if (!isValid) {
        return;
      }
      
      // Show loading state
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // In a real implementation, you would send this data to your backend
        // For demonstration, let's simulate a server response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        contactForm.innerHTML = `
          <div class="success-message">
            <div class="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        `;
      } catch (error) {
        // Error state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Failed to send message. Please try again.';
        
        contactForm.prepend(errorMessage);
      }
    });
  }
});
