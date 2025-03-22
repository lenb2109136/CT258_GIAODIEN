<thead className="table-dark">
  <tr>
    {/* Remove the "#" column */}
    <th scope="col">Mã vé</th>
    <th scope="col">Tên khách hàng</th>
    <th scope="col">Tên tour</th>
    <th scope="col">Giá</th>
    <th scope="col">Ngày đặt</th>
    <th scope="col">Hành động</th>
  </tr>
</thead>
<tbody>
  {filteredBookings.length > 0 ? (
    filteredBookings.map(booking => (
      <tr key={booking.id}>
        {/* Remove the "#" column */}
        <td className="fw-medium">{booking.id}</td>
        <td>{booking.khachHang?.ten || 'N/A'}</td>
        <td>{booking.thoiGianKhoiHanh?.tour?.ten || 'N/A'}</td>
        <td>{booking.gia.toLocaleString()} VND</td>
        <td>{new Date(booking.ngayDat).toLocaleDateString()}</td>
        <td>
          <button className="btn btn-outline-warning btn-sm me-2">
            <i className="fas fa-edit"></i> Sửa
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(booking.id)}
          >
            <i className="fas fa-trash"></i> Xóa
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center text-muted py-4">
        Không tìm thấy vé nào
      </td>
    </tr>
  )}
</tbody>