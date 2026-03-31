"use client";

import Link from "next/link";
import type { MegaMenuGroup } from "../_lib/constants";

type MegaDropdownProps = {
  isOpen: boolean;
  menu: MegaMenuGroup[];
  onLinkClick: () => void;
};

export default function MegaDropdown({ isOpen, menu, onLinkClick }: MegaDropdownProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderBottom: "1.5px solid rgba(241,245,249,0.8)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
        transformOrigin: "top center",
        transform: isOpen
          ? "translateY(0) scaleY(1)"
          : "translateY(-12px) scaleY(0.96)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 320ms cubic-bezier(0.16,1,0.3,1), transform 320ms cubic-bezier(0.16,1,0.3,1)",
        zIndex: 40,
      }}
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{ paddingTop: "36px", paddingBottom: "36px", paddingLeft: "100px", paddingRight: "24px" }}
      >
        <div className="grid grid-cols-3 gap-6">
          {menu.map((group, colIdx) => (
            <div key={group.title} className="flex flex-col gap-4">
              <p
                className="text-xs font-semibold text-[#9CA3AF] tracking-widest uppercase"
                style={{
                  transition: `opacity 300ms ease ${colIdx * 60}ms, transform 300ms ease ${colIdx * 60}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {group.title}
              </p>
              <div className="flex flex-col gap-2">
                {group.items.map((item, itemIdx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[#64748B] hover:underline decoration-current underline-offset-2 transition-colors"
                    style={{
                      transition: `opacity 280ms ease ${colIdx * 60 + itemIdx * 25 + 80}ms, transform 280ms ease ${colIdx * 60 + itemIdx * 25 + 80}ms`,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                    }}
                    onClick={onLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
