document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    
    if (taskForm) {
      taskForm.addEventListener('submit', function(e) {
        const titleInput = taskForm.querySelector('input[name="title"]');
        const descriptionInput = taskForm.querySelector('textarea[name="description"]');
        let isValid = true;
        
        // Clear previous errors
        document.getElementById('titleError').textContent = '';
        document.getElementById('descriptionError').textContent = '';
        
        // Title validation
        if (titleInput.value.trim().length < 3) {
          document.getElementById('titleError').textContent = 'Title must be at least 3 characters';
          isValid = false;
        }
        
        // Description validation
        if (descriptionInput.value.length > 500) {
          document.getElementById('descriptionError').textContent = 'Description cannot exceed 500 characters';
          isValid = false;
        }
        
        if (!isValid) {
          e.preventDefault();
        }
      });
    }
  });