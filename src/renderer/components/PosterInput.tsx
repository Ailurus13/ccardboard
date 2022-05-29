import { useState } from 'react';
import { Button, Modal } from 'antd';
import { InboxOutlined, GlobalOutlined } from '@ant-design/icons';
import { InputFile } from './InputFile';

type Poster = {
  type: 'path' | 'url';
  value: string;
};

type PosterInputProps = {
  value?: Poster;
  onChange?: (poster: Poster) => void;
};

export function PosterInput({ value: poster, onChange }: PosterInputProps) {
  const [file, setFile] = useState<File | null>();
  const [url, setUrl] = useState<string | null>();
  const [visible, setVisible] = useState(false);

  const ok = () => {
    setVisible(false);
    if (file) {
      onChange({
        type: 'path',
        value: file.path,
      });
    } else if (url) {
      onChange({
        type: 'url',
        value: url,
      });
    } else {
      onChange(null);
    }
  };

  const cancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        {poster?.value || 'Choisir un poster'}
      </Button>
      <Modal
        title="Affiche"
        visible={visible}
        onOk={ok}
        onCancel={cancel}
        cancelText="Annuler"
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1vh' }}>
          <div>
            <div>
              <InboxOutlined />
              <p>Depuis mon ordinateur</p>
              <InputFile disabled={!!url} value={file} onChange={setFile} />
            </div>
          </div>
          <div>ou</div>
          <div>
            <GlobalOutlined />
            <p>Depuis internet</p>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={!!file}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
