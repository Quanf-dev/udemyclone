import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

function ModalField() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi nhấn OK
    console.log("Field Name:", fieldName);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setFieldName(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Field Modal
      </Button>
      <Modal
        title="Field"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label htmlFor="fieldName">Field Name</label>
          <Input
            id="fieldName"
            value={fieldName}
            onChange={handleInputChange}
            placeholder="Enter field name"
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalField;
