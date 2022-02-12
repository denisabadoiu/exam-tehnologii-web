import {Button} from "primereact/button";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {OrderList} from "primereact/orderlist";
import {Link, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";




const Ship = () => {
    const [ships,setShips]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [ship,setShip]=useState({name:'',displacement:''});
    const [count,setCount]=useState(0)

    const handleModalOpen = () => {
        setIsModalOpened(true);

    };

    const handleInputChange = (e) => {
        setShip({...ship, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(ships.find(row2=>row2.id===row.id));
        setShip({
            id:item.id,
            name:item.name,
            displacement: item.displacement
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(ships.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/ship/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error);
                alert(error.response.data.message);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/ship/${ship.id}`,ship)
            .then(() =>{
                setCount(count+1);
                console.log('Spacecraft:',ship);
                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);



            })

    }

    const handleShip = () => {
        axios.post('http://localhost:8080/ship',ship)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleAddSpacecraft = () => {
        setShip({name:'',displacement: ''});
        setIsEditing(false)
        handleModalOpen()
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/ship`)
            .then(res => {
                setShips(res.data);
            })
    },[count])

    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.name}</h5>
                    <i className="pi pi-send "></i>
                    <span className="product-category p-mr-2">{item.displacement}</span>
                </div>
                <div className="product-list-action">
                    <Link to={`/crewmember/${item.id}`}>
                        <Button label="Crewmember" />
                    </Link>
                    <Button label="Edit" onClick={()=> handleEditItem(item)} />
                    <Button label="Delete" className={"p-button-danger"}  onClick={()=> handleDeleteItem(item)} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="orderlist-demo">
                <h2 className="title">Ships</h2>
                <Button className={"btn"} onClick={handleAddSpacecraft}>Add Ship</Button>
                <div className="card">
                    {ships ?
                        <OrderList value={ships}
                                   listStyle={{ height: "auto" }}
                                   dataKey="id"
                                   itemTemplate={itemTemplate}
                                   header={"Ship"}/>
                        : null}
                </div>

                <Dialog header="Header" visible={isModalOpened} style={{ width: '50vw' }}  onHide={handleModalClose}>
                    <span className="p-float-label p-m-6">
                    <InputText id="name" name={"name"} value={ship.name} onChange={handleInputChange} />
                    <label htmlFor="name">Name</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="displacement" name={"displacement"} value={ship.displacement} onChange={handleInputChange} />
                    <label htmlFor="displacement">Displacement >50</label>
                    </span>
                    {isEditing ? <Button className={"p-ml-6"} label={"Edit ship"} onClick={handleEdit}/>:<Button className={"p-ml-6"} label={"Add ship"} onClick={handleShip}/>}
                </Dialog>

            </div>
        </>
    )

}

export default Ship;