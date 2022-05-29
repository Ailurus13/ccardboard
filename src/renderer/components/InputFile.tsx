import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

type InputFileProps = {
  value?: File;
  onChange?: (file: File) => void;
  disabled?: boolean;
};

export function InputFile({
  value,
  onChange,
  disabled = false,
}: InputFileProps) {
  const [file, setFile] = useState<File | null>();
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    setFile(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
    onChange && onChange(fileUploaded);
  };

  return (
    <div>
      <Button
        disabled={disabled}
        icon={<UploadOutlined />}
        onClick={() => hiddenFileInput.current.click()}
      >
        {file?.name || 'Charger'}
      </Button>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} hidden />
    </div>
  );
}
