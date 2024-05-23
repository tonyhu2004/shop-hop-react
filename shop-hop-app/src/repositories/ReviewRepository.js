class ReviewRepository {
    domain = "https://localhost:7072";
    apiDomain = this.domain + "/Review";

    async AddReview(review) {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(review),
        })
        if (response.status === 200) {
            return await response.json();
        }
        else {
            throw new Response("", { status: response.status });
        }
    }
}
export default ReviewRepository;
