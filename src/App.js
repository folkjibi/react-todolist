import './App.css';
import Header from './components/Header';
import AddForm from './components/AddForm';
import Item from './components/Item';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])
  const [title, setTitle] = useState("")
  const [editId, setEditId] = useState(null);
  const [theme, setTheme] = useState("light");

  // เรียกใช้ useEffect เก็บข้อมูลใน localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // ระบบลบข้อมูล
  function deleteTask(id) {
    const result = tasks.filter(item => item.id !== id)
    setTasks(result)
  }
  // ระบบแก้ไขข้อมูล
  function editTask(id) {
    setEditId(id)
    const editTask = tasks.find((item) => item.id === id)
    setTitle(editTask.title)
  }
  // ระบบเซฟข้อมูล
  function saveTask(e) {
    e.preventDefault();
    if (!title) {
      alert("กรุณาป้อนข้อมูลด้วยครับ")
    } else if (editId) {
      // อัพเดตข้อมูล
      const updateTask = tasks.map((item) => {
        // รายการที่มีรหัสตรงกับแก้ไข
        if (item.id === editId) {
          return { ...item, title: title }
        }
        return item;
      })
      setTasks(updateTask)
      setEditId(null)
      setTitle("")
    } else {
      // เพิ่มรายการใหม่
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title
      }
      setTasks([...tasks, newTask])
      setTitle("")
    }
  }
  return (
    <div className={"App " + theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm title={title} setTitle={setTitle} saveTask={saveTask} editId={editId} />
        <section>
          {
            tasks.map((data) => (
              <Item key={data.id} data={data} deleteTask={deleteTask} editTask={editTask} />
            ))
          }
        </section>
      </div>
    </div>
  );
}

export default App;
