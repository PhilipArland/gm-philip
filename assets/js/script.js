(() => {
    'use strict';

    const products = [
        {
            name: 'LUX Mirror',
            description: 'A clean rectangular mirror design with a luminous border. A stylish option for modern bathrooms, bedrooms, and dressing areas.',
            model: 'lux.glb'
        },
        {
            name: 'ECLIPSE Mirror',
            description: 'A minimalist rectangular mirror with a distinctive central detail. Ideal for contemporary interiors.',
            model: 'eclipse.glb'
        },
        {
            name: 'LUMIÈRE Mirror',
            description: 'A softly rounded rectangular silhouette that creates a calm, elegant look in your interior.',
            model: 'lumiere.glb'
        },
        {
            name: 'ALLURE Mirror',
            description: 'A graceful arched silhouette with a refined frame.',
            model: 'allure.glb'
        },
        {
            name: 'HOLLYWOOD Mirror',
            description: 'A vanity-style mirror with perimeter bulb lighting details.',
            model: 'hollywood.glb'
        },
        {
            name: 'ETCH Mirror',
            description: 'A decorative mirror featuring etched-style corner detailing.',
            model: 'etch.glb'
        },
        {
            name: 'LED Strip Mirror',
            description: 'A geometric design featuring vertical light elements.',
            model: 'led-strip.glb'
        },
        {
            name: 'Bevel & Faucet Demo Mirror',
            description: 'A classic square mirror used to demonstrate a bevelled edge and faucet pairing.',
            model: 'bevel-faucet.glb'
        }
    ];

    const viewer = document.getElementById('viewer');
    const modelCanvas = document.getElementById('modelCanvas');
    const nameEl = document.getElementById('productName');
    const descEl = document.getElementById('productDescription');
    const closeButton = document.getElementById('closeViewer');

    let current = 0;
    let finish = 'Gold';
    let lastTrigger = null;

    function openProduct(index, trigger) {
        const product = products[index];
        if (!product) return;

        current = index;
        finish = 'Gold';
        lastTrigger = trigger;

        nameEl.textContent = product.name;
        descEl.textContent = product.description;

        // Load the selected product's 3D model.
        if (modelCanvas.getAttribute('src') !== product.model) {
            modelCanvas.setAttribute('src', product.model);
        }

        document.querySelectorAll('.finish').forEach(button => {
            button.classList.toggle(
                'active',
                button.dataset.finish === finish
            );
        });

        viewer.classList.add('open');
        viewer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        closeButton.focus();
    }

    function closeProduct() {
        viewer.classList.remove('open');
        viewer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (lastTrigger) lastTrigger.focus();
    }

    document.querySelectorAll('.hotspot').forEach(button => {
        button.addEventListener('click', () => {
            openProduct(Number(button.dataset.product), button);
        });
    });

    closeButton.addEventListener('click', closeProduct);

    // Close when the user clicks the backdrop.
    viewer.addEventListener('click', event => {
        if (event.target === viewer) closeProduct();
    });

    // Close with Escape.
    window.addEventListener('keydown', event => {
        if (
            event.key === 'Escape' &&
            viewer.classList.contains('open')
        ) {
            closeProduct();
        }
    });

    document.querySelectorAll('.finish').forEach(button => {
        button.addEventListener('click', () => {
            finish = button.dataset.finish;

            document.querySelectorAll('.finish').forEach(item => {
                item.classList.toggle('active', item === button);
            });
        });
    });

    document.getElementById('inquire').addEventListener('click', () => {
        const subject = encodeURIComponent(
            `Inquiry about ${products[current].name}`
        );

        const body = encodeURIComponent(
            `Hello Grand Mirrors,\n\n` +
            `I am interested in the ${products[current].name}.\n` +
            `Preferred finish: ${finish}.\n\n` +
            `Please provide pricing, dimensions, and availability.\n\n` +
            `Thank you.`
        );

        // Replace with your actual business email address.
        window.location.href =
            `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
    });
})();