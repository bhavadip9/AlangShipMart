// import React, { useState } from 'react'
// import Button from 'react-bootstrap/esm/Button';
// import InputGroup from 'react-bootstrap/esm/InputGroup';
// import FormControl from 'react-bootstrap/esm/FormControl';
// import Form from 'react-bootstrap/Form'
// import { useNavigate } from 'react-router-dom'

// const SearchBox = () => {
//     const navigate = useNavigate();
//     const [query, setQuery] = useState('');
//     const submitHandler = (e) => {
//         e.preventDefault();
//         navigate(query ? `/search/?query=${query}` : `/search`)
//     }
//     return (
//         <div>
//             <Form className='d-flex me-auto' onSubmit={submitHandler}>
//                 <InputGroup>
//                     <FormControl type="text"
//                         name="q"
//                         id="q"
//                         onChange={(e) => setQuery(e.target.value)} placeholder="search product ...."
//                         aria-label="Search Product "
//                         aria-describedby="button-search"
//                     >
//                     </FormControl>
//                     <Button variant='outline-primary' type='submit' id='button-search'>
//                         <i className='fas fa-search'></i>
//                     </Button>
//                 </InputGroup>
//             </Form>
//         </div>
//     )
// }

// export default SearchBox
import { useState } from 'react'
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : `/search`);
    }

    return (
        <div>
            <Form className='d-flex me-auto' onSubmit={submitHandler}>
                <InputGroup>
                    <FormControl
                        type="text"
                        name="q"
                        id="q"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search product..."
                        aria-label="Search Product"
                        aria-describedby="button-search"
                    />
                    <Button variant='outline-primary' type='submit' id='button-search'>
                        <i className='fas fa-search'></i>
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
}

export default SearchBox;

