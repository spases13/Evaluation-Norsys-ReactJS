import { useEffect, useState } from "react";
import Button from "../components/Button";
import Main from "../components/Main";
import Modal from "../components/Modal";
import "./styles/MeetingRoom.scss";
import Input from "../components/Input";

import toast from "react-hot-toast";
import axios from "axios";

const MeetingRoom = () => {
  const [meetingRoomsData, setMeetingRoomsData] = useState([]);

  useEffect(() => {
    if (meetingRoomsData.length === 0) {
      axios
        .get("http://localhost:8686/api/meeting-rooms")
        .then((response: any) => {
          const data = response.data;
          setMeetingRoomsData(data);
          console.log(data);
        });
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleSubmit = () => {
    toast.success("Meeting Room Added", { style: { fontWeight: 600 } });
  };

  return (
    <Main className="MeetingRoom">
      <header>
        <Button onClick={() => setIsModalOpened(true)} className="success">
          New Meeting Room
        </Button>
      </header>
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Meeting Room Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetingRoomsData.map((mr: any) => {
            return (
              <>
              <tr>
                <td>{mr.id}</td>
                <td>{mr.name}</td>
                <td className="actions">
                  <Button className="square info">
                    <i className="bx bx-pencil" />
                  </Button>
                  <Button className="square danger">
                    <i className="bx bx-trash" />
                  </Button>
                </td>
              </tr>
          </>
            );
          })}
        </tbody>
      </table>
      {isModalOpened && (
        <Modal
          title={"New Meeting Room"}
          onClick={() => setIsModalOpened(false)}
        >
          <Input type="number" placeholder="ID" />
          <Input type="text" placeholder="Meeting Room Name" />
          <Button
            onClick={() => handleSubmit()}
            style={{ marginTop: 10 }}
            className="success solid"
          >
            Submit
          </Button>
        </Modal>
      )}
    </Main>
  );
};

export default MeetingRoom;
