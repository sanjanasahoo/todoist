import React, { useState } from 'react'
import { Button } from 'antd';
import { useRouteMatch } from 'react-router-dom';
const AddTask = ({onAddTask}) => {
    const [toggleAdd,setToggleAdd] = useState(false)
    const [taskdata,setTaskData]= useState({content:'',desc:''})
    const { params } = useRouteMatch()

      function handleClick(e){
         e.preventDefault()
        let taskBody = {
            content:taskdata.content,
            description:taskdata.desc,
            project_id :parseInt(params.projectId)
        }
        const url = 'https://todoistmtblue.herokuapp.com/tasks'
        const reqOptions = {
            method :"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body :JSON.stringify (taskBody)
          }
    
        fetch(url,reqOptions)
      .then((response)=>{
        return response.json()
      })
      .then((result)=>{
         console.log("result is ",result)
         onAddTask(result.task)
         setToggleAdd((toggleAdd)=> !toggleAdd)
         setTaskData({...taskdata,content:'',desc:''})    
        })
    }
    return (
        <div className="addTaskDiv">
            <div  style={{display:!toggleAdd?'inline-block':'none'}}>
            <Button  shape="circle" size="small" onClick={(e)=>{
                e.preventDefault()
                setToggleAdd((toggleAdd)=> !toggleAdd)}} className="toggleButton" >
                +
            </Button>   
            <span className="buttonText">Add Task</span>
            </div>
            <div className="bordered-div"style={{display:toggleAdd?'inline-block':'none'}}>
                  <div className="modalInputDiv">
                    Content:<input contentEditable="true" value ={taskdata.content} onChange={(e)=>{
                    setTaskData({...taskdata,content:e.target.value})}}>
                    </input>
                  </div>
                  <div className="modalInputDiv">
                Description:<input contentEditable="true" value ={taskdata.desc} onChange={(e)=>setTaskData({...taskdata,desc:e.target.value})}></input>
                </div >

                <div className ="newButtonDiv" > 
                <Button type="primary" onClick={handleClick} disabled={taskdata.content===''} id="primaryBtn">Add</Button>
                <Button onClick={()=>{setToggleAdd(false)}} >Cancel</Button>
                </div>
            </div>
                 
        </div>
    )
}

export default AddTask
