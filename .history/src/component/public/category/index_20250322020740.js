import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../config/axiosconfig';

export default function TourTypeAdmin() {
  const [tourTypes, setTourTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTourType, setEditedTourType] = useState({ ten: '', icon: '' });
  const [newTourType, setNewTourType] = useState({ ten: '', icon: '' });

  // Fetch all tour types
  useEffect(() => {
    api
      .get('/admin/loaitour/getall')
      .then(response => {
        setTourTypes(response.data.data || []);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách loại tour:', error);
        setTourTypes([]);
      });
  }, []);

  // Handle search
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Filter tour types based on search term
  const filteredTourTypes = tourTypes.filter(type => {
    const idString = type.id?.toString().toLowerCase() || '';
    const name = type.ten?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return idString.includes(search) || name.includes(search);
  });

  // Start editing
  const handleEdit = type => {
    setEditingId(type.id);
    setEditedTourType({ ten: type.ten, icon: type.icon });
  };

  // Handle input change for editing
  const handleInputChange = (field, value) => {
    setEditedTourType(prev => ({ ...prev, [field]: value }));
  };

  // Handle update
  const handleUpdate = () => {
    api
      .put(`/admin/loaitour/update/${editingId}`, editedTourType)
      .then(() => {
        setTourTypes(
          tourTypes.map(type =>
            type.id === editingId ? { ...type, ...editedTourType } : type
          )
        );
        setEditingId(null);
        alert('Cập nhật loại tour thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật loại tour:', error);
        alert('Có lỗi xảy ra khi cập nhật!');
      });
  };

  // Handle delete
  const handleDelete = id => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại tour này không?')) {
      api
        .delete(`/admin/loaitour/delete/${id}`)
        .then(() => {
          setTourTypes(tourTypes.filter(type => type.id !== id));
          alert('Xóa loại tour thành công!');
        })
        .catch(error => {
          console.error('Lỗi khi xóa loại tour:', error);
          alert('Có lỗi xảy ra khi xóa!');
        });
    }
  };

  // Handle add new tour type
  const handleAdd = () => {
    api
      .post('/admin/loaitour/add', newTourType)
      .then(response => {
        setTourTypes([...tourTypes, response.data.data]);
        setNewTourType({ ten: '', icon: '' });
        alert('Thêm loại tour thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi thêm loại tour:', error);
        alert('Có lỗi xảy ra khi thêm!');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary fw-bold">Quản lý Loại Tour</h2>

      {/* Search Bar and Add Form */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Tìm kiếm loại tour..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tên loại tour"
              value={newTourType.ten}
              onChange={e =>
                setNewTourType({ ...newTourType, ten: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="URL icon"
              value={newTourType.icon}
              onChange={e =>
                setNewTourType({ ...newTourType, icon: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              <i className="fas fa-plus me-2"></i> Thêm
            </button>
          </div>
        </div>
      </div>

      {/* Tour Types Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Mã loại</th>
                <th scope="col">Tên loại tour</th>
                <th scope="col">Icon</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourTypes.length > 0 ? (
                filteredTourTypes.map(type => (
                  <tr key={type.id}>
                    <td className="fw-medium">{type.id}</td>
                    <td>
                      {editingId === type.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedTourType.ten}
                          onChange={e =>
                            handleInputChange('ten', e.target.value)
                          }
                        />
                      ) : (
                        type.ten
                      )}
                    </td>
                    <td>
                      {editingId === type.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedTourType.icon}
                          onChange={e =>
                            handleInputChange('icon', e.target.value)
                          }
                        />
                      ) : (
                        <img
                          src={type.icon}
                          alt={type.ten}
                          style={{ width: '30px' }}
                        />
                      )}
                    </td>
                    <td>
                      {editingId === type.id ? (
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={handleUpdate}
                        >
                          <i className="fas fa-save"></i> Lưu
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning btn-sm me-2"
                          onClick={() => handleEdit(type)}
                        >
                          <i className="fas fa-edit"></i> Sửa
                        </button>
                      )}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(type.id)}
                      >
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    Không tìm thấy loại tour nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
