import * as React from "react";
import { FC } from "react";
import { useMediaQuery, Theme } from "@material-ui/core";
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  usePermissions,
} from "react-admin";
import { UserIcon } from "../components/users";
import { ProjectIcon } from "../components/projects";

interface Props {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const open = false;
  const { permissions } = usePermissions();

  return (
    <div>
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      {permissions === "admin" && (
        <>
          <MenuItemLink
            to={`/users`}
            primaryText={translate("menu.users")}
            leftIcon={<UserIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />
          <MenuItemLink
            to={`/projects`}
            primaryText={translate("menu.projects")}
            leftIcon={<ProjectIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
          />
          {isXSmall && logout}
        </>
      )}
    </div>
  );
};

export default Menu;
