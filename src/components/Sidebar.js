import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    PlusSquareFilled
} from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;
export default function Sidebar({ list }) {
    const [collapsed, setcollapse] = useState(false)
    function toggleCollapsed() {
        setcollapse((collapse) => !collapse)
    };
    function handleClick(e){
        console.log(e)
        console.log(e.item,"===",e.key)
    }
    return (
        <div style={{ width: 256 }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                onClick={handleClick}
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="Projects">
                {list.map((item) => {
                    console.log(item.id)
                    return(<Menu.Item key={item.id} icon={<PlusSquareFilled style ={{color:'#b8256f'}}/>}>
                        {item.name}
                    </Menu.Item>)
                })}
                </SubMenu>
            </Menu>
        </div>
    );
}