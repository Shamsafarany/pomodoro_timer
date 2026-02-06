import React, {useContext} from "react";
import { FaTree, FaCog, FaSignInAlt, FaUserPlus, FaBars } from "react-icons/fa";
import { SettingsContext } from "../Context/settingsContext.js";

function NavBar() {
  const { toggleSettings } = useContext(SettingsContext);

  const handleKeyDown = (event, actionFunction) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (actionFunction) {
        actionFunction();
      }
    }
  };
  return (
    <nav className="navBar" role="navigation" aria-label="Main navigation">
      <div className="title">
        <FaTree className="nav-icon" aria-hidden="true" />
        PomoProductive
      </div>
      <div className="buttons">
        <div
          className="nav-item"
          onClick={toggleSettings}
          onKeyDown={(e) => handleKeyDown(e, toggleSettings)}
          role="button"
          tabIndex={0}
          aria-label="Open settings"
        >
          <FaCog className="nav-icon" aria-hidden="true" />
          Setting
        </div>
        <div
          className="nav-item"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "signIn")}
          aria-label="Sign in to your account"
        >
          <FaSignInAlt className="nav-icon" aria-hidden="true" />
          Sign In
        </div>
        <div
          className="nav-item"
          aria-label="Register new account"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "register")}
        >
          <FaUserPlus className="nav-icon" aria-hidden="true" />
          Register
        </div>
      </div>
      <div className="hamburger-menu" aria-label="Open menu">
        <FaBars className="hamburger" aria-hidden="true" />

        <div className="dropdown" role="menu" aria-label="Mobile menu">
          <div
            className="dropdown-item"
            onClick={toggleSettings}
            onKeyDown={(e) => handleKeyDown(e, toggleSettings)}
            role="menuitem"
            tabIndex={0}
            aria-label="Open settings"
          >
            <FaCog className="nav-icon" aria-hidden="true" />
            Setting
          </div>
          <div className="dropdown-item">
            <FaSignInAlt
              className="nav-icon"
              aria-hidden="true"
              aria-label="Sign in to your account"
              role="menuitem"
              tabIndex={0}
            />
            Sign In
          </div>
          <div className="dropdown-item">
            <FaUserPlus
              className="nav-icon"
              aria-hidden="true"
              role="menuitem"
              tabIndex={0}
              aria-label="Register new account"
            />
            Register
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
