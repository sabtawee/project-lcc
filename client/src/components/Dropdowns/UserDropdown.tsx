import { useState, useRef, useEffect } from 'react';
import { createPopper, Instance } from '@popperjs/core';

type Props = {};

function UserDropdown({}: Props) {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState<boolean>(false);
  const btnDropdownRef = useRef<HTMLAnchorElement | null>(null);
  const popoverDropdownRef = useRef<HTMLDivElement | null>(null);
  const popperInstanceRef = useRef<Instance | null>(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      popperInstanceRef.current = createPopper(
        btnDropdownRef.current,
        popoverDropdownRef.current,
        {
          placement: 'bottom-start',
        }
      );
      setDropdownPopoverShow(true);
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
    if (popperInstanceRef.current) {
      popperInstanceRef.current.destroy();
    }
  };

  useEffect(() => {
    return () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="https://avatars.githubusercontent.com/u/8186664?v=4"
            />
          </span>
        </div>
      </a>
      
    </>
  );
}

export default UserDropdown;
