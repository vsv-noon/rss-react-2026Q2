import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName: string;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className = '',
  activeClassName,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const computedClassName =
    `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link href={href} className={computedClassName} {...props}>
      {children}
    </Link>
  );
}
