
class Slide {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.img = this.DOM.el.querySelector(".slide__img");

        this.config = {
            duration: 0.6,
            ease: Power1.out
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
            if (action === "show") {
                return this.showImage(direction, resolve);
            } else if (action === "hide") {
                return this.hideImage(direction, resolve);
            } else {
                console.error("Directionの指定値にミスがあります。:" + direction);
            }
        });
    }

    hideImage(direction, resolve) {
        const option = {
            delay: 0,
            ease: this.config.ease,
            opacity: 0,
            onComplete: resolve,
            startAt: {},
            x: direction === "right" ? "50%" : "-50%"
        };
        return gsap.to(this.DOM.img, option);
    }

    showImage(direction, resolve) {
        const from = { opacity: 0, x: (direction === "right" ? "-50%" : "50%") };
        const to = {
            delay: this.config.duration / 2,
            ease: this.config.ease,
            onComplete: resolve,
            opacity: 1,
            x: "0%"
        };

        gsap.fromTo(this.DOM.img, from, to);
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
            clearInterval(intervalFunction);
            this.next();
        });
        this.DOM.buttonPrev.addEventListener("click", () => {
            clearInterval(intervalFunction);
            this.prev();
        });
    }

    next() {
        this.navigate("right");
    }

    prev() {
        this.navigate("left");
    }

    getReverseString(direction) {
        return direction === "right" ? "left" : "right";
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

var intervalFunction;
window.addEventListener("load", (event) => {
    console.log("loaded");
    const slideshow = new Slideshow(document.querySelector(".slideshow"));

    intervalFunction = setInterval(() => {
        slideshow.prev()
    }, 5000);
});