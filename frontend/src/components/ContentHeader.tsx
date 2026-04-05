import { useRef } from "react";

const ContentHeader = () => {
  return (
    <div className="dashboard-header">
      {/* add search button and profile here */}
      <div>
        <p>Items | Outfit | Favorite (Counts)</p>
      </div>

      <div className="profile-container">
        <span className="profile-avatar" area-hidden="true"></span>
        <span className="profile-name">John Doe</span>
      </div>
    </div>
  );
};

export default ContentHeader;
