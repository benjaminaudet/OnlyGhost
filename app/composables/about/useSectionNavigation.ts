export const useSectionNavigation = () => {
  // Control the active section for smooth scrolling
  const activeSection = ref('overview');
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'protection', label: 'Data Protection' },
    { id: 'faq', label: 'FAQ' },
    { id: 'technical', label: 'Technical Details' },
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    activeSection.value = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer for section highlighting
  onMounted(() => {
    if (process.client) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = entry.target.id;
            }
          });
        },
        { rootMargin: '-100px 0px -100px 0px', threshold: 0.3 }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      });
    }
  });

  return {
    activeSection,
    sections,
    scrollToSection,
  };
};
