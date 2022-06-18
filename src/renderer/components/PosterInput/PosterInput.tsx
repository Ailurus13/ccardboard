import { useState } from 'react';
import { Button, Modal } from 'antd';
import { InboxOutlined, GlobalOutlined } from '@ant-design/icons';
import { InputFile } from '../InputFile';
import styles from './PosterInput.module.scss';

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
        <div className={styles['container']}>
          <div className={styles['local']}>
            <InboxOutlined className={styles['icon']} />
            <p>Depuis mon ordinateur</p>
            <InputFile disabled={!!url} value={file} onChange={setFile} />
          </div>
          <div>ou</div>
          <div className={styles['remote']}>
            <GlobalOutlined className={styles['icon']} />
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
