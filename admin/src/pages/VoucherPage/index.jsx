import { Avatar, Rate, Space, Spin, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getUser } from "../../api";
import { LoadingOutlined } from "@ant-design/icons";
import ModalVoucher from "./components/ModalVoucher";

export default function VoucherPage() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUser().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <>
          <ModalVoucher />
          <Space size={20} direction="vertical">
            <Table
              loading={loading}
              columns={[
                {
                  title: "Thumbnail",
                  dataIndex: "thumbnail",
                  render: (link) => {
                    return <Avatar src={link} />;
                  },
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
                  render: (rating) => {
                    return <Rate value={rating} allowHalf disabled />;
                  },
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
            ></Table>
          </Space>
        </>
      )}
    </div>
  );
}
