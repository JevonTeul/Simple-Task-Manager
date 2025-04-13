document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms with validation
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
          e.preventDefault();
          return false;
        }
        
        // Handle method override for PATCH/DELETE
        const method = this.getAttribute('data-method');
        if (method && method !== 'POST') {
          addMethodOverride(this, method);
        }
      });
    });
  
    function validateForm(form) {
      let isValid = true;
      resetValidation(form);
  
      // Title validation
      const titleInput = form.querySelector('[name="title"]');
      if (titleInput) {
        const title = titleInput.value.trim();
        if (!title) {
          showError(titleInput, 'Title is required');
          isValid = false;
        } else if (title.length < 3) {
          showError(titleInput, 'Title must be at least 3 characters');
          isValid = false;
        }
      }
  
      // Description validation
      const descInput = form.querySelector('[name="description"]');
      if (descInput && descInput.value.length > 500) {
        showError(descInput, 'Description cannot exceed 500 characters');
        isValid = false;
      }
  
      return isValid;
    }
  
    function showError(input, message) {
      input.classList.add('is-invalid');
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('invalid-feedback')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }
  
    function resetValidation(form) {
      form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
      });
      form.querySelectorAll('.invalid-feedback').forEach(el => {
        el.style.display = 'none';
      });
    }
  
    function addMethodOverride(form, method) {
      // Remove existing method override if any
      form.querySelectorAll('input[name="_method"]').forEach(el => el.remove());
      
      // Add new method override
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = '_method';
      hiddenInput.value = method;
      form.appendChild(hiddenInput);
    }
  });