import { useState, useEffect } from "react"
import GlobalModal from "./components/modal"

const App = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState({})

  useEffect(() => {
    const storedData = localStorage.getItem('studentData')
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(data))
  }, [data])

  const deleteData = (id) =>{
    let new_data = data.filter((item) => item.id !== id)
    setData([...new_data])
  }

  const editData = (item) =>{
    setEdit(item)
    setOpen(true)
  }

  return (
    <div className="container">
      <GlobalModal open={open} toggle={() => setOpen(false)} data={data} setData={setData} edit={edit}/>
      <div className="row my-3">
          <div className="col-md-3 offset-1">
            <button className="btn btn-success" onClick={() => { setEdit({}); setOpen(true) }}>Open Modal</button>
          </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-10 offset-1">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>T/R</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.phone}</td>
                      <td>{item.addres}</td>
                      <td>
                        <button className="btn btn-warning mx-2" onClick={() => editData(item)}>Edit</button>
                        <button className="btn btn-danger mx-2" onClick={() => deleteData(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
