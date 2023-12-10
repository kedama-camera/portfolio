class ModalController {

    openModalElements;
    closeModalElements;

    constructor() {
        this.openModalElements = document.querySelectorAll(".open-modal");
        this.openModalElements.forEach((el) => {
            el.addEventListener("click", () => { this.open(el) });
        });

        this.closeModalElements = document.querySelectorAll(".close-modal");
        this.closeModalElements.forEach((el) => {
            el.addEventListener("click", () => { this.close(el) });
        });


    }

    getModalElement(el) {
        const target = el.dataset.target;
        if (target) {
            const id = "#" + target;
            const element = document.querySelector(id);
            if (!element) {
                console.warn("対象のモーダルが見当たりませんでした。id : " + id);
            }
            return element;
        }
        return null;
    }

    open(el) {
        const modalElement = this.getModalElement(el);
        if (modalElement) {
            modalElement.classList.add("active");
        }
    }

    close(el) {
        const modalElement = this.getModalElement(el);
        if (modalElement) {
            modalElement.classList.remove("active")
        }
    }
}



// 各クラスの初期化
window.addEventListener('load', () => {
    const splidejsManager = new ModalController();
});