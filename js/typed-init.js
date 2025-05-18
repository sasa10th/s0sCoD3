new Typed('.typed', {
    strings: document.querySelector('.typed').getAttribute('data-typed-items').split(','),
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
});
