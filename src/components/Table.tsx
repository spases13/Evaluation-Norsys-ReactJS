import Button from "./Button"
import "./styles/Table.scss"

const Table = () => {
  return (
    <table className="Table" border={2}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Room Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Room 1</td>
          <td>
            <Button className = "square primary">B</Button>
            <Button className = "square success">B</Button>
            <Button className = "square danger">B</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table