import { Button, Form, Input, Space, Typography, message } from "antd";
import { useRef, useState } from "react";

import { post } from "@/lib/fetch";

export const InviteColleagues = ({ onInvite, onSkip }) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  const invite = async (values) => {
    try {
      setLoading(true);

      const response = await post("/api/invite", values);

      message.success("Colleagues invited successfuly!");
      const data = await response.json();
      setResponses(data.invites);
    } catch (e) {
      message.error(
        "We could'nt invite your colleagues, please refere them to hello@specbite.com for personal assistance"
      );
    } finally {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <div style={{ width: "100%", maxWidth: "400px", textAlign: "center", margin: "0 auto", minHeight: "70vh" }}>
      <Typography.Title level={2}>Invite your colleagues</Typography.Title>
      <div style={{ height: 20 }} />
      <Form form={form} onFinish={invite}>
        {[...Array(5).keys()].map((index) => (
          <Form.Item key={index} name={`email${index + 1}`}>
            <Input type="email" placeholder="Colleague's email" />
          </Form.Item>
        ))}
        {(responses.length > 0 && (
          {/* <Button onClick={onInvite}>Continue</Button> */ }

        )) || (
            <>
              <Button style={{ width: "100%" }} htmlType="submit" type="primary" loading={loading}>
                Invite
              </Button>
              {/* <Button onClick={onSkip} variant="ghost">
                Skip
              </Button> */}
            </>
          )}
      </Form>
      <Space>
        {responses.map((response, index) => (
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Typography.Text key={index}>
            {response.email}: {response.status}{" "}
            {response.error ? (
              <Typography.Text>{response.error}</Typography.Text>
            ) : (
              ""
            )}
          </Typography.Text>
        ))}
      </Space>
    </div>
  );
};
