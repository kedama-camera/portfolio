
// window.addEventListener('load', function () {
//     const maxLoadingTime = 3000;
//     var loading = document.querySelector('.loading');
//     setTimeout(function () {
//         loading.style.opacity = '0';
//         loading.style.transition = 'opacity 2s ease-out';
//         setTimeout(function () {
//             loading.style.display = 'none';
//         }, maxLoadingTime);
//     }, maxLoadingTime);

//     var visuals = document.querySelectorAll('.visual:not(:first-child)');
//     var options = { threshold: 0.5 };
//     var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transition = 'opacity 2s ease-out'; } }); }, options); visuals.forEach(function (visual) { observer.observe(visual); });
// });