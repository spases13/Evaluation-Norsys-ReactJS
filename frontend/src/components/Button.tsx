import "./styles/Button.scss";

const Button = ({ children, className, onClick , style }: any) => {
  return (
    <button style={style} onClick={onClick} className={`Button ${className}`}>
      {children}
    </button>
  );
};

export default Button;