import {
  Avatar,
  notification,
  Popconfirm,
  Rate,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getUser } from "../../api";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { deleteCourse, fetchSeveralCourses } from "../../service/api.service";
import CourseModal from "./Components/CourseModal";

export default function CoursePage() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

  const loadData = async () => {
    const res = await fetchSeveralCourses();
    if (res.data && res.data.result) {
      setDataSource(res.data.result);
    }
  };

  const handleDeleteCourse = async (id) => {
    const res = await deleteCourse(id);

    if (res.status === 200) {
      notification.success({
        message: "Delete course",
        description: "Xóa course thành công",
      });

      await loadData();
    } else {
      notification.error({
        message: "Delete course",
        description: "Xóa course thất bại",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <>
          <CourseModal />
          <Space size={20} direction="vertical">
            <Table
              loading={loading}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Owner",
                  render: (value) => <span>{value.ownBy.email}</span>,
                },
                {
                  title: "Created At",
                  dataIndex: "createdAt",
                },
                {
                  title: "Status",
                  render: (value) => {
                    return (
                      <>
                        {value.status === "PENDING" ? (
                          <p style={{ color: "red", fontWeight: "bold" }}>
                            {value.status}
                          </p>
                        ) : (
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            {value.status}
                          </p>
                        )}
                      </>
                    );
                  },
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <div style={{ display: "flex", gap: "20px" }}>
                      <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                      />
                      <Popconfirm
                        title="Delete course"
                        description="Xóa khóa học này?"
                        okText="Delete"
                        cancelText="No"
                        placement="rightBottom"
                        onConfirm={() => handleDeleteCourse(record.id)}
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
                pageSize: 6,
              }}
            ></Table>
          </Space>
        </>
      )}
    </>
  );
}
