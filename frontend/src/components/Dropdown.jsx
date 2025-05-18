import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

// https://headlessui.com/react/menu

export default function Dropdown({
  menuBtn = "Dropdown",
  menuBtnClasses,
  menuItems,
  anchor = "bottom",
  dropdownClasses = "bg-slate-200 border-2  border-slate-300 text-slate-700",
}) {
  return (
    <Menu>
      <MenuButton className={menuBtnClasses}>{menuBtn}</MenuButton>
      <MenuItems
        anchor={anchor}
        transition
        className={`flex origin-top flex-col gap-2 rounded-xl p-3 font-semibold shadow-lg transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 ${dropdownClasses}`}
        as="div"
      >
        {menuItems.map((menuItem) => {
          const Icon = menuItem.icon;

          return (
            <MenuItem
              key={menuItem.name}
              className={`rounded px-2 ${menuItem.classNames}`}
            >
              <div className="flex items-center justify-start gap-2 data-focus:cursor-pointer">
                {Icon && <Icon size={20} className="opacity-80" />}
                <button
                  type=""
                  onClick={menuItem.function}
                  className="hover:cursor-pointer"
                >
                  {menuItem.name}
                </button>
              </div>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
