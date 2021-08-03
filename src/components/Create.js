import { Modal, Button ,Form,Input} from 'antd';
import { useState } from 'react';

const Create = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [name,setName] = useState('')
    const url = 'https://api.todoist.com/rest/v1/projects'
    const showModal = () => {
      setVisible(true);
    };
    const handleOk = async () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        form.submit()
        
   
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };
      const onFinish =(values)=>{
       // setName(values.name)
       const name = values.name
    //    if(name!==''){
    //     const formdata = new FormData()
    //     console.log("my name ",name)
    //     formdata.append('name',name)
    //     const reqOptions = {
    //         method :"POST",
    //         "Content-Type": "application/json",
    //         headers:{
    //           Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
    //         },
    //         body : '{"name": "Shopping List"}' 
    //       }
    //       fetch(url,reqOptions)
    //       .then((response)=>{
    //         setVisible(false);
    //         setConfirmLoading(false);
    //         console.log("reso",response)
    //         return response.json()
    //       })
    //       .then((result)=>{
           
    //         console.log(result)
    //       })
    //     }
      }
    return (
       <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Add Project"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
 
        {/* <p>{modalText}</p> */}

        <Form form={form} layout="vertical" name="userForm" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Project name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
       
      </Form>
      </Modal>
       </>
    )
}

export default Create


