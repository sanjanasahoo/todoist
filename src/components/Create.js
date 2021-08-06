import { Modal, Button ,Form,Input, Tooltip} from 'antd';
import { useState } from 'react';
//import { nanoid } from 'nanoid'
const Create = ({onAdd}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const url = 'https://todoistmtblue.herokuapp.com/projects'
    const showModal = () => {
      setVisible(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        form.submit()
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };
      const onFinish =(values)=>{
      console.log(values)
       const name = values.name
       if(name!==''){
        const reqOptions = {
            method :"POST",

            headers:{
              "Content-Type": "application/json",
              // 'X-Request-Id' : nanoid(),
              // Authorization : 'Bearer 21b9ac4155a319b70c242b214bf710c0b282018a'
            },
            body :JSON.stringify (values)
          }
          fetch(url,reqOptions)
          .then((response)=>{
            setVisible(false);
            setConfirmLoading(false);
            return response.json()
          })
          .then((result)=>{
            form.resetFields()
            onAdd(result.project)
          })
        }
      }
    return (
       <>
       <div className="button-div">
         <Tooltip title="Add">
       <Button onClick={showModal} size="small">
         +
      </Button>
      </Tooltip>
       </div>
     
      <Modal
        title="Add Project"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
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


