document.addEventListener("DOMContentLoaded", () => {
    const viewer = document.getElementById("viewer");
    const modelCanvas = document.getElementById("modelCanvas");
    const productName = document.getElementById("productName");
    const productDescription = document.getElementById("productDescription");
    const closeButton = document.getElementById("closeViewer");
    const hotspots = document.querySelectorAll(".hotspot");

    let previouslyFocusedElement = null;

    const products = [
        {
            name: "LUX Mirror",
            model: "assets/models/lux.glb",
            description: "Explore the LUX mirror from every angle."
        },
        {
            name: "ECLIPSE Mirror",
            model: "assets/models/eclipse.glb",
            description: "Explore the ECLIPSE mirror from every angle."
        },
        {
            name: "LUMIÈRE Mirror",
            model: "assets/models/lumiere.glb",
            description: "Explore the LUMIÈRE mirror from every angle."
        },
        {
            name: "ALLURE Mirror",
            model: "assets/models/allure.glb",
            description: "Explore the ALLURE mirror from every angle."
        },
        {
            name: "HOLLYWOOD Mirror",
            model: "assets/models/hollywood.glb",
            description: "Explore the HOLLYWOOD mirror from every angle."
        },
        {
            name: "ETCH Mirror",
            model: "assets/models/etch.glb",
            description: "Explore the ETCH mirror from every angle."
        },
        {
            name: "LED Strip Mirror",
            model: "assets/models/led-strip.glb",
            description: "Explore the LED strip mirror from every angle."
        },
        {
            name: "Bevel & Faucet Demo",
            model: "assets/models/bevel-faucet.glb",
            description: "Explore the bevel and faucet demonstration model."
        }
    ];

    function openProduct(index) {
        const product = products[index];

        if (!product) return;

        previouslyFocusedElement = document.activeElement;

        productName.textContent = product.name;
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