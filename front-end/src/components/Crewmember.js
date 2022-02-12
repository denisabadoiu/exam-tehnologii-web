import {Button} from "primereact/button";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {OrderList} from "primereact/orderlist";
import {Link, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";




const Crewmember = () => {
    const {id}=useParams();
    const [crewmembers,setCrewmembers]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [crewmember,setCrewmember]=useState({name:'',role:'',shipId:id});
    const [count,setCount]=useState(0)

    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleInputChange = (e) => {
        setCrewmember({...crewmember, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(crewmembers.find(row2=>row2.id===row.id));
        setCrewmember({
            id:item.id,
            name:item.name,
            role:item.role,
            shipId: id
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(crewmembers.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/crewmember/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error.response.data.message);
                alert(error.response.data.message);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/crewmember/${crewmember.id}`,crewmember)
            .then(() =>{
                setCount(count+1);

                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleCrewmember = () => {
        axios.post('http://localhost:8080/crewmember',crewmember)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleAddAstronaut = () => {
        setCrewmember({name:'',role:'',shipId: id});
        setIsEditing(false)
        handleModalOpen()
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/crewmember/${id}`)
            .then(res => {
                setCrewmembers(res.data);
                console.log('Crewmember:',res.data);
            })
    },[count])

    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.name}</h5>
                    <i className="pi pi-users "></i>
                    <span className="product-category">{item.role}</span>
                </div>
                <div className="product-list-action">

                    <Button label="Edit" onClick={()=> handleEditItem(item)} />
                    <Button label="Delete" className={"p-button-danger"}  onClick={()=> handleDeleteItem(item)} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="orderlist-demo">
            <h2 className="title">Crewmembers</h2>
                <Button className={"btn"} onClick={handleAddAstronaut}>Add Crewmember</Button>
                <div className="card">
                    {crewmembers ?
                        <OrderList value={crewmembers}
                                   listStyle={{ height: "auto" }}
                                   dataKey="id"
                                   itemTemplate={itemTemplate}
                                   header={"Crewmember"}/>
                        : null}
                </div>

                <Dialog header="Crewmember" visible={isModalOpened} style={{ width: '50vw' }}  onHide={handleModalClose}>
                    <span className="p-float-label p-m-6">
                    <InputText id="name" name={"name"} value={crewmember.name} onChange={handleInputChange} />
                    <label htmlFor="name">Name</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="role" name={"role"} value={crewmember.role} onChange={handleInputChange} />
                    <label htmlFor="role">Role (GENERAL,CAPTAIN)</label>
                    </span>
                    {isEditing ? <Button className={"p-ml-6"} label={"Edit crewmember"} onClick={handleEdit}/>:<Button className={"p-ml-6"} label={"Add crewmember"} onClick={handleCrewmember}/>}
                </Dialog>

            </div>
        </>
    )

}

export default Crewmember;