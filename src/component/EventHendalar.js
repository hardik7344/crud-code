import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MaterialTable from '@material-table/core'

function EventHendalar() {
  var [tableDate, settableDate] = useState("");
  var [refreshTable, setrefreshTable] = useState(true);
  var [myid, setid] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/studentInfo")
      .then((res) => settableDate(res.data))
      .catch((err) => console.log(err));
  }, [refreshTable]);

  const columns = [
    { title: "student Name", field: "studentName" },
    { title: " Age", field: "age" },
    { title: "Father Name", field: "FatherName" },
    { title: "Mother Name", field: "MotherName" },
    { title: "Gender", field: "gender" },
    {
      title: "Edit",
      render: (selectedRowData) => (
        <button
          onClick={() => fetchRowDataFun(selectedRowData)}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#EditEmployee"
        >
          Edit Icon
        </button>
      ),
    },
    {
      title: "Delete",
      render: (selectedRowData) => (
        <button
          onClick={() => fetchRowDataFun(selectedRowData)}
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#DeleteEmployee"
        >
          Delete Icon
        </button>
      ),
    },
  ]
  const AddEmployeeFun = () => {
    const dataToSend = {
      studentName: document.getElementById("studentName").value,
      age: document.getElementById("age").value,
      FatherName: document.getElementById("FatherName").value,
      MotherName: document.getElementById("MotherName").value,
      gender: document.getElementById("gender").value,
    };
    axios
      .post("http://localhost:3000/studentInfo", dataToSend)
      .then((res) => {
        console.log(res);
        setrefreshTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };
  const EditEmployeeFun = () => {
    const dataToSend = {
      studentName: document.getElementById("editstudentName").value,
      age: document.getElementById("editage").value,
      FatherName: document.getElementById("editFatherName").value,
      MotherName: document.getElementById("editMotherName").value,
      gender: document.getElementById("editgender").value,
    };
    axios
      .put(`http://localhost:3000/studentInfo/${myid}`, dataToSend)
      .then((res) => {
        console.log(res);
        setrefreshTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };
  const DeleteEmployeeFun=()=>{
    axios.delete(`http://localhost:3000/studentInfo/${myid}`)
    .then((res)=>{
      console.log(res);
      setrefreshTable((prevState)=>!prevState);
    })
    .catch((err)=> console.log(err));
  };

  const fetchRowDataFun = (selectedRowData) => {
    console.log(selectedRowData)
    document.getElementById("editstudentName").value = selectedRowData.studentName;
    document.getElementById("editage").value = selectedRowData.age;
    document.getElementById("editFatherName").value = selectedRowData.FatherName;
    document.getElementById("editMotherName").value = selectedRowData.MotherName;
    document.getElementById("editgender").value = selectedRowData.gender;
    setid(selectedRowData.id);
    // console.log(myid)
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className="row my-4 ml-1">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#AddEmployee"
          >
            Add Employee
          </button>
        </div>
        {tableDate && <MaterialTable columns={columns} data={tableDate} />}
      </div>
      <div className="modal-section">
        {/* add modal */}
        <div
          className="modal fade"
          id="AddEmployee"
          tabIndex="-1"
          aria-labelledby="AddEmployee"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Employee
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="studentName">student Name</label>
                  <input type="text" className="form-control" id="studentName" name='studentName' />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input type="text" className="form-control" id="age" />
                </div>
                <div className="form-group">
                  <label htmlFor="FatherName">Father Name</label>
                  <input type="text" className="form-control" id="FatherName" />
                </div>
                <div className="form-group">
                  <label htmlFor="MotherName">Mother Name</label>
                  <input type="text" className="form-control" id="MotherName" />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <input type="text" className="form-control" id="gender" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => AddEmployeeFun()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* edit modal */}
        <div
          className="modal fade"
          id="EditEmployee"
          tabIndex="-1"
          aria-labelledby="EditEmployee"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Employee
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editstudentName">student Name</label>
                  <input type="text" className="form-control" id="editstudentName" name='studentName' />
                </div>
                <div className="form-group">
                  <label htmlFor="editage">Age</label>
                  <input type="text" className="form-control" id="editage" />
                </div>
                <div className="form-group">
                  <label htmlFor="editFatherName">Father Name</label>
                  <input type="text" className="form-control" id="editFatherName" />
                </div>
                <div className="form-group">
                  <label htmlFor="editMotherName">Mother Name</label>
                  <input type="text" className="form-control" id="editMotherName" />
                </div>
                <div className="form-group">
                  <label htmlFor="editgender">Gender</label>
                  <input type="text" className="form-control" id="editgender" />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => EditEmployeeFun()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* delete modal */}
        <div
          className="modal fade"
          id="DeleteEmployee"
          tabIndex="-1"
          aria-labelledby="DeleteEmployee"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Employee
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete? you wont't be able to revert
                  the change
                </p>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                  onClick={() => DeleteEmployeeFun()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </React.Fragment>
  )
}

export default EventHendalar