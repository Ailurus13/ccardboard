import { Button, Form, Input, message } from 'antd';
import { useTheMovieDb } from '../../../provider/TheMovieDBProvider';

export function TheMovieDbNoKey() {
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
