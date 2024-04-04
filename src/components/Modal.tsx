import "./styles/Modal.scss";
const Modal = ({onClick , children , title}  : any) => {
  return (
    <div className="Modal">
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
  );
};

export default Modal;
