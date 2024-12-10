import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalAchievement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Create Achievement
      </Button>
      <Modal title="Add Achievement" open={isModalOpen} okText={"Create"}>
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
            <Input placeholder="AchievementName" />
          </Form.Item>
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

          <Select
            style={{ width: "100%", marginBottom: "30px" }}
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "ROOT", label: "Root" },
              { value: "STUDENT", label: "User" },
            ]}
          />
          <AvatarUpload text={"upload "} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalAchievement;
