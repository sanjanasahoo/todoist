import { Menu, Button ,Tooltip} from 'antd';
import {
    DeleteFilled,
    MailOutlined,
    PlusSquareFilled
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { SubMenu } = Menu;
export default function Sidebar({ list ,onDelete,showTasks}) {
    const [collapsed, setcollapse] = useState(false)
    const [projects,updateProject] = useState(list)
    function toggleCollapsed() {
        setcollapse((collapse) => !collapse)
    };
    function handleClick(e){
        console.log(e)
        console.log(e.item,"===",e.key)
        showTasks(e.key)
    }
    function handleDelete(id){
        console.log(id)
        onDelete(id)
    }
    useEffect(()=>{
        console.log("list is",list)
        updateProject(list)
    },[list])
    return (
        <div style={{ width: 256 }}>
            {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                onClick={handleClick}
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="Projects">
                {projects
                .filter(item=>item.name!=="Inbox")
                .map((item) => {
                    return(
                    <Menu.Item key={item.id} icon={<PlusSquareFilled style ={{color:'#b8256f'}}/>}>
                        {item.name}
                        <Tooltip title="delete" >
                        <Button type="primary" shape="circle" onClick={()=>handleDelete(item.id)} style={{width:12.5}} icon={<DeleteFilled />} />
                    </Tooltip>
                    </Menu.Item>
                   
                    )
                })}
                </SubMenu>
            </Menu>
        </div>
    );
}