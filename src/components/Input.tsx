import "./styles/Input.scss"

const Input = ({ type, placeholder }: any) => {
  return <input className="Input" type={type} placeholder={placeholder} />;
};

export default Input;
