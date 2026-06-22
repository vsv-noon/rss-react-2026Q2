import { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { Link } from '@/i18n/navigation';

export interface NavLinkProps {
  href: string;
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
