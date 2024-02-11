// 画像を切り替えるクラス
class ImageSwitcher {

    horizontalImages = [
        "photos/horizontal/001.jpg",
        "photos/horizontal/002.jpg",
        "photos/horizontal/003.jpg",
        "photos/horizontal/004.jpg",
    ];

    verticalImages = [
        "photos/vertical/001.jpg",
        "photos/vertical/002.jpg",
        "photos/vertical/003.jpg",
        "photos/vertical/004.jpg",
    ];

    sliderImageElements;

    constructor() {
        this.getSliderImageElements();
        this.switchImageIfRotated();
    }

    getSliderImageElements() {
        if (this.sliderImageElements) {
            return;
        }
        this.sliderImageElements = document.querySelectorAll(".splide__slide__image");
    }

    isHorizontal() {
        const result = (window.innerHeight <= window.innerWidth);
        console.log("isHorizontal : " + result);
        return result;
    }

    switchImageIfRotated() {
        this.getSliderImageElements();
        if (this.isHorizontal()) {
            this.sliderImageElements.forEach((el, index) => { el.setAttribute("src", this.horizontalImages[index]); });
        } else {
            this.sliderImageElements.forEach((el, index) => { el.setAttribute("src", this.verticalImages[index]); });
        }
    }
}

// スライダーのSplitejsの設定などを管理するクラス。
class SplidejsManager {

    // splideの本体
    splidejs;

    option = {
        type: "fade",
        speed: 1000,
        rewind: true,
        arrows: false,
    };

    enableAutoScroll = true;
    scrollInterval = 2500;

    initializeSplitejs(isEnableExtension) {
        if (isEnableExtension) {
            this.splidejs = new Splide('#image-carousel', this.option).mount(window.splide.Extensions);
        } else {
            this.splidejs = new Splide('#image-carousel', this.option).mount();
        }

        if (this.enableAutoScroll) {
            this.setAutoScrollFunction();
        }
    }

    setAutoScrollFunction() {
        setInterval(() => {
            splidejsManager.next();
        }, this.scrollInterval);
    }

    next() {
        this.splidejs.go('+${i}');
    }

    prev() {
        this.splidejs.go('-${i}');
    }
}


// 各クラスの初期化
const splidejsManager = new SplidejsManager();
// const imageSwitcher = new ImageSwitcher();
let imageSwitcher;
document.addEventListener('DOMContentLoaded', () => {
    splidejsManager.initializeSplitejs();
});

// window.addEventListener('load', () => {
//     imageSwitcher = new ImageSwitcher();
//     window.addEventListener('resize', () => imageSwitcher.switchImageIfRotated());
// });