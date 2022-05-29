import { Form, Input, Button, message } from 'antd';

export function MovieForm() {
  const [form] = Form.useForm();

  const createMovie = async ({ name }) => {
    const [movie] = await window.electron.createMovie({ name });
    if (movie) {
      form.resetFields();
      message.success('Film créé avec succès');
    }
  };

  return (
    <div>
      <h1>Nouveau film</h1>
      <Form form={form} onFinish={createMovie}>
        <Form.Item
          label="Nom"
          name="name"
          rules={[
            { required: true, message: 'Veuillez indiquer le nom du film' },
          ]}
        >
          <Input />
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
