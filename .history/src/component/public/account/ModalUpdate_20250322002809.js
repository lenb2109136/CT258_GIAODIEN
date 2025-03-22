import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Editor } from '@tinymce/tinymce-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUpdate({khachHang}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {  
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Thêm mô tả</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            
        </Box>
      </Modal>
    </div>
  );
}
