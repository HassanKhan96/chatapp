import './Chat.css';
import UserSection from './usersSection/UserSection';
import ChatSection from './chatSection/ChatSection';

const Chat = () => {
    return (
        <div className="container-fluid height100">
            <div className='row h-100'>
                <div className='col-3 p-0'>
                    <UserSection />
                </div>
                <div className='col-8 p-0'>
                    <ChatSection />
                </div>
            </div>
        </div>
    )
}

export default Chat