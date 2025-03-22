import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Editor } from '@tinymce/tinymce-react';
import TextField from '@mui/material/TextField';
import api from '../../config/axiosconfig'; // Giả sử bạn có API config

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Tăng chiều rộng để thoải mái hơn
  bgcolor: 'background.paper',
  border: '2px solid #1976d2', // Đổi màu viền thành xanh dương
  borderRadius: '8px', // Bo góc
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh', // Giới hạn chiều cao tối đa
  overflowY: 'auto', // Cho phép cuộn nếu nội dung dài
};

export default function ModalUpdate({ khachHang }) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState(khachHang?.moTa || ''); // Mô tả ban đầu nếu có

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
      moTa: description, // Cập nhật mô tả mới
    };

    api
      .post('admin/khachhang/update', updatedData) // Gửi yêu cầu cập nhật
      .then(() => {
        alert('Cập nhật mô tả thành công!');
        handleClose(); // Đóng modal sau khi lưu
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật mô tả:', error);
        alert('Có lỗi xảy ra khi cập nhật mô tả!');
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        sx={{ textTransform: 'none', fontWeight: 'bold' }} // Tùy chỉnh nút
      >
        Thêm mô tả
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}
          >
            Cập nhật mô tả khách hàng
          </Typography>

          {/* Hiển thị thông tin cơ bản của khách hàng */}
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Tên khách hàng"
              value={khachHang?.ten || ''}
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Số điện thoại"
              value={khachHang?.soDienThoai || ''}
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={khachHang?.email || ''}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Box>

          {/* TinyMCE Editor */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Mô tả:
          </Typography>
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

          {/* Nút hành động */}
          <Box
            sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
