import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import '../../styles/components/admin/AdminNovedades.css';

const AdminNovedades = () => {
    const [novedades, setNovedades] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        subtitulo: '',
        cuerpo: '',
        imagen: null
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarNovedades();
    }, []);

    const cargarNovedades = async () => {
        try {
            const response = await axios.get(`${API_URL}/novedades`);
            setNovedades(response.data);
        } catch (error) {
            setError('Error al cargar novedades');
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            Object.keys(formData).forEach(key => {
                formDataObj.append(key, formData[key]);
            });

            if (editingId) {
                await axios.put(`${API_URL}/novedades/${editingId}`, formDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_URL}/novedades`, formDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            setFormData({ titulo: '', subtitulo: '', cuerpo: '', imagen: null });
            setEditingId(null);
            cargarNovedades();
        } catch (error) {
            setError('Error al guardar la novedad');
            console.error('Error:', error);
        }
    };

    const handleEdit = (novedad) => {
        setFormData({
            titulo: novedad.titulo,
            subtitulo: novedad.subtitulo,
            cuerpo: novedad.cuerpo,
            imagen: null
        });
        setEditingId(novedad.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta novedad?')) {
            try {
                await axios.delete(`${API_URL}/novedades/${id}`);
                cargarNovedades();
            } catch (error) {
                setError('Error al eliminar la novedad');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="admin-novedades">
            <h2>Gestión de Novedades</h2>
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="novedad-form">
                <div className="form-group">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subtítulo:</label>
                    <input
                        type="text"
                        name="subtitulo"
                        value={formData.subtitulo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea
                        name="cuerpo"
                        value={formData.cuerpo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imagen:</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={handleInputChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit">
                    {editingId ? 'Actualizar' : 'Crear'} Novedad
                </button>
                {editingId && (
                    <button type="button" onClick={() => {
                        setEditingId(null);
                        setFormData({ titulo: '', subtitulo: '', cuerpo: '', imagen: null });
                    }}>
                        Cancelar Edición
                    </button>
                )}
            </form>

            <div className="novedades-list">
                {novedades.map(novedad => (
                    <div key={novedad.id} className="novedad-item">
                        <h3>{novedad.titulo}</h3>
                        <p>{novedad.subtitulo}</p>
                        {novedad.imagen && (
                            <img src={novedad.imagen} alt={novedad.titulo} />
                        )}
                        <div className="actions">
                            <button onClick={() => handleEdit(novedad)}>Editar</button>
                            <button onClick={() => handleDelete(novedad.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNovedades;