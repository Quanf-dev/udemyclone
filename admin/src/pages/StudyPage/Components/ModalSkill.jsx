import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

function ModalSkill() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [skillName, setSkillName] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi nhấn OK
    console.log("Skill Name:", skillName);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setSkillName(e.target.value);
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
          <label htmlFor="skillName">Skill Name</label>
          <Input
            id="skillName"
            value={skillName}
            onChange={handleInputChange}
            placeholder="Enter skill name"
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalSkill;
