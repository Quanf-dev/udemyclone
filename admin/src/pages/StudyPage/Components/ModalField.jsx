import React, { useState } from "react";
import { Modal, Select, Button } from "antd";

function ModalField() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi nhấn OK
    console.log("Selected Field:", selectedField);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectChange = (value) => {
    setSelectedField(value);
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
          <label htmlFor="fieldSelect">Name</label>
          <Select
            id="fieldSelect"
            value={selectedField}
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

export default ModalField;
