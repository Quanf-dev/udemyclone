import React, { useState } from "react";
import { Modal, Button, Descriptions, Switch } from "antd";

const CourseModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(true);

  // Dữ liệu mẫu
  const data = {
    id: "1",
    title: "Task 1",
    ownBy: { email: "owner1@example.com" },
    createdAt: "2024-06-17",
    approval: "Approved",
  };

  // Hiển thị/Ẩn modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Toggle trạng thái Pending
  const togglePending = (checked) => {
    setIsPending(checked);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Detail Course
      </Button>
      <Modal
        title="Data Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Descriptions
          title={`Record ${data.id}`}
          bordered
          column={1}
          style={{ marginBottom: "20px" }}
        >
          <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
          <Descriptions.Item label="Owner Email">
            {data.ownBy.email}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {data.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Approval">
            {data.approval}
          </Descriptions.Item>
          <Descriptions.Item label="Pending">
            <Switch
              checked={isPending}
              onChange={togglePending}
              checkedChildren="Pending"
              unCheckedChildren="Approved"
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default CourseModal;
