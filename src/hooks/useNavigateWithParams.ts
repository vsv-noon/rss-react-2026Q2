import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useNavigateWithParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (pageNumber: number | string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('page', String(pageNumber));

    const basePath = pathname?.replace(/\/details\/?.*$/, '');
    const cleanPath = basePath?.startsWith('/') ? basePath : `/${basePath}`;

    router.push(`${cleanPath}?${newParams.toString()}`);
  };

  return { navigateToPage };
};
