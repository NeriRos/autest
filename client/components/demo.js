import { Upload, message } from 'antd'

import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Demo = () => {
  const props = {
    name: 'file',
    action: 'https://autest.dev/api/test-writer',
    onChange(info) {
      const { status } = info.file;
      if (info?.file?.response) {
        console.log("RESPONSE", info.file.response)
      }
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      <h1>Component to Test</h1>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag component file to this area to upload</p>
        <p className="ant-upload-hint">
          Upload a react js component and receive its test
        </p>
      </Dragger>
    </>
  );
};

export default Demo;
