import { useEffect, useState } from "react";
import Button from "../components/Button";
import Main from "../components/Main";
import Modal from "../components/Modal";
import "./styles/BooksPage.scss";
import Input from "../components/Input";
import toast from "react-hot-toast";
import axios from "axios";
import { Book } from "../types/Book";
import FormatDate from "../functions/FormatDate";
import ShrinkDate from "../functions/ShrinkDate";


const BooksPage = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isUpdateMode , setIsUpdateMode] = useState(false)
  const [bookId , setBookId] = useState<number | null>(null)
  const [date_publish , setDatePublish] = useState<Date | string>((Date.now().toLocaleString()))
  const [summary , setSummary] = useState("")
  const [title , setTitle] = useState("")
  const [author , setAuthor] = useState("")
  const [type , setType] = useState("")
  const [quantity , setQuantity] = useState(0)

  let bookFormData : Book = {
    date_publish : date_publish,
    summary : summary,
    author : author,
    title : title,
    quantity : quantity,
    type : type,
  }

  const getData = () => {
    axios.get("http://localhost:8787/api/bookloans/books").then((response: any) => {
        const data = response.data;
        setBooksData(data);
      });
  }

  useEffect(() => {
    if (booksData.length === 0) {
      getData()
    }
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);


  const triggerPost = () => { 
    console.log(bookFormData);
    axios.post("http://localhost:8787/api/bookloans/books", bookFormData)
    .then(() => {
      toast.success("Book Added Success", { style: { fontWeight: 600 } });
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

  const triggerDelete = (bookId: any) => {
    if (window.confirm(`Are you sure you want to delete Book id = ${bookId} ?`)) {
      axios.delete("http://localhost:8787/api/bookloans/books/" + bookId)
      .then(()=>{
        toast.success(`Book Deleted Success : id : ${bookId}`, { style: { fontWeight: 600 } }); 
        getData()
        setIsModalOpened(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error: " + error.message , { style: { fontWeight: 600 } }); 
      });
    } 
  }
  
  const triggerUpdate = (bookId : any) => {  
    setIsModalOpened(true)
    setIsUpdateMode(true)
    const targetBook : any = booksData?.find((Book : Book) => Book?.book_id === bookId)
    setDatePublish((ShrinkDate(targetBook?.date_publish?.toString()).slice(0,10)))
    setSummary(targetBook!.summary)
    setTitle(targetBook!.title)
    setAuthor(targetBook!.author)
    setType(targetBook!.type)
    setQuantity(targetBook!.quantity)
    setBookId(targetBook!.book_id) 
  }

  const updateUser = (bookId : null | number | string) => {
    axios.put(`http://localhost:8787/api/bookloans/books/${bookId}`, bookFormData)
    .then(() => {
      toast.success("Book Updated Success", { style: { fontWeight: 600 } });
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
    setDatePublish("")
    setSummary("")
    setTitle("")
    setAuthor("")
    setType("")
    setQuantity(0)
  }
   
  return (
    <Main className="BooksPage">
      <header>
        <Button onClick={() => {clearInputs() ; setIsUpdateMode(false) ; setIsModalOpened(true)}} className="success">
          New Book
        </Button>
      </header>
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Type</th>
            <th>Date Publish</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {booksData.map((Book : any , index : number) => {
            return (
              <tr key={index}>
                <td>{Book.book_id}</td>
                <td>{Book.title}</td>
                <td>{Book.author}</td>
                <td className="summary">{Book.summary}</td>
                <td>{Book.type}</td>
                <td>{FormatDate(Book.date_publish).replace("00:00" ,"")}</td>
                <td>{Book.quantity}</td>
                <td className="actions">
                  <Button onClick={()=> triggerUpdate(Book.book_id)} className="square info">
                    <i className="bx bx-pencil" />
                  </Button>
                  <Button onClick={()=>{triggerDelete(Book.book_id)}} className="square danger">
                    <i className="bx bx-trash" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalOpened && (
        <Modal title={isUpdateMode ? "Update Book"  : "Add Book"} onClick={() => setIsModalOpened(false)}>
            {
            isUpdateMode && <>
              <h5>Book ID</h5>
              <Input value = {bookId ?? ""} disabled = {true} type="number" placeholder="Book ID" />
            </>
            }
          <h5>Publish Date</h5>
          <Input value={date_publish instanceof Date ? date_publish.toISOString().slice(0, 10) : date_publish ?? ""} onChange = {(e : any)=> setDatePublish(e.target.value)} type="date" placeholder="Date Publish" />
          <h5>Summary</h5>
          <Input isTextArea = {true} value = {summary ?? ""} onChange = {(e : any)=> setSummary(e.target.value)} type="text" placeholder="Summary" />
          <h5>Author</h5>
          <Input value = {author ?? ""} onChange = {(e : any)=> setAuthor(e.target.value)} type="text" placeholder="Author" />
          <h5>Title</h5>
          <Input value = {title ?? ""} onChange = {(e : any)=> setTitle(e.target.value)} type="text" placeholder="Title" />
          <h5>Type</h5>
          <Input value = {type ?? ""} onChange = {(e : any)=> setType(e.target.value)} type="text" placeholder="Type" />
          <h5>Quantity</h5>
          <Input value = {quantity ?? ""} onChange = {(e : any)=> setQuantity(e.target.value)} type="number" placeholder="Quantity" />
          <Button
            onClick={() => isUpdateMode ?  updateUser(bookId) : triggerPost()}
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