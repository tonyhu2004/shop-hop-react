
class ChatRepository {
    domain = "https://localhost:7072";
    apiDomain = this.domain + "/Chat";

    async GetChatBy(user1Id, user2Id) {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${this.apiDomain}/?user1Id=${user1Id}&user2Id=${user2Id}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            return await response.json();
        } catch (error) {
            console.log(error.response.messages)
            throw new Response(error.response.messages, { status: error.response.status });
        }
    }

    async AddToGroup(chatId, connectionId) {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${this.apiDomain}/Group/${chatId}/${connectionId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
        if (response.status === 200) {
            return true;
        }
        else {
            throw new Response("", { status: response.status });
        }
    }

    async SendMessage(message) {
        console.log(message);
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`https://localhost:7072/Chat/Message`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: message,
        })
        if (response.status === 200) {
            return true;
        }
        else {
            console.log(response);
            throw new Response("", { status: response.status });
        }
    }
}
export default ChatRepository;
