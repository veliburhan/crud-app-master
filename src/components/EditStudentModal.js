import React,{useState} from "react";
import axios from "axios";


const EditStudentModal = (props) => {
    const {setShowEditModal,selectedStudent,students,didUpdate,setDidUpdate} = props
    
    const [stdNum,setStdNum]=useState(selectedStudent.studentNumber)
    const [stdName,setStdName]=useState(selectedStudent.name)
    const [stdSurname,setStdSurname]=useState(selectedStudent.surname)
    const [stdClass,setStdClass]=useState(selectedStudent.class) 
    
    const handleEdit=(event)=>{
        event.preventDefault()
        if (stdNum === "" || stdName === "" || stdSurname === "" || stdClass === "") {
            alert("Bütün alanların doldurulması zorunludur.")
            return
          }
        const filteredStudents=students.filter(item=> item.id !== selectedStudent.id) 
        const hasStudent=filteredStudents.find(item=>item.studentNumber === stdNum)
        if(hasStudent !== undefined){
            alert("Öğrenci nosu daha önce kaydedilmiştir.")
            return
        }

        const updatedStudent={
            ...selectedStudent,
            Name: stdName,
            Surname:stdSurname,
            studentNumber:stdNum,
            class:stdClass
        }


        axios.put(`http://localhost:3004/students/${selectedStudent.id}`,updatedStudent)
        .then((response)=>{
            setShowEditModal(false)
            setDidUpdate(!didUpdate)

        })
        .catch((error)=>{console.log(error)})

        
    };
    
    
    
    
    return(
    <div className="modalMainContainer">
        <div className="modalContainer">
            <h1 className="modelTitle">Öğrenci Düzenle</h1>
            <form onSubmit={handleEdit} className="w-75 mx-auto">
            <div class="mb-3 yanyana">
              <label htmlFor="stdNum" className="form-label">
                Öğrenci No
              </label>
              <input
                type="text"
                value={stdNum}   
                onChange={(event) => setStdNum(event.target.value)}           
                id="stdNum"
                className="form-control"
              />
            </div>
            <div class="mb-3 yanyana">
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
            <div class="mb-3 yanyana">
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
            <div class="mb-3 yanyana">
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
                <button type="button" className="btn btn-outline-danger mx-3" onClick={()=> setShowEditModal(false)}>Kapat</button>
                <button className="btn btn-outline-primary" type="submit">
                Kaydet
              </button>
            </div>
          </form>
            
        </div>
        
        
    </div>
    )
}

export default EditStudentModal;