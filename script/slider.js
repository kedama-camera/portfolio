
class Slide {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.img = this.DOM.el.querySelector(".slide__img");

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

            const defaultOptions = {
                delay: action === "hide" ? 0 : this.config.duration / 2,
                ease: this.config.ease,
                opacity: action === "hide" ? 0 : 1
            };
            const imgOptions = Object.assign({ onComplete: resolve }, defaultOptions);

            imgOptions.startAt =
                action === "show"
                    ? { opacity: 0, x: direction === "left" ? "-10%" : "10%" }
                    : {};

            imgOptions.x =
                action === "hide" ? (direction === "left" ? "10%" : "-10%") : "0%";

            gsap.to(this.DOM.img, imgOptions);
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
        this.current = (this.slideCount - 1);
        this.init();
    }

    init() {
        this.slides[this.current].setCurrent();
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