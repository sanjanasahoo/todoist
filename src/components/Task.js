import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import AddTask from './AddTask'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
const Task = ({projects}) => {
  const { params } = useRouteMatch()
  const project = projects&& projects.filter((prj)=>(prj.id==params.projectId))[0]
  const [taskId, setTaskId] = useState(params.projectId)
  function onAddTask(task){
  }
  const fetcher = (url) =>
    axios
      .get(url, {
        method: "GET",
        // headers:{
        //   Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
        // }
      })
      .then((res) => res.data)
  const { data, error } = useSWR('https://todoistmtblue.herokuapp.com/tasks', fetcher)
  useEffect(() => {
    setTaskId(+params.projectId)
  }, [params.projectId])

  if (!data) return (<div>Loading..</div>)
  if (error) return (<div>Error</div>)
  //setTasks(data)
  console.log("id ", taskId)
  console.log(data)
  return (
    <div className="task">
      
        <h1>{project.name}</h1>
        {data.filter((task) => task.project_id === (taskId))
          .map((task) => (
            <div class="singleTask">
            <div className="taskList" key={task.id}>
              <PlusCircleTwoTone className="newButtonDiv"/>
              <div>{task.content}</div>
            </div>
            <div><Button shape="square" size="small">X</Button></div>
            </div>
          ))
        }
     
      <AddTask id={params} onAddTask={onAddTask}/>
    </div>

  )
}

export default Task
