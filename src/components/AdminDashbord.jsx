import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchProfile();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(Array.isArray(response.data) ? response.data : []);
            setError(null); // Réinitialise l'erreur en cas de succès
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs', error);
            setError("Erreur lors du chargement des utilisateurs.");
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            console.log("Fetching profile...");
            const token = localStorage.getItem('token');
            console.log("Token:", token); // Log du token
            const response = await axios.get('http://localhost:8000/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response data:", response.data); // Vérification de la réponse
            const userData = response.data.user || {};
            setProfile({
                name: userData.name || '',
                email: userData.email || '',
            });
            setError(null);
        } catch (error) {
            console.error('Erreur lors du chargement du profil', error);
            setError("Erreur lors du chargement du profil.");
        } finally {
            setLoading(false);
        }
    };
    
    const updateProfile = async () => {
        if (!profile.name || !profile.email) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            console.log("Updating profile with token:", token); // Log du token
            console.log("Profile data:", profile); // Log des données de profil
            const response = await axios.put(
                'http://localhost:8000/api/user/profile',
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Profile updated successfully:", response.data); // Vérification de la réponse
            alert('Profil mis à jour avec succès');
            setError(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
            alert('Erreur lors de la mise à jour du profil');
        }
    };
    

    /*const updateProfile = async () => {
        if (!profile.name || !profile.email) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            await axios.put(
                'http://localhost:8000/api/admin/profile',
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('Profil mis à jour avec succès');
            setError(null); // Réinitialise l'erreur en cas de succès
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
            alert('Erreur lors de la mise à jour du profil');
        }
    };*/

    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(users.filter(user => user.id !== userId));
            alert('Utilisateur supprimé avec succès');
            setError(null); // Réinitialise l'erreur en cas de succès
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
            alert('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>Espace Admin</h2>
                <ul>
                    <li><a href="#profile">Profil</a></li>
                    <li><a href="#users">Gestion des utilisateurs</a></li>
                </ul>
            </aside>

            <main className="main-content">
                <section id="profile" className="section admin-profile">
                    <h1>Profil de l'Administrateur</h1>
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="name">Nom</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nom"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <button onClick={updateProfile}>Mettre à jour</button>
                </section>

                <section id="users" className="section admin-users">
                    <h1>Gestion des Utilisateurs</h1>
                    {loading ? (
                        <p>Chargement des utilisateurs...</p>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Rôle</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">Aucun utilisateur trouvé.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;
