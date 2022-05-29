import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    key: 'list',
    label: 'Liste',
  },
  {
    key: 'create',
    label: 'Nouveau',
  },
];

export function Template() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['list']}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />
      <div style={{ padding: '1vw' }}>
        <Outlet />
      </div>
    </div>
  );
}
