import './Chat.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import img from './images/profilePic.png'
import moment from 'moment';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useContext, useEffect, useState } from 'react';
import Context from './Context/Context';
import UserCard from './UserCard';

const Chat = () => {
    const {
        socket,
        currentUser,
        users,
        setUsers,
        chats,
        setChats
    } = useContext(Context);
    const [message, setMessage] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        });

        socket.on('user_connected', user => {
            setUsers(prev => [...prev, user])
        })

        socket.on('user_disconnected', user => {
            setUsers(prev => prev.filter(item => item.id !== user.id))
            setSelectedChat(null);
        })

        socket.on('private_message', payload => {

            const userRef = payload.refs.find(item => item !== currentUser.id)
            setChats(prev => {
                return {
                    ...prev,
                    [userRef]: {
                        chatId: payload._id,
                        messages: payload.messages
                    }
                }
            })
            // setUsers(prev => prev.map(item => {
            //     if(item.id === payload.sender.id){
            //         return { ...item, chat: [...item.chat, payload]}
            //     }
            //     else{
            //         return item
            //     }
            // }))

        })
    }, [])
    console.log(chats);
    const onSend = () => {
        const chatId = socket.id > selectedChat.id ? selectedChat.id.slice(0, 12) + socket.id.slice(12, 24) : socket.id.slice(0, 12) + selectedChat.id.slice(12, 24);
        // setUsers(prev => prev.map(item => {
        //     if(item.id === selectedChat.id){
        //         return { 
        //             ...item, 
        //             chat: [
        //                 ...item.chat, 
        //                 {
        //                     content: message,
        //                     sentTime: 'Just now',
        //                     sender: { id: socket.id, username: currentUser.username },
        //                     receiver: { id: selectedChat.id, username: selectedChat.username }
        //                 }
        //             ]
        //         }
        //     }
        //     else{
        //         return item
        //     }
        // }))

        setChats(prev => {
            let messages = prev !== null && prev[selectedChat.id]? prev[selectedChat.id].messages : [];            
            return {
                ...prev,
                [selectedChat.id]: {
                    chatId,
                    messages: [
                        ...messages,
                        {
                            content: message,
                            receiver: selectedChat.id,
                            sender: socket.id,
                            sentTime: Date.now()
                        }
                    ]
                }
            }
        })
        socket.emit('private_message', {
            data: {
                _id: chatId,
                refs: [selectedChat.id, socket.id],
                content: message,
                receiver: selectedChat.id,
                sender: socket.id,
                sentTime: Date.now()
            }
        })
    }

    return (
        <div className="chat-container">
            <div className="user-list-section">
                <div className="user-heading ps-3 pt-2">
                    <h4>Users</h4>
                </div>

                <div className="users-container">
                    <div className="user-container">
                        {
                            users.length > 0 ?
                                users.map((user, index) => {
                                    return (
                                        <UserCard
                                            key={Math.random() + index}
                                            user={{
                                                img,
                                                ...user,
                                            }}
                                            onClick={(user) => setSelectedChat(user)}
                                        />
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </div>
            <div className="chat-section">
                <div className="current-user pt-2 pb-2">
                    <div
                        className="current-user-card"
                    >
                        {
                            selectedChat ?
                                <>
                                    <div className="avatar-container">
                                        <img
                                            alt="profile_Img"
                                            src={selectedChat.img}
                                        />
                                    </div>
                                    <div className="user-info pt-3 pb-3">
                                        <div className="user-name">{selectedChat.username}</div>
                                        <div className="online-status">{selectedChat.status}</div>
                                    </div>
                                </>
                                :
                                <h4>Chat</h4>
                        }
                    </div>
                </div>
                <div className="chat-area">
                    <MainContainer style={{ border: 'none' }}>
                        <ChatContainer>
                            <MessageList>
                                {
                                    selectedChat && chats && chats[selectedChat?.id] ?
                                        // users.find(item => item.id === selectedChat.id)?.chat.map((item, index) => {
                                        //     return <Message
                                        //         key={Math.random() + index}
                                        //         model={{
                                        //             message: item.content,
                                        //             sentTime: item.sentTime,
                                        //             sender: item.sender.username,
                                        //             direction: item.sender.id === socket.id ? 1 : 0,
                                        //             position: 0
                                        //         }}>
                                        //         <Message.Footer
                                        //             sender={item.sender.username}
                                        //             sentTime={item.sentTime}
                                        //         />
                                        //     </Message>
                                        // })
                                        chats[selectedChat.id].messages.map((item, index) => {
                                            return <Message
                                                    key={Math.random() + index}
                                                    model={{
                                                        message: item.content,
                                                        sentTime: moment(item.sentTime).fromNow(),
                                                        sender: selectedChat.username,
                                                        direction: item.sender === socket.id ? 1 : 0,
                                                        position: 0
                                                    }}>
                                                    <Message.Footer
                                                        sender={item.username}
                                                        sentTime={moment(item.sentTime).fromNow()}
                                                    />
                                                </Message>
                                        })
                                        :
                                        null
                                }
                            </MessageList>
                            <MessageInput
                                placeholder="Type message here"
                                onChange={text => setMessage(text)}
                                onSend={onSend}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </div>
    )
}

export default Chat;