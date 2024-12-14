import { useEffect, useState } from "react";
import { Button, Flex, Modal, notification, Select } from "antd";
import {
  AimOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { fetchUser, updateUser, uploadFile } from "../../../service/api.service";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalUserEdit = (props) => {
  const [fileList, setFileList] = useState([]);

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { isModalUpdateOpen, setIsModalUpdateOpen, userDetail, setUserDetail, loadData } = props

  useEffect(() => {
    if (userDetail) {
      loadUser()
    }
  }, [userDetail]);

  const loadUser = async () => {
    const res = await fetchUser(userDetail)

    if (res.data) {
      setRole(res.data.role)

      setName(res.data.email)
      setFullName(res.data.profile.fullName)
      setAddress(res.data.profile.address)
      setPhone(res.data.profile.phone)

      if (res.data.profile.avatar != "default-ava.jpg") {
        setFileList([{
          uid: '-1',
          name: res.data.profile.avatar,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/storage/user/${res.data.id}/${res.data.profile.avatar}`
        }])
      } else {
        setFileList([])
      }
    }
  }

  const handleOk = async () => {

    const profile = {
      fullName: fullName,
      avatar: fileList.length > 0 ? `${fileList[0].name}` : "default-ava.jpg",
      address: address,
      phone: phone
    }

    console.log(profile.avatar)

    const user = {
      id: userDetail,
      role: role,
      profile: profile
    }

    const res = await updateUser(user)

    if (res.data) {
      console.log(res);
      notification.success({
        message: "Success",
        description: res.message,
      });

      if (fileList.length > 0) {
        await uploadFile(fileList[0].originFileObj, "user", res.data.id, "ava-")
      }

      await loadData()
      handleCancel();
    } else {
      notification.error({
        message: "Failed",
        description:
          typeof res === "object" ? JSON.stringify(res.message) : res,
      });
    }
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    setUserDetail(null)
  };

  return (
    <>
      <Modal
        title="Detail user"
        open={isModalUpdateOpen}
        onClose={handleCancel}
        onCancel={() => handleCancel()}
        onOk={() => handleOk()}
        okText={"Update"}
      >
        <Form name="normal_signup" layout="vertical" requiredMark="optional">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input login name!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<UserOutlined />}
              value={name}
              placeholder="Login Name"
              disabled={true}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input login name!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<UserOutlined />}
              value={fullName}
              placeholder="Full Name"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<AimOutlined />}
              placeholder="Your Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Your Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </Form.Item>
          <Select
            style={{ width: "100%", marginBottom: "30px" }}
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "ROOT", label: "Root" },
              { value: "STUDENT", label: "User" },
            ]}
            defaultValue={role}
            value={role}
            onSelect={(value) => setRole(value)}
          />
        </Form>
        <AvatarUpload fileList={fileList} setFileList={setFileList} />
      </Modal>
    </>
  );
};

export default ModalUserEdit;
