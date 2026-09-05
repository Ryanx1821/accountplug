const SHOP_ID = "258680";
const SHOP_DOMAIN = "easynfalol.sellauth.com";

let allProducts = [];
let currentTab = 'nfa';
let currentSubFilter = 'All';

async function loadProducts() {
    try {
        // Fetch live data securely from our Vercel backend
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error("Network response was not ok");
        
        allProducts = await response.json();
        
        // Enhance products with custom classification
        allProducts.forEach(p => {
            const groupName = p.group ? p.group.name : '';
            if (p.name === 'Server Boosts [ 1 Month / 3 Month ] [ Keys ]') {
                p.name = 'Server Boosts';
            }
            if (groupName === 'NFA Accounts' || groupName === 'NFA') {
                p.tabCategory = 'nfa';
                p.subCategory = p.name.replace(/ NFA/g, '').trim();
            } else if (groupName === 'Extra') {
                p.tabCategory = 'extra';
                p.subCategory = p.name;
            } else {
                p.tabCategory = 'cheats';
                p.subCategory = groupName || 'Other';
            }
        });
        
        updateCounts();
        renderSubFilters();
        renderProducts();
    } catch (e) {
        console.error("Error fetching products:", e);
        document.getElementById('loading').innerText = "Failed to load inventory.";
    }
}

function updateCounts() {
    const nfaCount = allProducts.filter(p => p.tabCategory === 'nfa').length;
    const cheatsCount = allProducts.filter(p => p.tabCategory === 'cheats').length;
    const extraCount = allProducts.filter(p => p.tabCategory === 'extra').length;
    
    document.getElementById('nfa-count').innerText = nfaCount;
    document.getElementById('cheats-count').innerText = cheatsCount;
    document.getElementById('extra-count').innerText = extraCount;
    
    // Calculate total sales from all products
    const totalSales = allProducts.reduce((sum, p) => sum + (p.products_sold || 0), 0);
    document.getElementById('total-sales').innerText = totalSales;
}

function renderSubFilters() {
    const subFiltersContainer = document.getElementById('sub-filters');
    subFiltersContainer.innerHTML = '';
    
    const tabProducts = allProducts.filter(p => p.tabCategory === currentTab);
    
    if (tabProducts.length === 0) return;
    
    const subCategories = ['All', ...new Set(tabProducts.map(p => p.subCategory))];
    
    if (!subCategories.includes(currentSubFilter)) {
        currentSubFilter = 'All';
    }
    
    subCategories.forEach(subCat => {
        const btn = document.createElement('button');
        btn.className = `sub-filter-btn ${subCat === currentSubFilter ? 'active' : ''}`;
        btn.innerText = subCat;
        btn.onclick = () => {
            currentSubFilter = subCat;
            renderSubFilters();
            renderProducts();
        };
        subFiltersContainer.appendChild(btn);
    });
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    
    loading.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.innerHTML = '';
    
    const tabProducts = allProducts.filter(p => p.tabCategory === currentTab);
    const filteredProducts = currentSubFilter === 'All' 
        ? tabProducts 
        : tabProducts.filter(p => p.subCategory === currentSubFilter);
    
    let itemsToRender = [];
    
    if (currentTab === 'nfa' || currentTab === 'extra') {
        filteredProducts.forEach(product => {
            let imageUrl = 'NFA_acconts3sd2.png';
            if (product.images && product.images.length > 0) {
                imageUrl = product.images[0].url;
            }
            
            if (product.variants && product.variants.length > 0) {
                product.variants.forEach((variant) => {
                    let cardTitle = `${product.name} - ${variant.name}`;
                    
                    if (product.name === 'Server Boosts') {
                        let vName = variant.name.replace('1 Month', '').replace('3 Month', '').trim();
                        let monthStr = variant.name.includes('3 Month') ? '3 Month' : '1 Month';
                        cardTitle = `${monthStr} ${vName} [ Key ]`;
                    }
                    
                    itemsToRender.push({
                        title: cardTitle,
                        imageUrl: imageUrl, // ALWAYS the first image as requested
                        stockCount: variant.stock,
                        priceText: `$${parseFloat(variant.price).toFixed(2)}`,
                        cartData: JSON.stringify([{ productId: product.id, variantId: variant.id, quantity: 1 }])
                    });
                });
            } else {
                itemsToRender.push({
                    title: product.name,
                    imageUrl: imageUrl, // ALWAYS the first image
                    stockCount: product.stock_count,
                    priceText: `$${parseFloat(product.price || 0).toFixed(2)}`,
                    cartData: JSON.stringify([{ productId: product.id, quantity: 1 }])
                });
            }
        });
    } else {
        filteredProducts.forEach(product => {
            let imageUrl = 'NFA_acconts3sd2.png';
            if (product.images && product.images.length > 0) {
                imageUrl = product.images[0].url;
            }
            
            let priceText = '$0.00';
            if (product.variants && product.variants.length > 0) {
                const prices = product.variants.map(v => parseFloat(v.price));
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                priceText = min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} - $${max.toFixed(2)}`;
            } else if (product.price) {
                priceText = `$${parseFloat(product.price).toFixed(2)}`;
            }
            
            let stock = product.stock;
            if (stock === null) {
                stock = product.stock_count;
            }
            
            itemsToRender.push({
                title: product.name,
                imageUrl: imageUrl,
                stockCount: stock,
                priceText: priceText,
                cartData: JSON.stringify([{ productId: product.id, quantity: 1 }])
            });
        });
    }
    
    if (itemsToRender.length === 0) {
        grid.innerHTML = '<div style="color: #8b99af; padding: 20px;">No products found in this category.</div>';
        return;
    }
    
    itemsToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        let stockDisplay, isOutOfStock;
        
        // Sellauth stock logic:
        // -1 usually means unlimited/dynamic
        // null / 0 means out of stock
        if (item.stockCount === -1) {
            stockDisplay = 'Unlimited In Stock';
            isOutOfStock = false;
        } else if (item.stockCount === null || item.stockCount === undefined || item.stockCount === 0) {
            stockDisplay = 'Out of Stock';
            isOutOfStock = true;
        } else {
            stockDisplay = `${item.stockCount} In Stock`;
            isOutOfStock = false;
        }
        
        const stockClass = isOutOfStock ? 'product-stock out' : 'product-stock';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${item.imageUrl}" alt="${item.title}" onerror="this.src='NFA_acconts3sd2.png';">
            </div>
            <div class="product-info">
                <div class="product-title">${item.title}</div>
                <div class="${stockClass}">${stockDisplay}</div>
                <div class="product-price">${item.priceText}</div>
                <button 
                    class="buy-btn"
                    ${isOutOfStock ? 'disabled' : ''}
                    data-sellauth-shop="${SHOP_ID}" 
                    data-sellauth-shop-url="https://${SHOP_DOMAIN}" 
                    data-sellauth-cart='${item.cartData}'
                >
                    ${isOutOfStock ? 'Out of Stock' : 'Purchase'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        currentTab = e.currentTarget.getAttribute('data-tab');
        currentSubFilter = 'All'; // Reset sub-filter when changing tabs
        renderSubFilters();
        renderProducts();
    });
});

// Initialize
loadProducts();
