import { Button, Result } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const PrivateRoute = (props) => {
    const [id, setId] = useState(localStorage.getItem("id"));
    const [active, setActive] = useState(localStorage.getItem("active"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setActive(localStorage.getItem("active"));
        setRole(localStorage.getItem("role"));
    }, [localStorage.getItem("id"), localStorage.getItem("role"), localStorage.getItem("active")]);

    // nếu người dùng tồn tại, thì render giao diện như bình thường
    if (id) {
        if (role === "ROOT" || role === "ADMIN" && active == "true") {
            return (
                <>
                    {props.children}
                </>
            )
        } else {
            return (
                <Result
                    status="403"
                    title="Unauthorize!"
                    subTitle={"Bạn không có quyền truy cập nguồn tài nguyên hoặc phiên làm việc của bạn đã hết hạn"}
                    extra={
                        <Button type="primary">
                            <Link to="/login" >Vui lòng đăng nhập lại</Link>
                        </Button>
                    }
                />
            )
        }
    }

    return (
        <Result
            status="403"
            title="Unauthorize!"
            subTitle={"Bạn chưa đăng nhập!"}
            extra={
                <Button type="primary">
                    <Link to="/login" >Đăng nhập</Link>
                </Button>
            }
        />
    )
}

export default PrivateRoute