class ProductRepository {
    domain = "https://localhost:32768";
    apiDomain = this.domain + "/Product";

    async GetProducts() {
        const response = await fetch(`${this.apiDomain}`, {
            method: 'GET',
            //headers: { 'Authorization': `Bearer ${jwtToken}` },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async GetPageProducts(currentPage, amount) {
        const response = await fetch(`${this.apiDomain}/paged/?currentPage=${currentPage}&amount=${amount}`, {
            method: 'GET',
            //headers: { 'Authorization': `Bearer ${jwtToken}` },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async GetProductBy(id) {
        const response = await fetch(`${this.apiDomain}/${id}`, {
            method: 'GET',
            //headers: { 'Authorization': `Bearer ${jwtToken}` },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async AddProduct(product) {
        const response = await fetch(`${this.apiDomain}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                //'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(product),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async EditProduct(product) {
        const response = await fetch(`${this.apiDomain}/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                //'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async DeleteProduct(id) {
        const response = await fetch(`${this.apiDomain}/${id}`, {
            method: 'DELETE',
            //headers: { 'Authorization': `Bearer ${jwtToken}` },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}
export default ProductRepository;
