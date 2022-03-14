import './UserSection.css';

const UserSection = () => {
    return (
        <div className="user-section-container bg-primary">
            <div className="create-new-section pt-4 pb-2 ps-2 pe-2">
                <button className="btn btn-secondary">
                    <i className="fa fa-add me-3"></i> New Conversation
                </button>
            </div>
            <div className="search-section pt-2 pb-2 ps-2 pe-2">
                <form className='pt-1 pb-1 ps-2 pe-2'>
                    <input type="text" className="form-control me-1" placeholder="Search"/>
                    <button type='submit' className='p-3'>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserSection;