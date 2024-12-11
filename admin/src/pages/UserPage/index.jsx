import {
  Alert,
  Image,
  notification,
  Popconfirm,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import ModalUserRegister from "./components/ModalUserRegister";
import { deleteUser, fetchSeveralUsers } from "../../service/api.service";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import ModalUserEdit from "./components/ModalUserEdit";

export default function UserPage() {
  const [dataSource, setDataSource] = useState([]);

  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, [current, total, size]);

  const loadData = async () => {
    const res = await fetchSeveralUsers(current, size);

    if (res.data) {
      setDataSource(res.data.result);
      setCurrent(res.data.meta.page);
      setTotal(res.data.meta.totalElement);
    }
    console.log({ current, total });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
  };

  const handleDeleteUser = async (id) => {
    const res = await deleteUser(id);

    if (res.status === 200) {
      notification.success({
        message: "Delete user",
        description: "Xóa user thành công",
      });

      await loadData();
    } else {
      notification.error({
        message: "Delete user",
        description: "Xóa user thất bại",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      ) : (
        <Space size={20} direction="vertical">
          <ModalUserRegister />
          <ModalUserEdit isModalUpdateOpen={isModalUpdateOpen} setIsModalUpdateOpen={setIsModalUpdateOpen} />
          <Table
            loading={loading}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Avatar",
                render: (_, record) => {
                  return (
                    <>
                      {record.profile && record.profile.avatar && (
                        <Image
                          width={100}
                          src={`${import.meta.env.VITE_BACKEND_URL}/storage/user/${record.id}/${record.profile.avatar}`}
                        />
                      )}
                    </>
                  );
                },
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Fullname",
                render: (_, record) => {
                  return (
                    <>
                      {record.profile && record.profile.fullName && (
                        <>{record.profile.fullName}</>
                      )}
                    </>
                  );
                },
              },
              {
                title: "Role",
                dataIndex: "role",
              },
              {
                title: "Active",
                render: (_, record) => {
                  return <Switch checked={record.active} />;
                },
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                      style={{ cursor: "pointer", color: "orange" }}
                      onClick={() => { setIsModalUpdateOpen(true) }}
                    />
                    <Popconfirm
                      title="Delete user"
                      description="Xóa người dùng này?"
                      okText="Delete"
                      cancelText="No"
                      placement="rightBottom"
                      onConfirm={() => handleDeleteUser(record.id)}
                    >
                      <DeleteOutlined
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </Popconfirm>
                  </div>
                ),
              },
            ]}
            dataSource={dataSource}
            pagination={{
              current: current,
              pageSize: size,
              total: total,
            }}
            onChange={onChange}
            rowKey={"id"}
          ></Table>
        </Space>
      )}
    </>
  );
}
