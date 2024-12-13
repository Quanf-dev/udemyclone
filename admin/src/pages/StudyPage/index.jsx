import React, { useEffect, useState } from "react";
import { Tabs, Avatar, Rate, Space, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUser } from "../../api";

const onChange = (key) => {
  console.log(key);
};

const TableContent = ({ loading, dataSource }) => (
  <Table
    loading={loading}
    columns={[
      {
        title: "Thumbnail",
        dataIndex: "thumbnail",
        render: (link) => <Avatar src={link} />,
      },
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (value) => <span>${value}</span>,
      },
      {
        title: "Rating",
        dataIndex: "rating",
        render: (rating) => <Rate value={rating} allowHalf disabled />,
      },
      {
        title: "Stock",
        dataIndex: "stock",
      },
      {
        title: "Brand",
        dataIndex: "brand",
      },
      {
        title: "Category",
        dataIndex: "category",
      },
    ]}
    dataSource={dataSource}
    pagination={{
      pageSize: 6,
    }}
  />
);

const TabContent = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((res) => {
        setDataSource(res.products || []); // Kiểm tra res.products tồn tại
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Space size={20} direction="vertical">
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <TableContent loading={loading} dataSource={dataSource} />
      )}
    </Space>
  );
};

const StudyPage = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      { key: "1", label: "Tab 1", children: <TabContent /> },
      { key: "2", label: "Tab 2", children: <TabContent /> },
      { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
    ]}
  />
);

export default StudyPage;
