import "./Item.css";
import { BiSolidTrashAlt, BiEdit } from "react-icons/bi";

export default function Item(props) {
    const { data, deleteTask, editTask } = props
    return (
        <div className="list-item">
            <p>{data.title}</p>
            <div className="button-container">
                <BiSolidTrashAlt className="btn" onClick={() => deleteTask(data.id)} />
                <BiEdit className="btn" onClick={() => editTask(data.id)} />
            </div>
        </div>
    )
}