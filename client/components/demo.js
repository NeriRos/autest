import { Card, Divider, Spin, Upload, message } from 'antd'

import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react'

const { Dragger } = Upload;

const Demo = () => {
  const [headers, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState()

  const props = {
    name: 'file',
    action: 'https://autest.dev/api/test-writer',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        if (info?.file?.response) {
          console.log("RESPONSE", info.file.response)
          setTableHeaders(info.file.response.story[0]);
          setTableData(info.file.response.story.slice(1));
          setLoading(false)
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setLoading(false)
      } else {
        setLoading(true)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      <h1 style={{ paddingBottom: 20 }}>Component to Test</h1>
      {loading ? <Spin /> :
        <Dragger {...props} showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag component file to this area to upload</p>
          <p className="ant-upload-hint">
            Upload a react js component and receive its test
          </p>
        </Dragger>}
      {tableData.length > 0 ?
        <Card style={{ marginTop: 100 }}>
          <div style={{ display: "flex" }}>
            {headers.map(header => <b style={{ flex: 1 }} key={header}>{header}</b>)}
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tableData.map((data, index) => <div key={index} style={{ display: "flex" }}>
              {data.map((data, index) => <p style={{ flex: 1, padding: "1em", border: "1px solid lightgrey" }} key={`${index}.${index}`}>{data}</p>)}
            </div>)}
          </div>
        </Card>
        : null}
    </>
  );
};

export default Demo;
