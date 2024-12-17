import React, { useEffect, useState } from "react";
import { Tabs, Avatar, Rate, Space, Spin, Table, Switch, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { fetchSeveralFields, fetchSeveralSkills } from "../../service/api.service";

const onChange = (key) => {
  console.log(key);
};

const TableContent = ({ object, loading, dataSource }) => (
  <Table
    loading={loading}
    columns={[
      {
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      ...(dataSource.some(record => object === "skill") ? [{
        title: "Field name",
        render: (_, record) => {
          return (
            <>
              {console.log(record.object)}
              {record.field && record.field.name && (
                <>{record.field.name}</>
              )}
            </>
          );
        },
      }] : []),
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
            />
            <Popconfirm
              title={`Delete ${object}`}
              description={`Xóa ${object} này?`}
              okText="Delete"
              cancelText="No"
              placement="rightBottom"
            >
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
              />
            </Popconfirm>
          </div>
        ),
      }
    ]}
    dataSource={dataSource}
    pagination={{
      pageSize: 6,
    }}
  />
);

const TabContent = (props) => {
  const { object } = props

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true)
    loadData()
  }, []);

  const loadData = async () => {
    let res = null

    if (object == "skill") {
      res = await fetchSeveralSkills()
    } else if (object == "field") {
      res = await fetchSeveralFields()
    }

    if (res.data) {
      setDataSource(res.data)
      setLoading(false)
    }
  }

  return (
    <Space size={20} direction="vertical">
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <TableContent object={object} loading={loading} dataSource={dataSource} />
      )}
    </Space>
  );
};

const StudyPage = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      { key: "1", label: "Skills", children: <TabContent object={"skill"} /> },
      { key: "2", label: "Fields", children: <TabContent object={"field"} /> },
    ]}
  />
);

export default StudyPage;
