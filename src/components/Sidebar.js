import { Menu, Button ,Tooltip} from 'antd';
import {
    DeleteFilled,
    MailOutlined,
    PlusSquareFilled
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
const { SubMenu } = Menu;
export default function Sidebar({ list ,onDelete}) {
    const [collapsed, setcollapse] = useState(false)
    const [projects,updateProject] = useState(list)
    const {url} = useRouteMatch()
    function handleClick(e){
        console.log(e)
        console.log(e.item,"===",e.key)
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
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                onClick={handleClick}
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="Projects">
                {projects&&projects
                .filter(item=>item.name!=="Inbox")
                .map((item) => {
                    return(
                    
                    <Menu.Item key={item.id} icon={<PlusSquareFilled style ={{color:'#b8256f'}}/>}>
                        <Link to={`${url}/${item.id}`}>{item.name}</Link>
                        <Tooltip title="delete" >
                        <Button type="primary" shape="circle" onClick={()=>handleDelete(item.name)} style={{width:12.5}} icon={<DeleteFilled />} />
                    </Tooltip>
                    </Menu.Item>
                   
                    )
                })}
                </SubMenu>
            </Menu>
        </div>
    );
}