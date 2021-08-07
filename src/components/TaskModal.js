import React, { useState } from 'react'
import {  useRouteMatch } from 'react-router-dom'
import { Modal, Button } from 'antd';
import axios from 'axios';

const TaskModal = ({showModal,setShowModal,projects,tasks,onTaskEdit,setRedirect}) => {
    const { params } = useRouteMatch()
    const project = projects&& projects.filter((prj)=>(prj.id===parseInt(params.projectId)))[0]
    const currentTask = tasks&& tasks.filter((task)=>(task.id===parseInt(params.taskId)))[0]
    const [edit,setEdit]= useState(false)
    const [content,setContent] = useState(currentTask.content)
    const [desc,setDesc] = useState(currentTask.description)
    function handleOk(){

    }
    function handleCancel(){
        setShowModal(false);
        setRedirect(true)
    }
    async function handleSave(e){
        e.preventDefault()
        try{
        await axios.put(`https://todoistmtblue.herokuapp.com/tasks/${params.taskId}`,{
          content,
          description:desc
        })
        onTaskEdit(true)
        setEdit(false)
      }
      catch(err){
        console.log(err)
      }
    }
    return (
        <Modal
        title={project.name}
        visible={showModal}
        onOk={handleOk}
        confirmLoading={false}
        onCancel={handleCancel}
        okButtonProps={{ style: {display:'none'} }}
        cancelButtonProps={{ style: {display:'none'} }}
      >
          
          <input  onClick={()=>setEdit(true)} 
            contentEditable={edit}
            onChange ={(e)=>setContent(e.target.value)}
            defaultValue ={content}
            className ="modalInputDiv"
            placeholder="Content"
            >
         </input> 
         <input  onClick={()=>setEdit(true)} 
            contentEditable={edit}
            onChange ={(e)=>setDesc(e.target.value)}
            defaultValue ={desc}
            className ="modalInputDiv"
            placeholder = 'description'
           />
            
          {edit&&<div><Button className ="primaryBtn"onClick={handleSave}>Save</Button>
          <Button onClick={()=>setEdit(false)}>Cancel</Button></div>}

          </Modal>
          
    )
}

export default TaskModal
