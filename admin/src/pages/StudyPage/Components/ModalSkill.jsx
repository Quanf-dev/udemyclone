import React, { useState } from "react";
import { Modal, Select, Button } from "antd";

function ModalSkill() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi nhấn OK
    console.log("Selected Skill:", selectedSkill);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectChange = (value) => {
    setSelectedSkill(value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Skill Modal
      </Button>
      <Modal
        title="Skill"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label htmlFor="skillSelect">Skill</label>
          <Select
            id="skillSelect"
            value={selectedSkill}
            onChange={handleSelectChange}
            style={{ width: "100%" }}
          >
            <Select.Option value="frontend">Frontend</Select.Option>
            <Select.Option value="backend">Backend</Select.Option>
            <Select.Option value="fullstack">Fullstack</Select.Option>
          </Select>
        </div>
      </Modal>
    </>
  );
}

export default ModalSkill;
