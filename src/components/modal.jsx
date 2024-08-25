import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { nanoid } from "nanoid/non-secure"
const GlobalModal = (props) => {
    const { open, toggle , data, setData, edit} = props
    const [form, setForm] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (edit.id) {
            data.forEach((item) =>{
                if (item.id === edit.id) {
                    item.name = form.name || edit.name
                    item.age = form.age || edit.age
                    item.phone = form.phone || edit.phone
                    item.addres = form.addres || edit.addres

                }
            })
        }else{
            let peylod = {...form, id: nanoid()}
            let new_data = [...data, {...peylod}]
            setData([...new_data])
        }
        toggle()
    }

    return (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <h2 className='text-center'>Add Student</h2>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} id="form">
                    <input type="text" defaultValue={edit.name} onChange={handleChange} placeholder="name" name="name" className="form-control my-2" />
                    <input type="number"defaultValue={edit.age} onChange={handleChange} placeholder="age" name="age" className="form-control my-2" />
                    <input type="text" defaultValue={edit.phone} onChange={handleChange} placeholder="phone" name="phone" className="form-control my-2" />
                    <input type="text" defaultValue={edit.addres} onChange={handleChange} placeholder="address" name="address" className="form-control my-2" />
                </form>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-success' type='submit' form='form'>Save</button>
            </ModalFooter>
        </Modal>
    )
}

export default GlobalModal
