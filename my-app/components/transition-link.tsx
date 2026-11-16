"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouteTransition } from "@/components/route-transition-provider";

type TransitionLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "onClick"
> & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function TransitionLink({
  href,
  onClick,
  replace = false,
  scroll = true,
  target,
  download,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();
  const navigate = useRouteTransition();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target && target !== "_self") ||
      download !== undefined
    ) {
      return;
    }

    const destination = new URL(href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname === pathname
    ) {
      return;
    }

    event.preventDefault();
    navigate(
      `${destination.pathname}${destination.search}${destination.hash}`,
      replace,
      scroll,
    );
  };

  return (
    <Link
      {...props}
      download={download}
      href={href}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      target={target}
    />
  );
}
