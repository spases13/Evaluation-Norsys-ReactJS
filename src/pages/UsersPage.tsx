import Button from "../components/Button";
import Main from "../components/Main";
import "./styles/UsersPage.scss"

const UsersPage = () => {
  return (
    <Main className="UsersPage">
       <header>
        <Button className = "success">New User</Button>
      </header>
        <table className="Table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Yassine</td>
              <td>Biznaoune</td>
              <td>ybiznaoune@gmail.com</td>
              <td className="actions">
                <Button className = "square info">
                  <i className="bx bx-pencil"/>
                </Button>
                <Button className = "square danger">
                <i className="bx bx-trash"/>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
    </Main>
  );
};

export default UsersPage;
