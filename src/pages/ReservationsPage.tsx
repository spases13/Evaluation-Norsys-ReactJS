import Button from "../components/Button";
import Main from "../components/Main";
import "./styles/ReservationsPage.scss";

const ReservationsPage = () => {
  return (
    <Main className="ReservationsPage">
      <header>
        <Button className="success">New Reservation</Button>
      </header>
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>11/02/2023 16:00</td>
            <td>11/02/2023 18:00</td>
            <td className="actions">
              <Button className="square info">
                <i className="bx bx-pencil" />
              </Button>
              <Button className="square danger">
                <i className="bx bx-trash" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Main>
  );
};

export default ReservationsPage;
