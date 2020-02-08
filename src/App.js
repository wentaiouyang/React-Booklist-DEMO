import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input } from 'reactstrap'

function App() {
  const [books,setBook] = useState([]);
  const [modal,setModal] = useState(false);
  const [editModal,setEditModal] = useState(false);
  const [newBookData,setData] = useState({
      name:'',
      price:'',
  });
  const [editData,setEdit] = useState({
      id:'',
      name:'',
      price:'',
  });

  useEffect(()=>{
    axios.get('http://localhost:3000/books').then((res)=>{
      setBook(res.data);
    })
  });

  let AddBook=()=>{
    axios.post('http://localhost:3000/books', newBookData).then((res)=>{
        books.push(res.data);
        setBook(books);
        setModal(false);
        setData({
            name:'',
            price:'',
        });
        console.log(res.data);
    })
  };

  let deleteBook = (id,name,price)=>{
          setEdit({
              id: id,
              name: name,
              price: price,
          });
        axios.delete('http://localhost:3000/books/'+ id).then((res)=>{
            axios.get('http://localhost:3000/books').then((res)=>{
                setBook(res.data);
            })
        })
    };

  let editBook=(id,name,price) => {
      setEdit({
          id: id,
          name: name,
          price: price,
      });
      toggleEditBookModal();
      console.log(editData)
  };

  let updateBook = ()=>{
      let {name,price}=editData;
      axios.put('http://localhost:3000/books/'+editData.id, {name,price}).then((res)=>{
          console.log(res.data)
      });
      setEditModal(!editModal);
      setEdit({
          id: '',
          name: '',
          price: '',
      });
  };

  let toggleNewBookModal=()=>{
      setModal(!modal);
  };

  let toggleEditBookModal=()=>{
      setEditModal(!editModal);
  };

  let booksList = books.map((book)=>{
      return(
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={()=>{editBook(book.id,book.name,book.price)}}>Edit</Button>
              <Button color="danger" size="sm" onClick={()=>{deleteBook(book.id,book.name,book.price)}}>Delete</Button>
            </td>
          </tr>
      )
  });

  return(
    <div className="App container">
        <Button className="my-3" color="primary" onClick={toggleNewBookModal} >Add Book</Button>
        <Modal isOpen={modal}>
            <ModalHeader>Add a new book</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="bookName">Book Name</Label>
                    <Input type="text" value={newBookData.newBookName} onChange={(e)=>{
                        newBookData.name = e.target.value;
                        setData(newBookData);
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="bookPrice">Book Price</Label>
                    <Input type="text" value={newBookData.newBookPrice} onChange={(e)=>{
                        newBookData.price = e.target.value;
                        setData(newBookData);
                    }}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={AddBook}>Add</Button>{' '}
                <Button color="secondary" onClick={toggleNewBookModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={editModal}>
            <ModalHeader toggle={toggleEditBookModal}>Edit the book</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="bookName">Book Name</Label>
                    <Input type="text" value={newBookData.newBookName} onChange={(e)=>{
                        editData.name = e.target.value;
                        setData(newBookData);
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="bookPrice">Book Price</Label>
                    <Input type="text" value={newBookData.newBookPrice} onChange={(e)=>{
                        editData.price = e.target.value;
                        setData(editData);
                    }}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={updateBook}>Update</Button>{' '}
                <Button color="secondary" onClick={toggleEditBookModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Table>
        <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {booksList}
        </tbody>
        </Table>
    </div>
  );
}

export default App;
