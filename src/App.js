import React, { useEffect, useState } from "react";
import EditStudentModal from "./components/EditStudentModal";
import "./assets/css/editModal.css"
import axios from "axios";

function App() {
  const [searchText,setSearchText]=useState("")
  const [searchField,setSearchField]=useState("name-surname")
  const [selectedClass,setSelectedClass]=useState(" Sınıfı")
  const [students, setStudents] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stdNumber, setStdNumber] = useState("");
  const [stdName, setStdName] = useState("");
  const [stdSurname, setStdSurname] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [didUpdate, setDidUpdate] = useState(false);
  const [showEditModal,setShowEditModal]=useState(false)
  const [selectedStudent,setSelectedStudent]=useState({
      id: "",
      studentNumber: "",
      name: "",
      surname: "",
      class: ""
  })

  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [didUpdate]);

   
  const handleAdd = (event) => {
    event.preventDefault()
    if (stdNumber === "" || stdName === "" || stdSurname === "" || stdClass === "") {
      alert("Bütün alanların doldurulması zorunludur.")
      return
    }
    const hasStudent = students.find(item => item.studentNumber === stdNumber)
    if (hasStudent !== undefined) {
      alert(`Öğrenci nosu ${stdNumber} olan bir kayıt zaten vardır. Başka bir öğrenci nosu giriniz. !`)
      return
    }
    const newStudent = {
      id: String(new Date().getTime()),
      studentNumber: stdNumber,
      name: stdName,
      surname: stdSurname,
      class: stdClass
    }
    axios.post("http://localhost:3004/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent])
        setShowAddForm(false)
      })
      .catch((err) => { })

  }

  const handleDelete = ((gelenid) => {
    axios.delete(`http://localhost:3004/students/${gelenid}`)
      .then((response) => {
        setDidUpdate(!didUpdate)

      })
      .catch((error) => { console.log(error) })
  })

  const handleSelect=(event)=>{
    setSearchField(event.target.value)    
  }

  const handleSelectClass=(event)=>{
    setSelectedClass(event.target.value)
  }

  //erken kaçış
  if (students === null) {
    return <h1>Loading</h1>;
  }

  
  const uniqueClass=Array.from(new Set(students.map(item => item.class)))
  uniqueClass.push(" Sınıfı")
  uniqueClass.sort()

  console.log("Benzersiz",uniqueClass)
    

  var filteredStudents=[]
  var selectclassArray=students
  console.log(selectedClass)
  
  if(selectedClass!=" Sınıfı"){
    selectclassArray=students.filter(item => item.class===selectedClass);
    console.log("Filteri Hali: " ,selectclassArray)
  }
  
    if(searchField==="name-surname") {filteredStudents=selectclassArray.filter(item => {
    if (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.surname.toLowerCase().includes(searchText.toLowerCase())
    )
    return true;
  } )}; 
 
 
  if(searchField==="name") {filteredStudents=selectclassArray.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
  if(searchField==="surname"){filteredStudents=selectclassArray.filter(item => item.surname.toLowerCase().includes(searchText.toLowerCase()))}
  if(searchField==="studentNumber"){filteredStudents=selectclassArray.filter(item => item.studentNumber.toLowerCase().includes(searchText.toLowerCase()))}
  if(searchField==="class"){filteredStudents=selectclassArray.filter(item => item.class.toLowerCase().includes(searchText.toLowerCase()))}

  return (
    <div>
      <nav className="navbar navar-light bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CRUD APP
          </a>
          <h2 className="navbar-brand navbar-dark">ByVely İlköğretim Okulu Öğrenci Bilgi Sistemi</h2>
        </div>
      </nav>
      <div className="container my-2">
        <div className="d-flex justify-content-between align-items-center deneme1">
          <div className="d-flex div-inline">
           
          <select className="form-select"  id="select1" onChange={handleSelect}>
            <option value="studentNumber">Öğrenci No</option>
            <option selected value="name-surname">Adı Soyadı</option>
            <option value="name">Adı</option>
            <option value="surname">Soyadı</option>
            <option value="class">Sınıfı</option>
          </select>
          <input type="text"
           className="form-control d-inline"
           placeholder="Type to search..."
           value={searchText}
           onChange={(event)=>{setSearchText(event.target.value)}}
           />
          </div>
          <button
            className="btn btn-primary btn-add"
            onClick={() => {
              setShowAddForm(!showAddForm);
              setStdNumber("");
              setStdName("");
              setStdSurname("");
              setStdClass("");
            }}
          >
            {
              showAddForm === false ? "Öğrenci Ekle" : "Kapat"
            }
          </button>
        </div>
        {showAddForm === true && (
          <form onSubmit={handleAdd} className="w-50 mx-auto">
            <div class="mb-3">
              <label htmlFor="stdNum" className="form-label">
                Öğrenci No
              </label>
              <input
                type="text"
                value={stdNumber}
                onChange={(event) => setStdNumber(event.target.value)}
                id="stdNum"
                className="form-control"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="stdName" className="form-label">
                Adı
              </label>
              <input
                type="text"
                value={stdName}
                onChange={(event) => setStdName(event.target.value)}
                id="stdName"
                className="form-control"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="stdSurname" className="form-label">
                Soyadı
              </label>
              <input
                type="text"
                value={stdSurname}
                onChange={(event) => setStdSurname(event.target.value)}
                id="stdSurname"
                className="form-control"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="stdClass" className="form-label">
                Sınıfı
              </label>
              <input
                type="text"
                value={stdClass}
                onChange={(event) => setStdClass(event.target.value)}
                id="stdClass"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success" type="submit">
                Kaydet
              </button>
            </div>
          </form>
        )}
        <div></div>
        <table className="table table-dark table-striped my-2">
          <thead>
            <tr>
              <th scope="col">Öğrenci No</th>
              <th scope="col">Adı</th>
              <th scope="col">Soyadı</th>
              <th scope="col">
              <select className="select2" value={selectedClass}   onChange={handleSelectClass}>
              {
              uniqueClass.map(item => {
                  return (<option key={item.id} value={item}>
                          {item}
                      </option>
                  )
              })
              }
             </select>
              
              </th>
              <th> İşlem </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={students.id}>
                <td>{student.studentNumber}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.class}</td>
                <td>
                  <button onClick={() => { handleDelete(student.id) }} className="btn btn-sm btn-danger mx-1">Sil</button>
                  <button onClick={() => { 
                  setShowEditModal(true);
                  setSelectedStudent(student)
                   }} className="btn btn-sm btn-info">Düzenle</button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        showEditModal && (<EditStudentModal didUpdate={didUpdate} setDidUpdate={setDidUpdate} students={students} selectedStudent={selectedStudent} setShowEditModal={setShowEditModal}/>)
      }
      
    </div>
  );
}

export default App;
