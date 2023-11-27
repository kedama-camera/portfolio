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
        this.sliderImageElements = document.querySelectorAll(".splide__slide__image");
        this.switchImageIfRotated();
    }

    isHorizontal() {
        const result = (window.innerHeight <= window.innerWidth);
        console.log("isHorizontal : " + result);
        return result;
    }

    switchImageIfRotated() {
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

    scrollInterval = 5000;

    option = {
        type: "fade",
        speed: 1000,
        rewind: true,
    };

    initializeSplitejs(isEnableExtension) {
        if (isEnableExtension) {
            this.splidejs = new Splide('#image-carousel', this.option).mount(window.splide.Extensions);
        } else {
            this.splidejs = new Splide('#image-carousel', this.option).mount();
        }
    }

    enableAutoScroll() {
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
let imageSwitcher;
document.addEventListener('DOMContentLoaded', () => {
    splidejsManager.initializeSplitejs();
    splidejsManager.enableAutoScroll();
});

window.addEventListener('load', () => {
    imageSwitcher = new ImageSwitcher();
    window.addEventListener('resize', () => imageSwitcher.switchImageIfRotated());
});