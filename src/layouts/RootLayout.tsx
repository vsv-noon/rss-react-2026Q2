import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
