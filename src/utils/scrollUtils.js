export const scrollToSection = (id, setIsMobileMenuOpen) => {
  const element = document.getElementById(id);
  if (element) {
    // Close mobile menu if open
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Calculate offset for fixed header (80px is header height + some padding)
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Smooth scroll to element with offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
