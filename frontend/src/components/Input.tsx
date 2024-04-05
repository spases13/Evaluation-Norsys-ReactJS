import "./styles/Input.scss"

const Input = ({ required , onBlur , onFocus ,  type, value, placeholder , disabled , onChange , isTextArea = false}: any) => {
  if(isTextArea) { 
    return (
      <textarea required = {required} value={value} cols={100} onChange={onChange} disabled = {disabled} className="Input" placeholder={placeholder} />
    )
  }
  else {
   return <input onBlur={onBlur} onFocus={onFocus} required = {required} value={value} onChange={onChange} disabled = {disabled} className="Input" type={type} placeholder={placeholder} />
  }
};

export default Input;