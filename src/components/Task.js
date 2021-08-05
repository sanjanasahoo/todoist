import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
const Task = () => {
    const {params} = useRouteMatch()
    const [taskId,setTaskId] = useState(params.projectId)
    const fetcher = (url) =>
    axios
    .get(url,{ 
    method :"GET",
    // headers:{
    //   Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
    // }
  })
    .then((res)=>res.data)
    const {data,error}= useSWR('https://todoistmtblue.herokuapp.com/tasks',fetcher,{})
    useEffect(()=>{
        setTaskId(+params.projectId)
    },[params.projectId])
    if(!data) return (<div>Loading..</div>)
    if(error) return(<div>Error</div>)
    //setTasks(data)
    console.log("id ",taskId)
    return (
        <>
        {data.filter((task)=>task.project_id===(taskId))
        .map((task)=> (<div>{task.content}</div>))
        }
  </>
       
    )
}

export default Task
