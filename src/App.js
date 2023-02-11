// import logo from './logo.svg';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri'; 
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  const [value, setValue] = useState("");

  const [work, setWork] = useState([]);

  const handleAdd = () => {
    if(value === ''){
      toast.warn('Không được để trống !!!')
    }else{
      if(work.some(item => item.id === value?.replaceAll(' ', '-'))){
        toast.warn('Công việc đã tồn tại')
      }else{
        setWork(prev => [...prev, {id: value?.replaceAll(' ', '-'), job: value}])
        setValue('')
        toast.success('Thành công')
      }
    }
  };

  const handleUpdate = (id) => {
    work?.map(item => {
      if(item.id === id){
        setValue(item.job)
      }
    })
    // setWork(prev => prev.map(item => {
    //   if(item.id === id){
    //     console.log('item: ', item);
    //   }
    // }))
  }

  const handleDelete = (id) => {
    setWork(prev => prev.filter(item => item.id !== id)) 
    toast.success('Công việc đã được xoá khỏi danh sách!!!')
  }

  return (
    <div>
      <div className="flex flex-col gap-3 h-screen items-center justify-center bg-[#f1f1f1]">
          <div className="flex gap-3">
            <input type="text" onChange={(e) => {setValue(e.target.value)}} value={value} onKeyPress={(e) => {if(e.key === 'Enter'){handleAdd()}}} placeholder='Nhập nội dung' className='outline-none border border-green-500 px-3 py-1 w-[400px]'/>
            <button type='button' className='px-3 py-1 bg-blue-500 text-white rounded-md font-semibold' onClick={handleAdd}>Add</button>
          </div>
          <div className="content">
            <h3>Công việc: </h3>
            <ul>
              {work?.map(item => {
                return (
                <li key={item.id} className="flex gap-10 items-center">
                  <span>{item.job}</span>
                  <span className='cursor-pointer' onClick={() => handleUpdate(item.id)}><HiOutlinePencilAlt /></span>
                  <span className="cursor-pointer" onClick={() => handleDelete(item.id)}><RiDeleteBin6Line /></span>
                </li>
                )
              })}
            </ul>
          </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />
    </div>
  );
}

export default App;
