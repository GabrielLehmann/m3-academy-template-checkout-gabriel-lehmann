import { data } from "jquery";
import { waitElement } from "m3-utils";

export default class Footer {
    constructor() {
        this.init();
    }

    async init() {
        await this.selectors();
        this.createPaymentsIcons();
        this.createVtexpciIcon();
        this.createDevIcons();
        this.onUpdate();
        this.events();
    }

    events() {
        window.addEventListener("hashchange", () => {
            if (window.location.hash == "#/cart" && this.checkoutVazio.style.display == "none") {
                this.listaPrateleira.style.display = "flex";
            }
            if (window.location.hash != "#/cart") {
                this.listaPrateleira.style.display = "none";
            }
        });
        addEventListener("resize", () => {
            this.addCarrossel();
        });
    }

    async selectors() {
        this.checkoutVazio = await waitElement(".empty-cart-content");
        this.checkoutAtivo = await waitElement(".checkout-container");
        this.payments = await waitElement(".footerCheckout__payments");
        this.vtexpci = await waitElement(".footerCheckout__vtexpci");
        this.devIncons = await waitElement(".footerCheckout__developedBy");
        this.listaPrateleira = await waitElement(".footerCheckout__prateleira");
        this.titulo = await waitElement(".transactions-container");
        this.cartTitulo = await waitElement("#cart-title");
        this.titleSlick = await waitElement(".transactions-container");
    }

    onUpdate() {
        let target = this.checkoutVazio;
        let list = this.listaPrateleira;
        let cartTitle = this.cartTitulo;
        let slickTitle = this.titleSlick;

        if (target.style.display == "none" && window.location.hash == "#/cart") {
            list.style.display = "flex";
            list.style.display = "block";
            this.fetchApi();
        } else {
            this.cartTitulo.style.display = "none";
            list.style.display = "none";
        }
        let config = { childList: true, attributes: true };
        let observer = new MutationObserver((mutations) => {
            if (!this.listaPrateleira.classList.contains("fetch")) {
                this.fetchApi();
            }
            mutations.forEach(function (mutation) {
                if (target.style.display != "none") {
                    list.style.display = "none";
                    cartTitle.style.display = "none";
                    if (list.style.display == "none") {
                        slickTitle.style.display = "none";
                    }
                } else {
                    cartTitle.style.display = "block";
                    list.style.display = "flex";
                }
            });
        });

        observer.observe(target, config, cartTitle, slickTitle);
    }

    async addCarrossel() {
        const elemet = await waitElement(".slick-list");
        if ($(elemet).hasClass("slick-initialized")) {
            $(elemet).slick("unslick");
        }
        if (window.innerWidth > 1024) {
            $(elemet).not(".slick-initialized").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
            });
        } else if (window.innerWidth > 375) {
            $(elemet).not(".slick-initialized").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
            });
        } else if (window.innerWidth <= 375) {
            $(elemet).not(".slick-initialized").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
            });
        }
    }

    createPaymentsIcons() {
        this.payments.innerHTML = `
        <ul class="payments-icons-wrapper">
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/masterCardM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/visaM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/amexM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/eloM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/hiperCardM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/payPalM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
            <li>
                <figure>
                    <img
                        src="https://agenciamagma.vteximg.com.br/arquivos/boletoM3Academy.png"
                        alt=""
                    />
                </figure>
            </li>
        </ul>
        `;
    }

    createVtexpciIcon() {
        this.vtexpci.innerHTML = `
        <figure class="vtex-icon">
            <img
                src="https://agenciamagma.vteximg.com.br/arquivos/vtexPCIM3Academy.png"
                alt=""
            />
        </figure>
        `;
    }

    createDevIcons() {
        this.devIncons.innerHTML = `
        <li>
            <a href="https://vtex.com/br-pt/">
                <span>Powered By</span>
                <figure>
                    <img class="vtex-icon" src="https://agenciamagma.vteximg.com.br/arquivos/logoVTEXM3Academy.png" alt="">
                </figure>
            </a>
        </li>

        <li>
            <a href="https://agenciam3.com/">
                <span>Developed By</span>
                <figure>
                    <img class="m3-icon" src="https://agenciamagma.vteximg.com.br/arquivos/logoM3M3Academy.png" alt="">
                </figure>
            </a>
        </li>
        `;
    }

    async fetchApi() {
        this.titulo.innerHTML = `
        <h3 class="title_slick">Você também pode gostar:</h3>
        `;

        fetch(
            "https://m3academy.myvtex.com/api/catalog_system/pub/products/search/?fq=productClusterIds:319"
        )
            .then((response) => response.json())
            .then((data) => {
                const ul = document.createElement("ul");
                ul.classList.add("slick-list");
                this.listaPrateleira.appendChild(ul);

                data.map((item) => {
                    let cores = "";
                    for (let i = 0; i < item.items.length; i++) {
                        cores += `<p>${item.items[i].name}</p>`;
                    }
                    const li = document.createElement("li");
                    li.setAttribute("name", item.itemId);
                    li.classList.add("slick-list__itemList");

                    li.innerHTML = `
                        <figure class="img-container">
                        <img class="itemImg" src="${item.items[0].images[0].imageUrl}">
                        </figure>
                        <figcaption class="itemtName">${item.productName}</figcaption>
                        <div class="itemSku">
                            ${cores}
                        </div>
                        <a class="itemLink" type="button" href="${item.link}">VER PRODUTO</a>
                        `;
                    ul.appendChild(li);
                    this.listaPrateleira.classList.add("fetch");
                });
            })
            .then(() => {
                this.addCarrossel();
            });
    }
}
