import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Editor } from '@tinymce/tinymce-react';
import api from '../../config/axiosconfig';

export default function ModalUpdate({ khachHang }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(khachHang?.moTa || '');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditorChange = content => {
    setDescription(content);
  };

  const handleSave = () => {
    const updatedData = {
      ...khachHang,
      moTa: description,
    };

    api
      .post('admin/khachhang/update', updatedData)
      .then(() => {
        alert('Cập nhật mô tả thành công!');
        handleClose();
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật mô tả:', error);
        alert('Có lỗi xảy ra khi cập nhật mô tả!');
      });
  };

  return (
    <div>
      <button className="btn btn-outline-primary btn-sm" onClick={handleOpen}>
        <i className="fas fa-plus me-2"></i> Thêm mô tả
      </button>

      {open && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-sm border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Cập nhật mô tả khách hàng</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                {/* Thông tin khách hàng */}
                <div className="mb-4">
                  <div className="form-group mb-3">
                    <label className="fw-medium">Tên khách hàng</label>
                    <input
                      type="text"
                      className="form-control"
                      value={khachHang?.ten || ''}
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-medium">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      value={khachHang?.soDienThoai || ''}
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-medium">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={khachHang?.email || ''}
                      readOnly
                    />
                  </div>
                </div>

                {/* TinyMCE Editor */}
                <div className="form-group">
                  <label className="fw-medium mb-2">Mô tả</label>
                  <Editor
                    apiKey="your-tinymce-api-key" // Thay bằng API key của bạn
                    value={description}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic underline | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save me-2"></i> Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
