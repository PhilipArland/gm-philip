document.addEventListener("DOMContentLoaded", () => {
    const viewer = document.getElementById("viewer");
    const modelCanvas = document.getElementById("modelCanvas");
    const productName = document.getElementById("panelProductName");
    const productTagline = document.getElementById("productTagline");
    const productFeatures = document.getElementById("productFeatures");
    const productDescription = document.getElementById("productDescription");
    const closeButton = document.getElementById("closeViewer");
    const hotspots = document.querySelectorAll(".hotspot");

    let previouslyFocusedElement = null;

    const products = [
        {
            name: "LUX",
            logo: "assets/img/lux-mirror-text-logo.webp",
            model: "assets/models/lux.glb",

            tagline: "Slim by Design. Brilliant by Nature.",

            description:
                "Experience a new level of bathroom luxury with LUX, an ultra-slim illuminated mirror designed to combine refined aesthetics with exceptional lighting.",

            features: [
                "Ultra-slim 0.4-inch profile",
                "Uniform, brilliant LED illumination",
                "Customizable LED layouts and lighting tones",
                "Made-to-order sizing and designs"
            ]
        },
        {
            name: "ALLURE",
            logo: "assets/img/allure-mirror-text-logo.webp",
            model: "assets/models/allure.glb",

            tagline: "Framed in Elegance. Designed to Shine.",

            description:
                "The ALLURE collection combines a refined brushed aluminum frame with integrated LED illumination. Available in versatile shapes and sophisticated finishes, it brings a polished, contemporary look to bathrooms and interior spaces.",

            features: [
                "Brushed aluminum frame",
                "Integrated LED lighting",
                "Round, oval, rectangular, and custom designs",
                "Black, silver, gold, and bronze finishes"
            ]
        }
    ];

    function openProduct(index) {
        const product = products[index];
        productTagline.textContent = product.tagline;

        productFeatures.replaceChildren(
            ...product.features.map((feature) => {
                const li = document.createElement("li");
                li.textContent = feature;
                return li;
            })
        );

        if (!product) return;

        previouslyFocusedElement = document.activeElement;

        productName.src = product.logo;
        productName.alt = `${product.name} Mirror`;
        productDescription.textContent = product.description;

        // Load the selected 3D model.
        modelCanvas.src = product.model;
        modelCanvas.alt = `3D model of ${product.name}`;

        viewer.classList.add("is-open");
        viewer.setAttribute("aria-hidden", "false");
        viewer.inert = false;
        document.body.classList.add("viewer-open");

        closeButton.focus();
    }

    function closeViewer() {
        if (!viewer.classList.contains("is-open")) return;

        viewer.classList.remove("is-open");
        viewer.setAttribute("aria-hidden", "true");
        viewer.inert = true;
        document.body.classList.remove("viewer-open");

        // Stop auto-rotation and release the current model.
        modelCanvas.pause();
        modelCanvas.removeAttribute("src");

        if (
            previouslyFocusedElement &&
            document.contains(previouslyFocusedElement)
        ) {
            previouslyFocusedElement.focus();
        }
    }

    hotspots.forEach((hotspot) => {
        hotspot.addEventListener("click", () => {
            const index = Number(hotspot.dataset.product);
            openProduct(index);
        });
    });

    closeButton.addEventListener("click", closeViewer);
    const backButton = document.getElementById("backToCollection");
    backButton.addEventListener("click", closeViewer);

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            viewer.classList.contains("is-open")
        ) {
            closeViewer();
        }
    });

    // Log model loading errors to help diagnose incorrect file paths.
    modelCanvas.addEventListener("error", () => {
        console.error(
            "Unable to load the 3D model:",
            modelCanvas.src
        );
    });
});