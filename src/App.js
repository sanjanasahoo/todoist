import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Header from './components/Header';
import Task from './components/Task'
import { Empty } from 'antd';
function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [editPrj,setPrjEdit] = useState(false)
  function onDelete(id) {
    setId(id)
  }
  function onAdd(item) {
    setData([...data, item])
  }
 
useEffect(()=>{
  fetch('https://todoistmtblue.herokuapp.com/projects', {
      method: "GET",
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setData(result)
      })
},[editPrj])
  useEffect(() => {
    fetch('https://todoistmtblue.herokuapp.com/projects', {
      method: "GET",
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setData(result)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    function onDelete() {
      console.log("id to deltee", id)
      fetch(`https://todoistmtblue.herokuapp.com/projects/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log("i m response status", response.status)
          setData((data) => data.filter(item => item.id !== id))
          setId(null)
        })

    }
    if (data && id) onDelete()

  })

  if (loading) return <div>...Loading</div>
  console.log(data)
  return (
    <Router>
      <Route path='/'>
        <Redirect to= '/project'/>
      </Route>
      <Route path='/project'>

        <Header />
        <div id="main">
        <Sidebar list={data} onDelete={onDelete} onAdd={onAdd}/>
        <Route exact path='/project'><Empty description='Select a Project' className="emptyPage"/></Route>
        <Route path='/project/:projectId'><Task projects={data} onProjectEdit={()=>setPrjEdit(!editPrj)}/></Route>
        {id&&<Redirect to ='/project'/>}

        </div>
      </Route>
    </Router>
  );
}

export default App;
