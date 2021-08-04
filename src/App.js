import { useEffect, useState } from 'react';
import './App.css';
import { Affix,PageHeader } from 'antd';
import Sidebar from './components/Sidebar';
import Create from './components/Create';
 function App() {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [id,setId] = useState(null)
  const [tasks,setTasks] = useState(null)
  const [taskId,setTaskId] = useState('')
 function onDelete(id){
  setId(id)
 }
 function onAdd(item){
   setData([...data,item])
 }
 function showTasks(id){
   setTaskId(id)
   console.log("My tasks",tasks)
  
 }
 useEffect(()=>{
  fetch('https://api.todoist.com/rest/v1/projects',{
    method :"GET",
    headers:{
      Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
    }
  })
  .then((response)=>{
    return response.json()
  })
  .then((result)=>{
    setData(result)
    setTaskId(result[1].id)
  })
  fetch(`https://api.todoist.com/rest/v1/tasks`,{
    method :"GET",
    headers:{
      Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
    }
  })
  .then((response)=>{
    return response.json()
  })
  .then((result)=>{
    setTasks(result)
  })
  .finally(()=>{
    setLoading(false)
  })
 },[])
  useEffect(()=>{
    function onDelete(){
      console.log("id to deltee",id)
      fetch(`https://api.todoist.com/rest/v1/projects/${id}`,{
        method :"DELETE",
        headers:{
          Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
        }
      })
      .then((response)=>{
        console.log("i m response status",response.status)
        if(response.status===204) console.log("item delteed")
        setData((data)=>data.filter(item=>item.id!==id))
        setId(null)
      })
      
    }
    if(data&&id)onDelete()
 
  })
 
  if(loading) return <div>...Loading</div>
  console.log(data)
  console.log(tasks)
  return (
   <>
    <Affix offsetTop={10} style ={{background:'#db4c3f'}}>
    <PageHeader
    className="site-page-header"
    title="Home"
    subTitle="Welcome to Todoist"
  />
  </Affix>
  <Create onAdd ={onAdd}/>
  <Sidebar list ={data} onDelete={onDelete} showTasks={showTasks}/>
   {tasks&&tasks.filter((task)=>task.project_id===parseInt(taskId)).map((task)=> (<div>{task.content}</div>))}
   
   </>
  );
}

export default App;
