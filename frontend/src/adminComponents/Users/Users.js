import {useEffect, useState} from "react";
import AuthService from "../../services/authService";
import "./usersStyle.scss"
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const getUsers = () => {
        AuthService.getAllUsers()
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteAccount = (user) => {
        setModalIsOpen(true);
        setSelectedUser(user);
    };

        const editUser = (user) => {
        setEditModalIsOpen(true);
        setSelectedUser(user)
    }

    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin === "true" ? "Admin" : "User"}</td>
                        <td className="text-center">
                            <button className="btn btn-warning edit-user mx-3 py-1 px-3"
                                    onClick={() => editUser(user)}>Edit
                            </button>
                            <button className="btn btn-danger delete-user mx-3 py-1 px-2"
                                    onClick={() => deleteAccount(user)}>Delete
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
                {/*delete modal*/}
                {modalIsOpen && <DeleteUser showModal={setModalIsOpen} user={selectedUser} updatedDb={getUsers}/>}
            </table>
            {editModalIsOpen && <UpdateUser showModal={setEditModalIsOpen} user={selectedUser} updatedDb={getUsers}/>}
        </>
    )

}

export default Users;