export const scrollToSection = (id, setIsMobileMenuOpen) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }
};
