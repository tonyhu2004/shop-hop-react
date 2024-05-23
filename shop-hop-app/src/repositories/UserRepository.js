class UserRepository {
    domain = "https://localhost:7072";
    apiDomain = this.domain + "/User";

    async Login(account) {
        const response = await fetch(`${this.apiDomain}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async Register(account) {
        console.log(account)
        const response = await fetch(`${this.apiDomain}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        })
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad request: Invalid data');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response;
    }

    async Refresh() {
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await fetch(`${this.apiDomain}/refresh`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken: refreshToken}),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async IsUserAuthenticated() {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken){
            return false;
        }
        const response = await fetch(`${this.apiDomain}/manage/info`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })

        return response.ok;
    }
}
export default UserRepository;
