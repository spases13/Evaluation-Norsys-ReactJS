import "./styles/DarkOverlay.scss"

const DarkOverlay = ({children , onClick} : any) => {
  return (
    <div onClick={onClick} className="DarkOverlay">{children}</div>
  )
}

export default DarkOverlay