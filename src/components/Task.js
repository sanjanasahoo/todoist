import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, Route, Redirect } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import AddTask from './AddTask'
import { PlusCircleTwoTone } from '@ant-design/icons'
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
  const { url } = useRouteMatch()

  function onAddTask(task) {
    mutate()
  }
  function onTaskEdit() {
    mutate()
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
      {edit && <div><Button onClick={handleSave}>Save</Button>
        <Button onClick={() => setEdit(false)}>Cancel</Button></div>}
      {data.filter((task) => task.project_id === (taskId))
        .map((task) => (
          <div className="singleTask">
            <div className="taskList" key={task.id}>
              <PlusCircleTwoTone className="newButtonDiv" />
              <div onClick={() => setShowModal(true)}><Link to={`${url}/task/${task.id}`}>{task.content}</Link></div>
            </div>
            <div><Button shape="square" size="small" onClick={(e) => handleDelete(e, task.id)}>X</Button></div>
          </div>
        ))
      }

      <AddTask id={params} onAddTask={onAddTask} />
      <Route path='/project/:projectId/task/:taskId'>
        {showModal && <TaskModal showModal={showModal} projects={projects} tasks={data} setShowModal={setShowModal}
          onTaskEdit={onTaskEdit} />}
      </Route>
    </div>

  )
}

export default Task
