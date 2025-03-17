import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import api from "../../config/axiosconfig";
import { Editor } from "@tinymce/tinymce-react";
import ModalCK from "./ModalCK";
import axios from "axios";

function themVaoChuoi(chuoi1, chuoi2) {
  let tt = chuoi1.lastIndexOf(",");
  let result = chuoi1.slice(0, tt + 1);

  if (chuoi1.includes(',')) {
    return result + chuoi2 + ",";
  } else {
    return chuoi2 + ", ";
  }
}
function filterTags(tagsthongthuong, tagsgoiy, inputTags) {
  if (!tagsgoiy || tagsgoiy.length === 0) {
    tagsgoiy = [];
  }
  if (!inputTags || inputTags.trim() === '') {
    inputTags = '';
  }
  let inputTagsArray = inputTags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
  let allTagsToRemove = [...tagsgoiy, ...inputTagsArray];
  
  let filteredTags = tagsthongthuong.filter(tag => !allTagsToRemove.includes(tag));
  
  return filteredTags;
}




const AddTour = () => {

  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [tagsthongthuong, settagsthongthuong] = React.useState([])
  const [tagsgoiy, settagsgoiy] = React.useState([])
  const tagsRef = React.useRef("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const lastTag = inputValue.substring(inputValue.lastIndexOf(",") + 1).trim();

    api.get(`http://localhost:8080/tourtagsrecomment/getthongthuong?tags=${lastTag}`)
      .then(data => {
        settagsthongthuong(data.data.data);
      });

    api.get(`http://localhost:8080/tourtagsrecomment/getrecomment?tags=${e.target.value}`)
      .then(data => {

        settagsgoiy(data.data.data)
      })
  };



  const [stateReload, setStateReload] = React.useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const checkDate = (date1, date2) => {
    if (date1 > date2 || date1 < new Date() || date2 < new Date()) {
      alert(
        "Ngày kết thúc và phaie lớn hơn ngày hiện tại và bé hơn ngày bắt đầu"
      );
    } else {
    }
  };

  const [open, setOpen] = React.useState(false);
  const tag = React.useRef("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");
  const [tour, setTour] = React.useState({
    thoiGianKhoiHanh: "2025-06-02T09:57:06",
    tags: "",
    soNgay: 4,
    soDem: 4,
    soNguoiThamGia: 5,
    moTa: "...",
    ten: "Pearl Island Getaway",
    anh: "http://localhost:8080/datasource/1.jpeg",
    loaiTour: {
      id: 2,
      ten: "culture",
      icon: "https://cdn-icons-png.flaticon.com/128/1813/1813884.png",
    },
    nhanvien: {
      id: 1,
      ten: "Nguyễn Duy Anh",
      anh: null,
      soDienThoai: "0709302846",
      socmnd: "09094347340232",
      sdt: "0709302846",
    },
    thoiGianKhoiHanh2: [
      // {
      //   thoiGian: "2025-07-02T10:21:27",
      //   gia: 1800.0,
      //   nhanVien: {
      //     id: 1,
      //     ten: "Nguyễn Duy Anh",
      //     anh: null,
      //     soDienThoai: "0709302846",
      //     socmnd: "09094347340232",
      //     sdt: "0709302846",
      //   },
      //   giaUuDai: [
      //     {
      //       id: 2,
      //       gia: 1200.0,
      //       ngayGioApDung: "2025-03-11T16:00:05",
      //       ngayKetThuc: "2025-03-11T16:00:06",
      //     },
      //   ],
      //   trangThai: 1,
      // },
    ],
    chan: [
    ],
  });

  const addNgayKhoiHanh = () => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    tour.thoiGianKhoiHanh2.push({
      thoiGian: now.toISOString(),
      gia: 1800.0,
      nhanVien: null,
      giaUuDai: [],
      trangThai: 0,
    });

    setStateReload(!stateReload);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [loaiTour, setLoaiTour] = React.useState([]);
  const [nhanVien, setNhanVien] = React.useState([]);

  React.useEffect(() => {
    api
      .get("loaitour/getall")
      .then((v) => {
        setLoaiTour(v.data.data);
      })
      .then((v) => { });
    api
      .get("nhanvien/getall")
      .then((v) => v.data)
      .then((v) => {
        setNhanVien(v);
      });
    api.get("tour/gettags")
      .then(data => {
        tagsRef.current = data.data.data
      })
  }, []);

  const submit = () => {
    api
      .post("tour/add", tour)
      .then((v) => {
        if (v.data.status != "OK") {
          alert(v.data.message)
        }
        else {
          alert("Thêm thông tour thành công")
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  React.useEffect(()=>{
    settagsthongthuong(tagsthongthuong,tagsgoiy,document.getElementById("tags"))
  },[])
  React.useEffect(()=>{
    settagsthongthuong(tagsthongthuong,tagsgoiy,document.getElementById("tags"))
  },[tagsgoiy])
  return (
    <div>
      <Button onClick={handleOpen}>Thêm mới tour</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h6 className="mb-4 text-primary fw-bold text-center">
            Thêm tour mới <button style={{ color: "white", marginLeft: "20px", border: "1px solid #0D6EFD", borderRadius: "10px", backgroundColor: "#0D6EFD", paddingLeft: "10px", paddingRight: "10px" }} onClick={submit}> + Thêm tour mới</button>
          </h6>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Thông tin cơ bản" value="1" />
                  <Tab label="Mô tả" value="2" />
                  <Tab label="Thông tin khởi hành" value="3" />
                  <Tab label="Thông tin chặn" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="row">
                  <div style={{ width: "60%" }}>
                    <div className="containercontainer">
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Tên tour</p>
                        <input
                          value={tour.ten}
                          onChange={(e) => {
                            tour.ten = e.target.value;
                            setStateReload(!stateReload)
                          }}
                          placeholder="Vui lòng nhập tên tour"
                          className="col-9 p-2"
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                        />
                      </div>
                      <div>
                        <div className="row mt-2" style={{ alignItems: "center" }}>
                          <p className="col-3">Tags</p>
                          <input
                            onChange={(e) => { handleInputChange(e) }}
                            placeholder="Nhập tags gợi ý"
                            className="col-9 p-2"
                            id="tags"
                            style={{
                              borderRadius: "3px",
                              outline: "none",
                              border: "1px solid lightgray",
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Số ngày</p>
                        <input
                          min={0}
                          value={tour.soNgay}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              tour.soNgay = e.target.value;
                              setStateReload(!stateReload)
                            }
                          }}
                          type="number"
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                          className="col-9 p-2"
                        />
                      </div>
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Số đêm</p>
                        <input
                          min={0}
                          value={tour.soDem}
                          onChange={(e) => {
                            if (e.target.value > 0) {

                              tour.soDem = e.target.value;
                              setStateReload(!stateReload)
                            }
                          }}
                          type="number"
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                          className="col-9 p-2"
                        />
                      </div>
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Số lượng người tham gia</p>
                        <input
                          min={0}
                          value={tour.soNguoiThamGia}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              tour.soNguoiThamGia = e.target.value;
                              setStateReload(!stateReload)
                            }
                          }}
                          type="number"
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                          className="col-9 p-2"
                        />
                      </div>
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Số lượng filefile</p>
                        <input
                          type="file"
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                          className="col-9 p2"
                        />
                      </div>
                      <div className="row mt-2" style={{ alignItems: "center" }}>
                        <p className="col-3">Loại tour</p>
                        <select
                          onChange={(e) => {
                            tour.loaiTour = loaiTour[e.target.value];
                          }}
                          style={{
                            borderRadius: "3px",
                            outline: "none",
                            border: "1px solid lightgray",
                          }}
                          className="col-9 p-2"
                        >
                          {loaiTour.map((v, index) => {
                            return <option value={index}>{v.ten}</option>;
                          })}
                        </select>
                      </div>

                    </div>
                  </div>
                  <div style={{ width: "40%" }}>
                    <div>
                      <p>tags gợi ý:</p>
                      <div>
                        {tagsthongthuong.map((du, index) =>
                          du !== "" ? (
                            <button
                              key={index}
                              style={{
                                color: "#0D6EFD",
                                border: "1px solid #0D6EFD",
                                paddingLeft: "7px",
                                paddingRight: "7px",
                                marginRight: "7px",
                                marginTop: "10px",
                                backgroundColor: "white",
                                borderRadius: "2px",
                                transition: "background-color 0.3s ease, color 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0D6EFD";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "white";
                                e.target.style.color = "#0D6EFD";
                              }}
                              onClick={() => {
                                let t = document.getElementById("tags").value;

                                if (!t.includes(",")) {
                                  document.getElementById("tags").value = du;
                                } else {
                                  let arr = t.split(",");
                                  arr[arr.length - 1] = du;
                                  document.getElementById("tags").value = arr.join(",") + ",";
                                }

                              }}
                            >
                              {du}
                            </button>
                          ) : null
                        )}


                      </div>
                    </div>
                    <div style={{marginTop:"12px"}}>
                      <p >tags có thể dùng:</p>
                      <div >
                        {tagsgoiy.map((du, index) =>
                          du !== "" ? (
                            <button
                              key={index}
                              style={{
                                color: "#0D6EFD",
                                border: "1px solid #0D6EFD",
                                paddingLeft: "7px",
                                paddingRight: "7px",
                                marginRight: "7px",
                                marginTop: "10px",
                                backgroundColor: "white",
                                borderRadius: "2px",
                                transition: "background-color 0.3s ease, color 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0D6EFD";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "white";
                                e.target.style.color = "#0D6EFD";
                              }}
                              onClick={() => {
                                let t = document.getElementById("tags").value;

                                if (!t.includes(",")) {
                                  document.getElementById("tags").value = du;
                                } else {
                                  let arr = t.split(",");
                                  arr[arr.length - 1] = du;
                                  document.getElementById("tags").value = arr.join(",") + ",";
                                }

                              }}
                            >
                              {du}
                            </button>
                          ) : null
                        )}


                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <Editor
                  onEditorChange={(content) => {
                    tour.moTa = content
                    setStateReload(!stateReload)
                  }}
                  apiKey="gmrlr5eof1cew5jiwsqpjawlsc3yv10fn13pxtr2peb8l5jm"
                  init={{
                    plugins: [
                      "anchor",
                      "autolink",
                      "charmap",
                      "codesample",
                      "emoticons",
                      "image",
                      "link",
                      "lists",
                      "media",
                      "searchreplace",
                      "table",
                      "visualblocks",
                      "wordcount",
                      "checklist",
                      "mediaembed",
                      "casechange",
                      "export",
                      "formatpainter",
                      "pageembed",
                      "a11ychecker",
                      "tinymcespellchecker",
                      "permanentpen",
                      "powerpaste",
                      "advtable",
                      "advcode",
                      "editimage",
                      "advtemplate",
                      "ai",
                      "mentions",
                      "tinycomments",
                      "tableofcontents",
                      "footnotes",
                      "mergetags",
                      "autocorrect",
                      "typography",
                      "inlinecss",
                      "markdown",
                      "importword",
                      "exportword",
                      "exportpdf",
                    ],
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                  value={tour.moTa}
                  initialValue={tour.moTa}
                />
              </TabPanel>
              <TabPanel value="3">
                <Button onClick={addNgayKhoiHanh} variant="outlined">
                  + Thêm thông tin khởi hành
                </Button>
                {tour.thoiGianKhoiHanh2.map((v, index) => {
                  return (
                    <>
                      <hr className="mt-2 mb-2" />
                      <div className="row mt-2 ml-1" style={{ gap: 15 }}>
                        <input
                          value={v.thoiGian}
                          defaultValue={new Date()}
                          onChange={(e) => {
                            if (new Date(e.target.value) > new Date()) {
                              v.thoiGian = e.target.value;
                              setStateReload(!stateReload)
                            }
                          }}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="datetime-local"
                          className="col-3"
                          placeholder="ngày bắt đầu"
                        />
                        <input


                          value={v.gia}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              v.gia = e.target.value;
                              setStateReload(!stateReload)
                            }
                          }}


                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="number"
                          className="col-3"
                          placeholder="Giá"
                        />
                        <select
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          onChange={(e) => {
                            // alert(e.target.value)
                            // v.nhanVien=nhanVien[e.target.value]
                            let tt = { ...tour }
                            tt.thoiGianKhoiHanh2[index].nhanVien = nhanVien[e.target.value];
                            setTour(tt)
                          }}
                          className="col-3"
                        >
                          {nhanVien.map((vv, index) => {
                            return <option value={index}>{vv.ten}</option>;
                          })}
                        </select>
                        <Button
                          onClick={() => {
                            tour.thoiGianKhoiHanh2.splice(index, 1);
                            setStateReload(!stateReload);
                          }}
                          className="col-1 p-2"
                          variant="outlined"
                        >
                          Xóa
                        </Button>
                        <Button
                          onClick={() => {
                            const today = new Date(); // Lấy ngày hiện tại
                            const futureDate = new Date();
                            futureDate.setDate(today.getDate() + 2);
                            v.giaUuDai.push({
                              gia: 1200.0,
                              ngayGioApDung: today,
                              ngayKetThuc: futureDate,
                            });
                            setStateReload(!stateReload);
                          }}
                          className="col-1 p-2"
                          variant="outlined"
                        >
                          + ưu đãi
                        </Button>
                      </div>
                      <div
                        style={{
                          borderRadius: "0px 0px 0px 10px",
                          borderLeft: "2px solid black",
                        }}
                      >
                        {v.giaUuDai.map((vv, index) => {
                          return (
                            <>
                              <div
                                className="row mt-2 ml-5"
                                style={{ gap: 15 }}
                              >
                                <input
                                  defaultValue={new Date()}
                                  value={vv.ngayGioApDung}
                                  onChange={(e) => {
                                    if (new Date(e.target.value) > new Date()) {
                                      vv.ngayGioApDung = e.target.value
                                      setStateReload(!stateReload)
                                    }
                                  }}
                                  style={{
                                    outline: "none",
                                    borderRadius: "5px",
                                    border: "1px solid lightgray",
                                  }}
                                  type="datetime-local"
                                  className="col-3"
                                  placeholder="ngày bắt đầu"
                                />
                                <input
                                  value={vv.ngayKetThuc}
                                  onChange={(e) => {
                                    if (new Date(e.target.value) > new Date()) {
                                      vv.ngayKetThuc = e.target.value
                                      setStateReload(!stateReload)
                                    }
                                  }}
                                  defaultValue={vv.ngayKetThuc}
                                  style={{
                                    outline: "none",
                                    borderRadius: "5px",
                                    border: "1px solid lightgray",
                                  }}
                                  type="datetime-local"
                                  className="col-3"
                                  placeholder="ngày bắt đầu"
                                />
                                <input
                                  value={vv.gia}
                                  style={{
                                    outline: "none",
                                    borderRadius: "5px",
                                    border: "1px solid lightgray",
                                  }}
                                  onChange={(e) => {

                                    if (e.target.value > 0) {
                                      vv.gia = e.target.value
                                      setStateReload(!stateReload)
                                    }
                                  }}
                                  min={0}
                                  type="number"
                                  className="col-3"
                                  placeholder="Giá giảm"
                                />
                                <Button
                                  onClick={() => {
                                    v.giaUuDai.splice(index, 1);
                                    setStateReload(!stateReload);
                                  }}
                                  className="col-1 p-2"
                                  variant="outlined"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </TabPanel>
              <TabPanel value="4">
                <Button onClick={() => {
                  tour.chan.push({
                    moTa: "",
                    ngayBatDau: 1,
                    ngayKetThuc: 1,
                    diaDiemDen: "Cần thơ",
                  })
                  setStateReload(!stateReload)
                }} variant="outlined">
                  + Thêm chặn
                </Button>
                {tour.chan.map((v, index) => {
                  return (
                    <>
                      <hr className="mt-2 mb-2" />
                      <div className="row mt-2 ml-1" style={{ gap: 15 }}>
                        <input value={v.ngayBatDau}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              v.ngayBatDau = e.target.value
                              setStateReload(!stateReload)
                            }
                          }}
                          defaultValue={1}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="number"
                          className="col-2"
                          placeholder="Ngày bắt đầu"
                        />
                        <input
                          value={v.ngayKetThuc}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              v.ngayKetThuc = e.target.value
                              setStateReload(!stateReload)
                            }
                          }}
                          defaultValue={1}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="number"
                          className="col-2"
                          placeholder="Ngày kết thúc"
                        />
                        <input
                          value={v.diaDiemDen}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          onChange={(e) => {
                            v.diaDiemDen = e.target.value
                            setStateReload(!stateReload)
                          }}
                          type="text"
                          className="col-2"
                          placeholder="Địa điểm"
                        />
                        <div
                          className="col-3"
                          style={{ height: "40px", overflow: "auto" }}
                        >
                          <ModalCK
                            setReload={() => setStateReload(!stateReload)}
                            index={index}
                            tour={tour}
                          />
                        </div>
                        <Button
                          onClick={() => {
                            tour.chan.splice(index, 1);
                            setStateReload(!stateReload);
                          }}
                          className="col-1 p-2"
                          variant="outlined"
                        >
                          Xóa
                        </Button>
                      </div>
                    </>
                  );
                })}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default AddTour;
