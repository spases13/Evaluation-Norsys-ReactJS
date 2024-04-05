import { useEffect, useState } from "react";
import Button from "../components/Button";
import Main from "../components/Main";
import Modal from "../components/Modal";
import "./styles/BooksPage.scss";
import Input from "../components/Input";

import toast from "react-hot-toast";
import axios from "axios";
import { User } from "../types/User";
import FormatDate from "../functions/FormatDate";
import ShrinkDate from "../functions/ShrinkDate";


const BooksPage = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  const [isUpdateMode , setIsUpdateMode] = useState(false)

  const [userId , setUserId] = useState<number | null>(null)

  const [date_inscription , setDateInscription] = useState<Date | string>()
  const [nom , setNom] = useState("")
  const [prenom , setPrenom] = useState("")
  const [tel , setTel] = useState("")

  // const [statusCode ,setStatusCode] = useState<number>(0);

  let userFormData : User = {
    date_inscription : date_inscription ,
    nom : nom , 
    prenom : prenom,
    tel : tel
  }

  useEffect(() => {
    if (usersData.length === 0) {
      axios.get("http://localhost:8787/api/bookloans/users").then((response: any) => {
        const data = response.data;
        setUsersData(data);
        console.log(data);
        
      });
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);


  const triggerPost = () => { 
    axios.post("http://localhost:8787/api/bookloans/users", userFormData)
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
      axios.delete("http://localhost:8787/api/bookloans/users/" + userId)
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
    const targetUser : any = usersData?.find((user : User) => user?.user_id === userid)
    setDateInscription((ShrinkDate(targetUser!.date_inscription.toString())))
    setNom(targetUser!.nom)
    setPrenom(targetUser!.prenom)
    setTel(targetUser!.tel)
    setUserId(targetUser!.user_id) 
  }


  const updateUser = (userid : null | number | string) => {
    axios.put(`http://localhost:8787/api/bookloans/users/${userid}`, userFormData)
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
    setDateInscription(new Date())
    setNom("")
    setPrenom("")
    setTel("")
  }
   
  return (
    <Main className="BooksPage">
      <header>
        <Button onClick={() => {clearInputs() ; setIsUpdateMode(false) ; setIsModalOpened(true)}} className="success">
          New User
        </Button>
      </header>
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Date Inscription</th>
            <th>Tel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user : any , index : number) => {
            return (
              <tr key={index}>
                <td>{user.user_id}</td>
                <td>{user.prenom}</td>
                <td>{user.nom}</td>
                <td>{FormatDate(user.date_inscription)}</td>
                <td>{user.tel}</td>
                <td className="actions">
                  <Button onClick={()=> triggerUpdate(user.user_id)} className="square info">
                    <i className="bx bx-pencil" />
                  </Button>
                  <Button onClick={()=>{triggerDelete(user.user_id)}} className="square danger">
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
          <Input value = {date_inscription} onChange = {(e : any)=> setDateInscription(e.target.value)} type="datetime-local" placeholder="Date Inscription" />
          <Input value = {nom} onChange = {(e : any)=> setNom(e.target.value)} type="text" placeholder="Nom" />
          <Input value = {prenom} onChange = {(e : any)=> setPrenom(e.target.value)} type="text" placeholder="Prenom" />
          <Input value = {tel} onChange = {(e : any)=> setTel(e.target.value)} type="text" placeholder="Tel" />
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

export default BooksPage;
