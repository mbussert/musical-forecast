// JavaScript Animations for Pageload

let tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.to('.text', {y:'0%', duration: 1, stagger: 1});
tl.to('.slider', {y: '-100%', duration: 1.5, delay: 0.5});
tl.to('.intro', {y: '-100%', duration: 1}, '-=1');
tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration: 1});
tl.fromTo('.big-text', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1');
tl.fromTo('#clear-btn', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1.5');
