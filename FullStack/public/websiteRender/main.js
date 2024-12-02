document.addEventListener('DOMContentLoaded', function () {
    console.log('WealthWise page loaded.');
  
    // Example: Link hover effect with JavaScript (optional)
    const links = document.querySelectorAll('a');
  
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#0056b3';
      });
  
      link.addEventListener('mouseleave', () => {
        link.style.color = '#007bff';
      });
    });
  
    // Placeholder for future interactive features
    console.log('All event listeners attached successfully.');
  });
  