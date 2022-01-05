import './UserCard.css';

const UserCard = ({ user, onClick = () => null }) => {
    return (
        <div
            className="user-card"
            onClick={() => onClick(user)}
        >
            <div className="avatar-container">
                <img
                    alt="profile_Img"
                    src={user.img}
                />
            </div>
            <div className="user-info pt-3 pb-3">
                <div className="user-name">{user.username}</div>
                <div className="online-status">{user.status}</div>
            </div>
        </div>
    )
}

export default UserCard;