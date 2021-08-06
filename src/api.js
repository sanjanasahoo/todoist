export function addTask(values){
    console.log(values)
    const url = 'https://todoistmtblue.herokuapp.com/tasks'
    const reqOptions = {
        method :"POST",

        headers:{
          "Content-Type": "application/json",
        },
        body :JSON.stringify (values)
      }
      fetch(url,reqOptions)
      .then((response)=>{
        return response.json()
      })
      .then((result)=>{
          return result.task
      })
}