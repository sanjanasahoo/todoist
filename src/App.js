import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Create from './components/Create';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './components/Header';
import Task from './components/Task'
function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  function onDelete(id) {
    setId(id)
  }
  function onAdd(item) {
    setData([...data, item])
  }

  useEffect(() => {
    fetch('https://todoistmtblue.herokuapp.com/projects', {
      method: "GET",
      // headers:{
      //   Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
      // }
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setData(result)
        // setTaskId(result[1].id)
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
        // headers:{
        //   Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
        // }
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
      <Route path='/project'>

        <Header />
        <Create onAdd={onAdd} />
        <div id="main">
        <Sidebar list={data} onDelete={onDelete} />
        <Route path='/project/:projectId'><Task projects={data}/></Route>
        </div>
      </Route>

    </Router>
  );
}

export default App;
