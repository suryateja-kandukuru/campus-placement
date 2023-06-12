import { Avatar } from 'primereact/avatar';
import './Sidebar.css';

const SideMenu = ({ user }: { user: Record<string, any> }) => {
  return (
    <>
      <div className="profile-container2">
        <div className="profile-details flex">
          <div className="profile-info">
            <p>{user.displayName}</p>
            <p className="userEmail">{user.email}</p>
          </div>
          <Avatar image={user.photoURL} size="large" shape="circle" />
        </div>
        <div className="logout flex justify-center items-center cursor-pointer">
          Log Out<i className="pi pi-sign-out mx-2"></i>
        </div>
      </div>
      {/* <div className="menu-item-container">{items}</div> */}
    </>
  );
};

export default SideMenu;
