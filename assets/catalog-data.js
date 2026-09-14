
/* --- DATA --- */
const cups = [
    { id: 1, name: "Vaso Chiky", price: 6.00, img: "/tenants/deli-fresas/builder/vaso-chiky.webp", limits: { cream: 2, fruit: 1, jelly: 1, topping: 2 } },
    { id: 2, name: "Vaso Pequeño", price: 8.00, img: "/tenants/deli-fresas/builder/vaso-pequeno.webp", limits: { cream: 2, fruit: 1, jelly: 2, topping: 2 } },
    { id: 3, name: "Vaso Mediano", price: 12.00, img: "/tenants/deli-fresas/builder/vaso-mediano.webp", limits: { cream: 3, fruit: 2, jelly: 3, topping: 3 } },
    { id: 4, name: "Vaso Grande", price: 16.00, img: "/tenants/deli-fresas/builder/vaso-grande.webp", limits: { cream: 3, fruit: 2, jelly: 3, topping: 4 } }
];

const liquids = [
    { name: "Fosh (Fudge)", img: "/tenants/deli-fresas/options/jalea-fudge.webp" },
    { name: "Manjar Blanco", img: "/tenants/deli-fresas/options/jalea-manjar.webp" },
    { name: "Leche Condensada", img: "/tenants/deli-fresas/options/jalea-leche-condensada.webp" },
    { name: "Jalea de Fresa", img: "/tenants/deli-fresas/options/jalea-fresa.webp" }
];

const creams = [
    { name: "Clásica", img: "/tenants/deli-fresas/options/crema-clasica.webp" },
    { name: "Maracumango", img: "/tenants/deli-fresas/options/crema-maracumango.webp" },
    { name: "Choco oreo", img: "/tenants/deli-fresas/options/crema-choco-oreo.webp" }
    // Sabores pausados temporalmente; conservar para una futura reactivación:
    // { name: "Morochas (Mar)", img: "/tenants/deli-fresas/options/crema-morochas.webp" },
    // { name: "Chocochips (Jue)", img: "/tenants/deli-fresas/options/crema-chocochips.webp" },
    // { name: "Chocolúcuma (Finde)", img: "/tenants/deli-fresas/options/crema-chocolucuma.webp" },
    // { name: "Moka (Finde)", img: "/tenants/deli-fresas/options/crema-moka.webp" },
    // { name: "Chocomenta (Finde)", img: "/tenants/deli-fresas/options/crema-chocomenta.webp" }
];

const fruits = [
    { name: "Fresas", img: "/tenants/deli-fresas/options/fruta-fresa.webp" },
    { name: "Plátano", img: "/tenants/deli-fresas/options/fruta-platano.webp" }
];

const toppings = [
    { name: "Gomita Delfín", img: "/tenants/deli-fresas/options/topping-gomita-delfin.webp" },
    { name: "Gomita Gusano", img: "/tenants/deli-fresas/options/topping-gomita-gusano.webp" },
    { name: "Gomita Osito", img: "/tenants/deli-fresas/options/topping-gomita-osito.webp" },
    { name: "Gomita Sandía", img: "/tenants/deli-fresas/options/topping-gomita-sandia.webp" },
    { name: "Chispas Blancas", img: "/tenants/deli-fresas/options/topping-chispas-blancas.webp" },
    { name: "Chispas Negras", img: "/tenants/deli-fresas/options/topping-chispas-negras.webp" },
    { name: "Choco Maní", img: "/tenants/deli-fresas/options/topping-choco-mani.webp" },
    { name: "Chin Chin", img: "/tenants/deli-fresas/options/topping-chin-chin.webp" },
    { name: "Granola", img: "/tenants/deli-fresas/options/topping-granola.webp" },
    { name: "Mini Pícaras", img: "/tenants/deli-fresas/options/topping-mini-picaras.webp" },
    { name: "Mini Morochas", img: "/tenants/deli-fresas/options/topping-mini-morochas.webp" },
    { name: "Oreo Trozos", img: "/tenants/deli-fresas/options/topping-oreo.webp" },
    { name: "Choco Yogurt", img: "/tenants/deli-fresas/options/topping-choco-yogurt.webp" },
    { name: "Marshmellows", img: "/tenants/deli-fresas/options/topping-marshmallows.webp" },
    { name: "Doña Pepa", img: "/tenants/deli-fresas/options/topping-dona-pepa.webp" },
    { name: "Maní", img: "/tenants/deli-fresas/options/topping-mani.webp" },
    { name: "Barquillo", img: "/tenants/deli-fresas/options/topping-barquillo.webp" }
];

/*
 * Estos precios se actualizaron primero en la carta local. El catálogo administrado
 * todavía puede responder temporalmente con los valores anteriores y app.js hidrata
 * esos datos después de cargar la página. Este guard solo corrige esos valores viejos
 * concretos; las selecciones del cliente (por ejemplo S/ 6) siguen funcionando normal.
 */
const localMenuPriceGuards = [
    {
        selector: '#card-helado-soft .static-price-tag',
        stale: ['S/ 2.00', 'Desde S/ 2.00'],
        current: 'S/ 3.00'
    },
    {
        selector: '#price-card-sundae',
        stale: ['S/ 4.00', 'Desde S/ 4.00'],
        current: 'Desde S/ 5.00'
    },
    {
        selector: '#price-card-artesanal-cono',
        stale: ['S/ 2.50', 'Desde S/ 2.50'],
        current: 'Desde S/ 3.00'
    }
];

function restoreUpdatedMenuPrices() {
    let corrected = false;

    localMenuPriceGuards.forEach(({ selector, stale, current }) => {
        const node = document.querySelector(selector);
        if (!node) return;

        const displayed = node.textContent.trim();
        if (!stale.includes(displayed)) return;

        node.textContent = current;
        corrected = true;
    });

    return corrected;
}

window.addEventListener('DOMContentLoaded', () => {
    // Cubre el caso en que la API respondió antes de DOMContentLoaded.
    restoreUpdatedMenuPrices();

    // Cubre el caso normal: app.js termina el fetch después y rehidrata la carta.
    const priceSyncObserver = new MutationObserver(() => {
        if (restoreUpdatedMenuPrices()) priceSyncObserver.disconnect();
    });

    priceSyncObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // No se necesita observar cambios indefinidamente una vez terminada la carga inicial.
    window.setTimeout(() => priceSyncObserver.disconnect(), 15000);
}, { once: true });
