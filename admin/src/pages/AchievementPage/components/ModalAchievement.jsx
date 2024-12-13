import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalAchievement = () => {
  const [fileList, setFileList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Create Achievement
      </Button>
      <Modal title="Add Achievement" open={isModalOpen} okText={"Create"} onCancel={() => setIsModalOpen(false)}>
        <Form name="normal_signup" layout="vertical" requiredMark="optional">
          <Form.Item
            name="achievementName"
            rules={[
              {
                required: true,
                message: "Please input AchievementName!",
              },
            ]}
          >
            <Input placeholder="AchievementName" value={name} />
          </Form.Item>
          <Select
            style={{ width: "100%", marginBottom: "30px" }}
            options={[
              { value: "MIN_PURCHASED_COURSES", label: "MIN_PURCHASED_COURSES" },
              { value: "MIN_OWN_COURSES", label: "MIN_OWN_COURSES" },
              { value: "MIN_COMMENTS", label: "MIN_COMMENTS" },
              { value: "MIN_RATING", label: "MIN_RATING" }
            ]}
          />
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
                message: "Please input Value!",
              },
            ]}
          >
            <Input placeholder="Value" />
          </Form.Item>
          <Form.Item
            name="desc"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input placeholder="description" />
          </Form.Item>
          <AvatarUpload fileList={fileList} setFileList={setFileList} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalAchievement;
