import { Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalVoucher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Create Voucher
      </Button>
      <Modal title="Add Voucher" open={isModalOpen} okText={"Create"}>
        <Form name="normal_signup" layout="vertical" requiredMark="optional">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input Voucher Name!",
              },
            ]}
          >
            <Input placeholder="Voucher Name" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please input Code!",
              },
            ]}
          >
            <Input placeholder="Code" />
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

          <Form.Item
            name="discountPercent"
            rules={[
              {
                required: true,
                message: "Please input Discount Percent!",
              },
            ]}
          >
            <Flex gap={30}>
              <Input placeholder="Discount Percent" />
              <InputNumber
                min={1}
                max={100}
                defaultValue={1}
                placeholder="Quantity"
              />
            </Flex>
          </Form.Item>
          <AvatarUpload text={"upload "} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalVoucher;
