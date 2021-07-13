import "./styles/main.scss";
import * as htmlToImage from "html-to-image";
class Pills {
    constructor(el, data) {
        this.el = document.querySelector(el);
        this.data = data;

        this.init();
    }

    init() {
        const fragment = document.createDocumentFragment();

        this.data.map((datum) => {
            console.log({ datum });
            const spanEl = document.createElement("span");
            spanEl.innerHTML = datum;
            fragment.appendChild(spanEl);
        });

        this.el.appendChild(fragment);
    }
}

class Download {
    constructor(btn, container) {
        this.btn = document.querySelector(btn);
        this.container = document.querySelector(container);

        this.init();
    }

    init() {
        function saveAs(blob, fileName) {
            var elem = window.document.createElement("a");
            elem.href = blob;
            elem.download = fileName;
            elem.style = "display:none;";
            (document.body || document.documentElement).appendChild(elem);
            if (typeof elem.click === "function") {
                elem.click();
            } else {
                elem.target = "_blank";
                elem.dispatchEvent(
                    new MouseEvent("click", {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    })
                );
            }
            URL.revokeObjectURL(elem.href);
            elem.remove();
        }

        this.btn.addEventListener("click", function () {
            console.log("clicked");
            htmlToImage
                .toPng(document.getElementById("banner"))
                .then(function (dataUrl) {
                    saveAs(dataUrl, "my-node.png");
                });
        });
    }
}

new Pills("#description", ["MongoDB", "Express.js", "React.js", "Node.js"]);
new Download("#download-btn", "#banner");
