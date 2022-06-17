import {
  Form,
  Input,
  Button,
  message,
  Radio,
  Card,
  Switch,
  Select,
  Space,
} from 'antd';
import { DatePicker } from '../../components/DateFnsPicker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TheMovieDbFill } from './TheMovieDbFill';
import { PosterInput } from '../../components/PosterInput';
import { parse } from 'date-fns';

export function MovieForm() {
  const [form] = Form.useForm();

  const createMovie = async (formValues) => {
    const [movie] = await window.electron.createMovie(formValues);
    if (movie) {
      form.resetFields();
      message.success('Film créé avec succès');
    }
  };

  return (
    <div>
      <h1>Nouvelle séance</h1>
      <Form form={form} onFinish={createMovie}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2vh' }}>
          <div style={{ flex: 1 }}>
            <Card
              style={{ marginBottom: '2vh' }}
              title="Film"
              extra={<TheMovieDbFill />}
            >
              <Form.Item
                label="Nom"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez indiquer le nom du film',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Affiche"
                name="poster"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez choisir un poster',
                  },
                ]}
              >
                <PosterInput />
              </Form.Item>
            </Card>
            <Card title="Informations" style={{ marginBottom: '2vh' }}>
              <Form.Item
                label="Sortie"
                name="release"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez choisir un type de sortie',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="normal">Normale</Radio.Button>
                  <Radio.Button value="national">Nationale</Radio.Button>
                  <Radio.Button value="ap">Avant-première</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Art et essai"
                name="arthouse"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
              <Form.Item label="Limite d'âge" name="rated">
                <Select allowClear placeholder="Pas de limite d'âge">
                  <Select.Option value={10}>10 ans</Select.Option>
                  <Select.Option value={12}>12 ans</Select.Option>
                  <Select.Option value={16}>16 ans</Select.Option>
                  <Select.Option value={18}>18 ans</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </div>
          <div style={{ flex: 1 }}>
            <Card title="Séances" style={{ marginBottom: '2vh' }}>
              <Form.List name="seances">
                {(fields, { add, remove }) => (
                  <>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Nouvelle séance
                      </Button>
                    </Form.Item>
                    {fields.map(({ key, name }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: '1vh' }}
                        align="baseline"
                      >
                        <span>{`#${name + 1}`}</span>
                        <Form.Item
                          name={[name, 'date']}
                          rules={[
                            {
                              required: true,
                              message:
                                'Veuillez indiquer une date et un horaire pour la séance',
                            },
                          ]}
                        >
                          <DatePicker
                            showNow={false}
                            showTime={{
                              defaultValue: parse(
                                '21:00:00',
                                'HH:mm:ss',
                                new Date()
                              ),
                            }}
                          />
                        </Form.Item>
                        <Form.Item name={[name, 'language']}>
                          <Select
                            placeholder="Langue"
                            allowClear
                            style={{ width: 100 }}
                          >
                            <Select.Option value="vf">VF</Select.Option>
                            <Select.Option value="vo">VO</Select.Option>
                          </Select>
                        </Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                        />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Card>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
