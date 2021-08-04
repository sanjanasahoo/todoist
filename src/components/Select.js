import { Select } from 'antd';
import {BulbFilled} from '@ant-design/icons'

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default function SelectBox(){
    const options = [
        {
        id : 47,
        code :'#808080',
        label :'Charcoal'
        },
        
        { id: 30,
          code: '#b8256f',
          label : 'Berry Red'
        }
    ]
    return(
        <Select  style={{ width: 120 }} onChange={handleChange}>
        {options.map((color)=>{
            return(<Select.Option key ={color.id} value ={color.id}>{color.label}</Select.Option>)
        })}
        {/* <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option> */}
      </Select>
    )
}