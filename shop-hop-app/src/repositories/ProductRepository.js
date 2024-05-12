class ProductRepository {
    domain = "https://localhost:7072";
    apiDomain = this.domain + "/Product";

    async GetProducts() {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }

    async GetPageProducts(currentPage, amount) {
        const response = await fetch(`${this.apiDomain}/paged/?currentPage=${currentPage}&amount=${amount}`, {
            method: 'GET',
        });
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }

    async GetProductBy(id) {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${this.apiDomain}/${id}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            return await response.json();
        } catch (error) {
            console.log(error.response.messages)
            throw new Response(error.response.messages, { status: error.response.status });
        }
    }

    async GetProductDetailsBy(id) {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${this.apiDomain}/${id}/Details`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            return await response.json();
        } catch (error) {
            console.log(error.response.messages)
            throw new Response(error.response.messages, { status: error.response.status });
        }
    }

    async AddProduct(product) {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: product,
        })
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }

    async EditProduct(product, id) {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: product,
        });
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }

    async DeleteProduct(id) {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }
}
export default ProductRepository;
