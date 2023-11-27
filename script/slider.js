
class Slide {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.title = this.DOM.el.querySelector(".slide__title > span");
        this.DOM.subtitle = this.DOM.el.querySelector(".slide__subtitle > span");
        this.DOM.imgWrapper = this.DOM.el.querySelector(".slide__img-wrap");
        this.DOM.revealer = this.DOM.el.querySelector(".slide__img-reveal");

        this.config = {
            duration: 0.6,
            ease: Expo.easeOut
        };
    }
    setCurrent(isCurrent = true) {
        this.DOM.el.classList[isCurrent ? "add" : "remove"]("slide--current");
    }
    hide(direction) {
        return this.toggle("hide", direction);
    }
    show(direction) {
        return this.toggle("show", direction);
    }
    toggle(action, direction) {
        return new Promise((resolve, reject) => {
            console.log(action, direction);

            const revealerOptions = {
                ease: this.config.ease,
                delay: action === "hide" ? 0 : this.config.duration / 2,
                onComplete: resolve
            };

            const defaultOptions = {
                delay: action === "hide" ? 0 : this.config.duration / 2,
                ease: this.config.ease,
                opacity: action === "hide" ? 0 : 1
            };

            const titleOptions = Object.assign({}, defaultOptions);
            const subtitleOptions = Object.assign({}, defaultOptions);
            const imgOptions = Object.assign({}, defaultOptions);

            revealerOptions.startAt =
                action === "hide"
                    ? { x: direction === "left" ? "-100%" : "100%", y: "0%" }
                    : { x: "0%", y: "0%" };
            revealerOptions.x =
                action === "hide" ? "0%" : direction === "left" ? "100%" : "-100%";
            imgOptions.startAt =
                action === "show"
                    ? { opacity: 0, x: direction === "left" ? "-10%" : "10%" }
                    : {};
            imgOptions.x =
                action === "hide" ? (direction === "left" ? "10%" : "-10%") : "0%";

            titleOptions.startAt =
                action === "show"
                    ? { opacity: 0, y: action === "show" ? "-100%" : "0%" }
                    : {};
            titleOptions.y = action === "hide" ? "100%" : "0%";
            titleOptions.opacity = action === "hide" ? 0 : 1;

            subtitleOptions.startAt =
                action === "show" ? { opacity: 0, y: "-100%" } : {};
            subtitleOptions.y = action === "hide" ? "100%" : "0%";
            subtitleOptions.opacity = action === "hide" ? 0 : 1;
            subtitleOptions.delay = action === "hide" ? 0 : this.config.duration;

            // Toggling the revealer.

            console.log(titleOptions);

            // Moving & fading the image wrappper.

            gsap.to(this.DOM.revealer, this.config.duration, revealerOptions);
            gsap.to(this.DOM.subtitle, this.config.duration, subtitleOptions);
            gsap.to(this.DOM.imgWrapper, this.config.duration, imgOptions);
            gsap.to(this.DOM.title, this.config.duration, titleOptions);
            // Moving & fading the title and number.
        });
    }
}

class Slideshow {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.buttonNext = this.DOM.el.querySelector(".button--next");
        this.DOM.buttonPrev = this.DOM.el.querySelector(".button--prev");
        this.slides = [];

        [...this.DOM.el.querySelectorAll(".slide")].forEach((slide) =>
            this.slides.push(new Slide(slide))
        );

        this.slideCount = this.slides.length;
        this.current = 0;
        this.init();
    }

    init() {
        this.slides[this.current].setCurrent();
        this.slides[this.current].show("right");
        this.initEvents();
    }

    initEvents() {
        this.DOM.buttonNext.addEventListener("click", () => {
            this.next();
        });
        this.DOM.buttonPrev.addEventListener("click", () => {
            this.prev();
        });
    }

    next() {
        this.navigate("right");
    }

    prev() {
        this.navigate("left");
    }

    navigate(direction) {
        if (this.isAnimating) return;

        this.isAnimating = true;

        const nextSlide =
            direction === "right"
                ? this.current < this.slideCount - 1
                    ? this.current + 1
                    : 0
                : this.current > 0
                    ? this.current - 1
                    : this.slideCount - 1;

        Promise.all([
            this.slides[this.current].hide(direction),
            this.slides[nextSlide].show(direction)
        ])
            .then(() => {
                this.slides[this.current].setCurrent(false);
                this.slides[nextSlide].setCurrent();
                this.current = nextSlide;
                this.isAnimating = false;
                console.log("done!");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

window.addEventListener("load", (event) => {
    console.log("loaded");
    const slideshow = new Slideshow(document.querySelector(".slideshow"));

    // setInterval(() => {
    //     slideshow.next()
    // }, 5000);
});