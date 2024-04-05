import "./styles/Input.scss"

const Input = ({ type, value, placeholder , disabled , onChange }: any) => {
  return <input value={value} onChange={onChange} disabled = {disabled} className="Input" type={type} placeholder={placeholder} />;
};

export default Input;
