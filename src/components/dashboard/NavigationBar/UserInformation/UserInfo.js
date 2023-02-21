import { useRef, useState } from "react";
import {
  UserAvatar,
  UserMenu,
  UserNav,
  LanguageSwitch,
} from "cx-portal-shared-components";
import UserService from "../../../services/UserService";
import "./UserInfo.scss";
import { getLogoutLink } from "../../../services/EnvironmentService";

export const UserInfo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  const openCloseMenu = () => setMenuOpen((prevVal) => !prevVal);

  const onClickAway = (e) => {
    if (!wrapperRef.current || !wrapperRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  const logoutHref = getLogoutLink();

  console.log(logoutHref);

  return (
    <div className="UserInfo">
      <div ref={wrapperRef}>
        <UserAvatar onClick={openCloseMenu} />
      </div>
      <UserMenu
        open={menuOpen}
        top={60}
        userName={UserService.getName()}
        userRole={UserService.getCompany()}
        onClickAway={onClickAway}
      >
        <UserNav divider
          items={[
            {
              href: logoutHref,
              title: "Logout",
            },
          ]}
        />

        {/*<LanguageSwitch
          current="en"
          languages={[
            {
              key: "en",
              name: "ENG",
            },
          ]}
          onChange={function noRefCheck() {}}
        />*/}

      </UserMenu>
    </div>
  );
};
