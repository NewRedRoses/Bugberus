import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

// https://headlessui.com/react/menu

export default function Dropdown({
  menuBtn = "Dropdown",
  menuBtnClasses,
  menuItems,
  anchor = "bottom",
  onClick,
}) {
  return (
    <Menu>
      <MenuButton className={menuBtnClasses}>{menuBtn}</MenuButton>
      <MenuItems
        anchor={anchor}
        className="flex flex-col gap-2 rounded-md bg-slate-100 p-2 font-medium"
      >
        {menuItems.map((menuItem, index) => {
          return (
            <MenuItem
              key={index}
              className={
                menuItem.classNames ||
                "px-2 hover:cursor-pointer data-focus:bg-slate-200"
              }
            >
              <button type="" onClick={onClick}>
                {menuItem.name}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
