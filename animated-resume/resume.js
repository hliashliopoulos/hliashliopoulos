const resume = document.querySelector('#resume');
const replay = document.querySelector('#replay');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sections = [...resume.children];
let animations = [];

function stopAnimation() {
  animations.forEach((animation) => animation.cancel());
  animations = [];
}

function playAnimation() {
  stopAnimation();

  if (reducedMotion.matches) {
    return;
  }

  // The resume is fully visible before and after the animation.
  animations = sections.map((section, index) =>
    section.animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 360, delay: index * 110, easing: 'ease-out', fill: 'backwards' },
    ),
  );
}

if (typeof resume.animate === 'function') {
  replay.hidden = reducedMotion.matches;
  replay.addEventListener('click', playAnimation);
  reducedMotion.addEventListener('change', () => {
    replay.hidden = reducedMotion.matches;
    stopAnimation();
  });
  window.addEventListener('beforeprint', stopAnimation);
  playAnimation();
}
