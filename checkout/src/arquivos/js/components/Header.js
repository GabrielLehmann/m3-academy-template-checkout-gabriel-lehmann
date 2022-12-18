// import waitForEl from "../helpers/waitForEl";
import { waitElement } from "m3-utils";

export default class Header {
    constructor() {
        this.init();
    }

    async init() {
        await this.selectors();
        this.createProgressBar();
        await this.progressBarProgress();
    }

    async selectors() {
        this.item = await waitElement("#progressBar", {
            //#my-element pode ser a class ou o id do elemento html qeu vocÊ quer pegar
            timeout: 5000, // vai esperar 5 segundos antes de rejeitar a promise
            interval: 1000, // vai verificar a cada 1 segundo se o elemento existe
        });
        this.header = await waitElement(".headerCheckout");
        this.progressBar = await waitElement("#progressBar");
    }
    createProgressBar() {
        if (this.progressBar && window.innerWidth > 1024) {
            this.progressBar.innerHTML = `
                <ul>
                    <li>
                        <div class="containerLi">
                            <div>
                                <p class="progress-bar-text">Meu Carrinho</p>
                                <p id="progress-bar-circle-1" class="progress-bar-circle-1"></p>
                                <p class="progress-bar-line-1"></p>
                            </div>
                        </div>
                    </li>
                    <li class="central">
                        <div class="containerLi">
                            <div>
                                <p class="progress-bar-text">Dados Pessoais</p>
                                <p id="progress-bar-circle-2" class="progress-bar-circle-2"></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="containerLi">
                            <div>
                                <p class="progress-bar-text">Pagamento</p>
                                <p id="progress-bar-circle-3" class="progress-bar-circle-3"></p>
                                <p class="progress-bar-line-2"></p>
                            </div>
                        </div>
                    </li>
                </ul>
            `;
        }
        if (this.progressBar && window.innerWidth <= 1024) {
            this.progressBar.innerHTML = ``;
        }
    }
    async progressBarProgress() {
        if (this.progressBar && window.innerWidth > 1024) {
            const progressBarList = document.querySelectorAll("#progressBar ul li");
            progressBarList.forEach((li) => {
                if (window.location.href === "https://m3academy.myvtex.com/checkout/#/cart") {
                    if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                        li.children[0].children[0].children["progress-bar-circle-1"].classList.add(
                            "active"
                        );
                        console.log("ativou 1");
                    }
                    if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                        if (
                            li.children[0].children[0].children[
                                "progress-bar-circle-2"
                            ].classList.contains("active")
                        ) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-2"
                            ].classList.remove("active");
                            console.log("removeu 2");
                        }
                    }
                    if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                        if (
                            li.children[0].children[0].children[
                                "progress-bar-circle-3"
                            ].classList.contains("active")
                        ) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-3"
                            ].classList.remove("active");
                            console.log("removeu 3");
                        }
                    }
                } else if (
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/email" ||
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/profile" ||
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/shipping"
                ) {
                    if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                        if (
                            li.children[0].children[0].children[
                                "progress-bar-circle-1"
                            ].classList.contains("active")
                        ) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-1"
                            ].classList.remove("active");
                        }

                        if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-2"
                            ].classList.add("active");
                        }
                        if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-3"
                                ].classList.contains("active")
                            ) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-3"
                                ].classList.remove("active");
                            }
                        }
                    }
                } else if (
                    window.location.href === "https://m3academy.myvtex.com/checkout/#/payment"
                ) {
                    console.log("vendo payment");
                    if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                        if (
                            li.children[0].children[0].children[
                                "progress-bar-circle-1"
                            ].classList.contains("active")
                        ) {
                            console.log("remove 1");
                            li.children[0].children[0].children[
                                "progress-bar-circle-1"
                            ].classList.remove("active");
                        }
                    }
                    if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                        if (
                            li.children[0].children[0].children[
                                "progress-bar-circle-2"
                            ].classList.contains("active")
                        ) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-2"
                            ].classList.remove("active");
                        }
                    }
                    if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                        li.children[0].children[0].children["progress-bar-circle-3"].classList.add(
                            "active"
                        );
                    }
                }
                window.addEventListener("hashchange", () => {
                    console.log("hashchange");
                    if (window.location.hash == "#/cart") {
                        if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-1"
                            ].classList.add("active");
                        }
                        if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-2"
                                ].classList.contains("active")
                            ) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-2"
                                ].classList.remove("active");
                            }
                        }
                        if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-3"
                                ].classList.contains("active")
                            ) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-3"
                                ].classList.remove("active");
                            }
                        }
                    } else if (
                        window.location.hash == "#/email" ||
                        window.location.hash == "#/profile" ||
                        window.location.hash == "#/shipping"
                    ) {
                        if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-1"
                                ].classList.contains("active")
                            ) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-1"
                                ].classList.remove("active");
                            }

                            if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-2"
                                ].classList.add("active");
                            }
                            if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                                if (
                                    li.children[0].children[0].children[
                                        "progress-bar-circle-3"
                                    ].classList.contains("active")
                                ) {
                                    li.children[0].children[0].children[
                                        "progress-bar-circle-3"
                                    ].classList.remove("active");
                                }
                            }
                        }
                    } else if (window.location.hash == "#/payment") {
                        console.log("vendo payment hash");
                        if (li.children[0].children[0].children["progress-bar-circle-1"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-1"
                                ].classList.contains("active")
                            ) {
                                console.log("remove 1 hash");
                                li.children[0].children[0].children[
                                    "progress-bar-circle-1"
                                ].classList.remove("active");
                            }
                        }
                        if (li.children[0].children[0].children["progress-bar-circle-2"]) {
                            if (
                                li.children[0].children[0].children[
                                    "progress-bar-circle-2"
                                ].classList.contains("active")
                            ) {
                                li.children[0].children[0].children[
                                    "progress-bar-circle-2"
                                ].classList.remove("active");
                            }
                        }
                        if (li.children[0].children[0].children["progress-bar-circle-3"]) {
                            li.children[0].children[0].children[
                                "progress-bar-circle-3"
                            ].classList.add("active");
                        }
                    }
                });
            });
        }
    }
}
