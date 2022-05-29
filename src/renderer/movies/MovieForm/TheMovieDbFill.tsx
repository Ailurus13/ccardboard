import { useState } from 'react';
import { Button, Drawer, Form, Input, message } from 'antd';
import {
  TheMovieDbProvider,
  useTheMovieDb,
} from '../../provider/TheMovieDBProvider';
const { Search } = Input;

function Key() {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <Search placeholder="Nom du film" onSearch={onSearch} />
    </div>
  );
}

function NoKey() {
  const { registerApiKey } = useTheMovieDb();

  const onFinish = async ({ key }) => {
    await registerApiKey(key);
    message.success('Clé sauvegardée avec succès !');
  };

  return (
    <div>
      <h1>Configuration</h1>
      <p>L'autocomplétion demande une clé d'API The Movie DB.</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Clé"
          name="key"
          rules={[
            { required: true, message: "Veuillez indiquer une clé d'API" },
          ]}
        >
          <Input placeholder="Votre clé" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

type TheMovieDbDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export function TheMovieDbDrawer({ visible, onClose }: TheMovieDbDrawerProps) {
  const { hasValidApiKey } = useTheMovieDb();

  return (
    <Drawer
      title="Autocomplétion"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {!hasValidApiKey && <NoKey />}
      {hasValidApiKey && <Key />}
    </Drawer>
  );
}

export function TheMovieDbFill() {
  const [visible, setVisible] = useState(false);

  return (
    <TheMovieDbProvider>
      <Button
        type="default"
        onClick={() => {
          setVisible(true);
        }}
      >
        Autocomplétion
      </Button>
      <TheMovieDbDrawer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </TheMovieDbProvider>
  );
}
