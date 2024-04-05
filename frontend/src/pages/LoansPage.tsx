import { useEffect, useState } from "react";
import Button from "../components/Button";
import Main from "../components/Main";
import Modal from "../components/Modal";
import "./styles/ReservationsPage.scss";
import Input from "../components/Input";
import toast from "react-hot-toast";
import axios from "axios";
import FormatDate from "../functions/FormatDate";
import ShrinkDate from "../functions/ShrinkDate";
import Loan from "../types/Loan";

const formatDateForServer = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const LoansPage = () => {
  const [loansData, setLoansData] = useState<Loan[]>([]);
  const [isUpdateMode , setIsUpdateMode] = useState(false)
  const [loanId , setLoanId] = useState<number | null>(null)
  const [bookId , setBookId] = useState("")
  const [userId , setUserId] = useState("")
  const [startDate , setStartDate] = useState<Date | string>()
  const [endDate , setEndDate] = useState<Date | string>()

  let userFormData : Loan = {
    book_id : bookId  ,
    user_id : userId  ,
    startDate : startDate ,
    endDate : endDate
  }

  const getData = ()=>{
    axios.get("http://localhost:8787/api/bookloans/loans").then((response: any) => {
      const data = response.data;
      setLoansData(data);
      // console.log(data);
    });
  }

  useEffect(() => {
    if (loansData.length === 0) {
     getData();
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const triggerPost = () => { 
    axios.post("http://localhost:8787/api/bookloans/loans", userFormData)
    .then(() => {
      toast.success("Loan Added Success", { style: { fontWeight: 600 } });
      getData()
      setIsModalOpened(false)
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

  const triggerDelete = (loanId: any) => {
    if (window.confirm(`Are you sure you want to delete Loan id = ${loanId} ?`)) {
      axios.delete("http://localhost:8787/api/bookloans/loans/" + loanId)
      .then(()=>{
        toast.success(`Loan Deleted Success : id : ${loanId}`, { style: { fontWeight: 600 } }); 
        getData()
        setIsModalOpened(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error: " + error.message , { style: { fontWeight: 600 } }); 
      });
    } 
  }
  
  const triggerUpdate = (loanId : any) => {  
    setIsModalOpened(true)
    setIsUpdateMode(true)
    const targetUser : any = loansData?.find((Loan : Loan) => Loan?.loan_id === loanId)
    setStartDate((ShrinkDate(targetUser!.startDate.toString()).slice(0,16)))
    setEndDate((ShrinkDate(targetUser!.endDate.toString()).slice(0,16)))
    setBookId(targetUser!.book_id)
    setUserId(targetUser!.user_id)
    setLoanId(targetUser!.loan_id)
  }

  const updateLoan = (loanId : null | number | string) => {
    axios.put(`http://localhost:8787/api/bookloans/loans/${loanId}`, userFormData)
    .then(() => {
      toast.success("Loan Updated Success", { style: { fontWeight: 600 } });
      getData()
      setIsModalOpened(false)
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
    setStartDate(new Date())
    setEndDate(new Date())
    setUserId("")
    setBookId("")
  }
   
  return (
    <Main className="ReservationsPage">
      <header>
        <Button onClick={() => {clearInputs() ; setIsUpdateMode(false) ; setIsModalOpened(true)}} className="success">
          New Loan
        </Button>
      </header>
      <table className="Table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Book ID</th>
            <th>User ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loansData.map((Loan : any , index : number) => {
            return (
              <tr key={index}>
                <td>{Loan.loan_id}</td>
                <td>{Loan.book_id}</td>
                <td>{Loan.user_id}</td>
                <td>{FormatDate(Loan.startDate)}</td>
                <td>{FormatDate(Loan.endDate)}</td>
                <td className="actions">
                  <Button onClick={()=>{triggerDelete(Loan.loan_id)}} className="square danger">
                    <i className="bx bx-trash" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalOpened && (
        <Modal title={isUpdateMode ? "Update Loan"  : "Add Loan"} onClick={() => setIsModalOpened(false)}>
          <h5>Loan ID</h5>
          <Input value = {loanId ?? ""} disabled = {true} type="number" placeholder="Loan ID" />
          <h5>Book ID</h5>
          <Input value = {bookId ?? ""} onChange = {(e : any)=> setBookId(e.target.value)} type="number" placeholder="Book ID" />
          <h5>User ID</h5>
          <Input value = {userId ?? ""} onChange = {(e : any)=> setUserId(e.target.value)} type="number" placeholder="User ID" />
          <h5>Start Date</h5>
          <Input value = {startDate instanceof Date ? formatDateForServer(startDate) : startDate ?? ""} onChange={(e: any) => setStartDate(e.target.value)} type="datetime-local" placeholder="Start Date" />
          <h5>End Date</h5>
          <Input value = {endDate instanceof Date ? formatDateForServer(endDate) : endDate ?? ""} onChange={(e: any) => setEndDate(e.target.value)} type="datetime-local" placeholder="End Date" />
          <Button
            onClick={() => isUpdateMode ?  updateLoan(loanId) : triggerPost()}
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

export default LoansPage;