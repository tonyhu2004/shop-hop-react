import { HubConnectionBuilder } from '@microsoft/signalr';


function chatHubConnection(accessToken) {

    return new HubConnectionBuilder()
        .withUrl('https://localhost:7072/chatHub', {
            accessTokenFactory: () => accessToken,
        })
        .withAutomaticReconnect()
        .build();
}
export default chatHubConnection;

