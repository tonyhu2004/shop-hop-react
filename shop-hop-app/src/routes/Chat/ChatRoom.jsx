
import {useEffect, useRef, useState} from 'react';
import chatHubConnection from "../../Services/chatHubConnection.jsx";
import * as signalR from "@microsoft/signalr";
import {useParams} from "react-router-dom";
import ChatRepository from "../../repositories/ChatRepository.js";
import "./ChatRoom.css";

function ChatRoom() {

    const { user1Id, user2Id } = useParams();
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({
        id: "",
        chatId: "",
        senderUserId: "",
        text: "",
        sendDate: "",
    });
    const [currentUserId, setCurrentUserId] = useState("");
    const connection = chatHubConnection(localStorage.getItem('accessToken'));
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollDown();
    }, [messages]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const chatRepository = new ChatRepository();
                const Chat = await chatRepository.GetChatBy(user1Id, user2Id)
                setChatId(Chat.id);
                setMessages(Chat.messageViewModels.slice().reverse());
                setCurrentUserId(Chat.currentUserId);
            }
            catch (error){
                console.error('Error fetching messages:', error);
            }
        }
        getMessages().catch(console.error);
    }, [user1Id, user2Id]);

    useEffect(() => {
        if(chatId !== ""){
            const startConnection = async () => {
                try {
                    await connection.start()
                        .then(() => {
                            console.log('SignalR Connected!');
                        })

                } catch (error) {
                    console.error('Error starting SignalR connection:', error);
                }
                // await connection.invoke('AddToGroup', chatId)
                //     .then(()=>{
                //         console.log('Group created/ added user to group');
                //     })
                //     .catch((error)=>{
                //         console.log(" get it ")
                //         console.error(error)
                //     })

            };

            connection.on('ReceiveMessage', (message) => {
                setMessages([message, ...messages]);
            });

            startConnection().catch(console.error);

            return () => {
                connection.off('ReceiveMessage');
            };
        }
    }, [connection, chatId, messages]);

    const handleChange = (name, value) => {
        setNewMessage((prevMessage) => ({
            ...prevMessage,
            [name]: value,
        }));
    };
    const sendMessage = (e) => {
        e.preventDefault();

        if (newMessage.text !== ""){
            try {

                // connection.invoke('SendMessage', {
                //     chatId: chatId,
                //     text: newMessage.text,
                // }).then(() => {
                //     setNewMessage({
                //         id: "",
                //         chatId: "",
                //         senderUserId: "",
                //         text: "",
                //         sendDate: "",
                //     })}
                // ).catch()
                if (connection.state === signalR.HubConnectionState.Connected) {
                    console.log(connection)
                    console.log(newMessage.text);

                    connection.invoke('SendMessageAll', {
                        chatId: chatId,
                        text: newMessage.text,
                    }).then(() => {
                        setNewMessage({
                            id: "",
                            chatId: "",
                            senderUserId: "",
                            text: "",
                            sendDate: "",
                        })}
                    ).catch()
                } else {
                    console.log("Sending message");
                }

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    function scrollDown (){
        if (messagesEndRef !== null){
            messagesEndRef.current.scrollIntoView();
        }
    }
    return (
        (
            localStorage.getItem('accessToken') &&
            <div className="ChatRoom">
                {
                    messages ? (
                            <ul className="MessageList">
                                {messages.map((message, index) => (
                                    currentUserId === message.senderUserId
                                        ? <li className="MessageItem CurrentUserItem" key={index}>{message.text}</li>
                                        : <li className="MessageItem OtherUserItem" key={index}>{message.text}</li>
                                ))}
                            </ul>
                        )
                        :
                        <p>loading...</p>
                }
                <div ref={messagesEndRef}></div>
                <form onSubmit={sendMessage} className="MessageForm">
                    <input
                        className="SendMessageBar"
                        type="text"
                        value={newMessage.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                    />
                    <button className="SendMessageButton" hidden type="submit">Send</button>
                </form>
            </div>
        )
    );
}

export default ChatRoom;
