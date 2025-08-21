import { useEffect } from 'react';

export const useIntroAnimation = () => {
  useEffect(() => {
    const introTextElement = document.querySelector('.intro-text');
    const spans = introTextElement?.querySelectorAll('span');
    const paragraph = document.querySelector('.hero-content p');
    const buttons = document.querySelector('.hero-content .flex');

    if (!spans) return;

            // CSS handles the stagger delays now, so we don't need to set them dynamically
        // spans.forEach((span, index) => {
        //   span.style.transitionDelay = `${index * 0.04}s`;
        // });

        setTimeout(() => {
          introTextElement?.classList.add('animate');
        }, 50); // Reduced from 100ms to 50ms

        setTimeout(() => {
          paragraph?.classList.remove('opacity-0');
          paragraph?.classList.add('animate-fade-in');
          buttons?.classList.remove('opacity-0');
          buttons?.classList.add('animate-fade-in');
        }, (spans.length * 40) + 250); // Reduced timing: 40ms per span + 250ms delay
  }, []);
};
