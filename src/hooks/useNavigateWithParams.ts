import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

export const useNavigateWithParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = (pageNumber: number | string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(pageNumber));

    const basePath = location.pathname.replace(/\/details\/?.*$/, '');
    const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`;

    navigate(`${cleanPath}?${newParams.toString()}`);
  };

  return { navigateToPage };
};
