
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
}
export default ChatRepository;
