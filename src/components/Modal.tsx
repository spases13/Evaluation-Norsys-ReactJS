import DarkOverlay from "./DarkOverlay";
import "./styles/Modal.scss";
const Modal = ({onClick , children , title}  : any) => {
  return (
    <>
    <DarkOverlay onClick = {onClick}>
    <div className="Modal" onClick={(e : any)=>{e.stopPropagation()}}>
      <header>
        <button className="btn_close">
          <i className="bx bx-x"></i>
        </button>
        <h4>{title}</h4>
        <button
          onClick={onClick}
          className="btn_close"
          >
          <i className="bx bx-x"></i>
        </button>
      </header>
      <main>
        {children}
      </main>
    </div>
    </DarkOverlay>
  </>
  );
};

export default Modal;
