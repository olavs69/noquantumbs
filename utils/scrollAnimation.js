/**
 * Initialize scroll reveal animations for elements
 * This function should be called in the main component
 */
export const initScrollReveal = () => {
  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all reveal elements
  setTimeout(() => {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }, 100);

  // Return cleanup function
  return () => {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};
