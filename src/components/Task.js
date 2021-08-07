import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, Route, Redirect } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import AddTask from './AddTask'
import { Button } from 'antd'
import TaskModal from './TaskModal'
const Task = ({ projects, onProjectEdit }) => {
  const { params } = useRouteMatch()
  console.log(params)
  const project = projects && projects.filter((prj) => (prj.id === parseInt(params.projectId)))[0]
  const [taskId, setTaskId] = useState(params.projectId)
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editedProject, setEdited] = useState('')
  const [redirect,setRedirect] =useState(false)

  const { url } = useRouteMatch()

  function onAddTask(task) {
    mutate()
  }
  function onTaskEdit() {
    mutate()
  }
  function handleCheck(e){
   if(e.target.checked) {
     console.log(e.target.parentNode)
     e.target.parentNode.style.textDecoration = 'line-through'
   }
   else  e.target.parentNode.style.textDecoration = 'none'

  }
  async function handleSave(e) {
    e.preventDefault()
    console.log(editedProject)
    try {
      await axios.put(`https://todoistmtblue.herokuapp.com/projects/${params.projectId}`, {
        name: editedProject
      })
      onProjectEdit(true)
      setEdited('')
      setEdit(false)
    }
    catch (err) {
      console.log(err)
    }

  }
  async function handleDelete(e, id) {
    e.preventDefault()
    try {
      await axios.delete(`https://todoistmtblue.herokuapp.com/tasks/${id}`)
      mutate()
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetcher = (url) =>
    axios
      .get(url, {
        method: "GET",
      })
      .then((res) => res.data)
  const { data, mutate, error } = useSWR('https://todoistmtblue.herokuapp.com/tasks', fetcher)
  useEffect(() => {
    setTaskId(+params.projectId)
  }, [params.projectId])

  if (!data) return (<div>Loading..</div>)
  if (error) return (<div>Error</div>)
  console.log("id ", taskId)
  console.log(data)
  return (
    <div className="task">
      <h1 onClick={() => setEdit(true)}
        contentEditable={edit}
        onInput={(e) => setEdited(e.target.innerText)}
      >
        {project && project.name}
      </h1>
      {edit && <div><Button className="primaryBtn" onClick={handleSave}>Save</Button>
        <Button onClick={() => setEdit(false)}>Cancel</Button></div>}
      {data.filter((task) => task.project_id === (taskId))
        .map((task) => (
          <div className="singleTask">
            <div className="taskList" key={task.id}>
              <input type="checkbox" className="newButtonDiv" onChange={handleCheck}></input>
              <div  className="singleTaskDiv" onClick={() => setShowModal(true)}><Link to={`${url}/task/${task.id}`}>{task.content}</Link></div>
            
              {/* <PlusCircleTwoTone className="newButtonDiv" /> */}
            </div>
            <div><Button shape="square" size="small" onClick={(e) => handleDelete(e, task.id)}>X</Button></div>
          </div>
        ))
      }

      <AddTask id={params} onAddTask={onAddTask} />
      <Route path='/project/:projectId/task/:taskId'>
        {showModal && <TaskModal showModal={showModal} projects={projects} tasks={data} setShowModal={setShowModal}
          onTaskEdit={onTaskEdit} setRedirect={setRedirect} />}
      </Route>
      {!showModal&&redirect&&<Redirect to ={`/project/${params.projectId}`}/>}

    </div>

  )
}

export default Task
