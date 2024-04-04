import { useEffect, useState } from "react";
import Button from "../components/Button";
import Main from "../components/Main";
import Modal from "../components/Modal";
import "./styles/UsersPage.scss";
import Input from "../components/Input";

import toast from "react-hot-toast";
import axios from "axios";
import { User } from "../types/User";

const UsersPage = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  const [isUpdateMode , setIsUpdateMode] = useState(false)

  const [userId , setUserId] = useState<number | null>(null)

  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [email , setEmail] = useState("")

  // const [statusCode ,setStatusCode] = useState<number>(0);

  let userFormData : User = {
    firstName : firstName ,
    lastName : lastName , 
    email : email
  }

  useEffect(() => {
    if (usersData.length === 0) {
      axios.get("http://localhost:8686/api/users").then((response: any) => {
        const data = response.data;
        setUsersData(data);
      });
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);


  const triggerPost = () => { 
    axios.post("http://localhost:8686/api/users", userFormData)
    .then(() => {
      toast.success("User Added Success", { style: { fontWeight: 600 } });
      setTimeout(()=>{
        window.location.reload()
      } , 1000)
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast.error("Error: " + error.response.data.message, { style: { fontWeight: 600 } });
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from server", { style: { fontWeight: 600 } });
      } else {
        console.error("Request setup error:", error.message);
        toast.error("Request setup error", { style: { fontWeight: 600 } });
      }
    });
  }



  const triggerDelete = (userId: any) => {
    if (window.confirm(`Are you sure you want to delete User id = ${userId} ?`)) {
      axios.delete("http://localhost:8686/api/users/" + userId)
      .then(()=>{
        toast.success(`User Deleted Success : id : ${userId}`, { style: { fontWeight: 600 } }); 
        setTimeout(()=>{
          window.location.reload()
        },  1000)
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error: " + error.message , { style: { fontWeight: 600 } }); 
      });
    } 
  }
  
  const triggerUpdate = (userid : any) => {  
    setIsModalOpened(true)
    setIsUpdateMode(true)
    const targetUser : any = usersData?.find((user : User) => user?.id === userid)
    setFirstName(targetUser!.firstName)
    setLastName(targetUser!.lastName)
    setEmail(targetUser!.email)
    setUserId(targetUser!.id)
    
  }


  const updateUser = (userid : null | number | string) => {
    axios.put(`http://localhost:8686/api/users/${userid}`, userFormData)
    .then(() => {
      toast.success("User Updated Success", { style: { fontWeight: 600 } });
      setTimeout(()=>{
        window.location.reload()
      } , 1000)
    })
    
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast.error("Error: " + error.response.data.message, { style: { fontWeight: 600 } });
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from server", { style: { fontWeight: 600 } });
      } else {
        console.error("Request setup error:", error.message);
        toast.error("Request setup error", { style: { fontWeight: 600 } });
      }
    });
  }
  

  const clearInputs = () => { 
    setFirstName("")
    setLastName("")
    setEmail("")
  }
   
  return (
    <Main className="UsersPage">
      <header>
        <Button onClick={() => {clearInputs() ; setIsUpdateMode(false) ; setIsModalOpened(true)}} className="success">
          New User
        </Button>
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
          {usersData.map((user : any , index : number) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="actions">
                  <Button onClick={()=> triggerUpdate(user.id)} className="square info">
                    <i className="bx bx-pencil" />
                  </Button>
                  <Button onClick={()=>{triggerDelete(user.id)}} className="square danger">
                    <i className="bx bx-trash" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalOpened && (
        <Modal title={isUpdateMode ? "Update User"  : "Add User"} onClick={() => setIsModalOpened(false)}>
          <Input disabled = {true} type="number" placeholder="ID" />
          <Input value = {firstName} onChange = {(e : any)=> setFirstName(e.target.value)} type="text" placeholder="First Name" />
          <Input value = {lastName} onChange = {(e : any)=> setLastName(e.target.value)} type="text" placeholder="Last Name" />
          <Input value = {email} onChange = {(e : any)=> setEmail(e.target.value)} type="text" placeholder="Email" />
          <Button
            onClick={() => isUpdateMode ?  updateUser(userId) : triggerPost()}
            style={{ marginTop: 10 }}
            className={`${isUpdateMode ? "info" : "success"} solid`}
          >
            {isUpdateMode ? "Update" :  "Submit"}
          </Button>
        </Modal>
      )}
    </Main>
  );
};

export default UsersPage;
