import { useEffect, useState } from 'react';
import './App.css';
import { Affix,PageHeader } from 'antd';
import Sidebar from './components/Sidebar';
import Create from './components/Create';
 function App() {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(true)
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
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  if(loading) return <div>...Loading</div>

  console.log(data)
  return (
   <>
    <Affix offsetTop={10} style ={{background:'#db4c3f'}}>
    <PageHeader
    className="site-page-header"
    title="Home"
    subTitle="Welcome to Todoist"
  />
  </Affix>
  <Create/>
  <Sidebar list ={data}/>
   
   
   </>
  );
}

export default App;
