import { Outlet } from 'react-router-dom';

export function Template() {
  return (
    <div>
      <h1>Template</h1>
      <Outlet />
    </div>
  );
}
