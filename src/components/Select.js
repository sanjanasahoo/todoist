import { Select } from 'antd';


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
      </Select>
    )
}