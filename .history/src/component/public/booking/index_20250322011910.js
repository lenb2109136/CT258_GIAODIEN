const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  api
    .get('ve/getall')
    .then(response => {
      console.log('API Response:', response.data);
      console.log('Bookings Data:', response.data.data);
      setBookings(response.data.data || []);
      setLoading(false);
    })
    .catch(error => {
      console.error('Lỗi khi lấy danh sách vé:', error);
      setError('Không thể tải danh sách vé. Vui lòng thử lại sau.');
      setBookings([]);
      setLoading(false);
    });
}, []);

if (loading) return <div>Đang tải...</div>;
if (error) return <div>{error}</div>;
