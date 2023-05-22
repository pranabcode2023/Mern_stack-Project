import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {}

type AddBookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  image: File | string;
};

const AddBook = (props: Props) => {
  const navigate = useNavigate();
  
 
  const [formData, setFormData] = useState<AddBookData>({
    name: '',
    description: '',
    price: '',
    author: '',
    available: false,
    image: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, image: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     navigate('/books'); // navigate to books page
    
    console.log(formData);
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('author', formData.author);
    submitData.append('available', String(formData.available));
    submitData.append('image', formData.image);
    
   
    

    const requestOptions = {
      method: 'POST',
      body: submitData,
    };
       
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/all`, requestOptions);
      const result = await response.json();
      console.log(result);
      //refresh the page after delete the items
      window.location.reload();
      alert('Success! Check console.');
    } catch (error) {
      console.log(error);
      alert('Something went wrong - check console.');
    }
  };
  

  
  
  return (
    <div className="addBook">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Add Book</div>

        <div className="input-container">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            name="author"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
        </div>

        <div className="input-container">
          <input type="file" id="image" placeholder="Image" onChange={handleFile} name="image" />
        </div>

        <div className="input-container">
          <label>Available</label>
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={handleChange}
            name="available"
          />
        </div>

        <div className="button-container">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;