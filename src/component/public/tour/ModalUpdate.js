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

const UpdateTour = ({ tours }) => {
  const [stateReload, setStateReload] = React.useState(true);

  React.useEffect(() => {
    tour.thoiGianKhoiHanh2.forEach((v) => {
      console.log(new Date(v.thoiGian) > new Date());
      if (new Date(v.thoiGian) > new Date()) {
        v.canUpdate = true;
      } else {
        v.canUpdate = false;
        setCanUpdate(true);
      }
    });
    setStateReload(!stateReload);
  }, []);
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");
  const [tour, setTour] = React.useState(tours);
  const [canUpdate, setCanUpdate] = React.useState(false);
  const addNgayKhoiHanh = () => {
    tour.thoiGianKhoiHanh2.push({
      canUpdate:true,
      thoiGian: "2025-07-02T10:21:27",
      gia: 1800.0,
      nhanVien: {
        id: 1,
        ten: "Nguyễn Duy Anh",
        anh: null,
        soDienThoai: "0709302846",
        socmnd: "09094347340232",
        sdt: "0709302846",
      },
      giaUuDai: [
        {
          gia: 1200.0,
          ngayGioApDung: "2025-03-11T16:00:05",
          ngayKetThuc: "2025-03-11T16:00:06",
        },
      ],
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
      .then((v) => {});
    api
      .get("nhanvien/getall")
      .then((v) => v.data)
      .then((v) => {
        setNhanVien(v);
      });
  }, []);

  const submit = () => {
    api
      .post("tour/update", tour)
      .then((v) => {
        if(v.data.status!="OK"){
          alert(v.data.message)
        }
        else{
          alert("cập nhật thông tin tour thành công")
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="btn btn-outline-warning btn-sm me-2"
      >
        <i className="fas fa-edit"></i> Cập nhật
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <h6 className="mb-4 text-primary fw-bold text-center">
            Cập nhật tour <button style={{color:"white",marginLeft:"20px",border:"1px solid #0D6EFD",borderRadius:"10px",backgroundColor:"#0D6EFD",paddingLeft:"10px",paddingRight:"10px"}} onClick={submit}> + Cập nhật tour</button>
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
                <div className="containercontainer">
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Tên tour</p>
                    <input
                      disabled={canUpdate}
                      value={tour.ten}
                      onChange={(e) => {
                        tour.ten = e.target.value;
                        setStateReload(!stateReload);
                      }}
                      placeholder="Vui lòng nhập tour"
                      className="col-6 p-2"
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                    />
                  </div>
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Số ngày</p>
                    <input
                      disabled={canUpdate}
                      min={0}
                      value={tour.soNgay}
                      onChange={(e) => {
                        if (e.target.value > 0) {
                          tour.soNgay = e.target.value;
                          setStateReload(!stateReload);
                        }
                      }}
                      type="number"
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                      className="col-6 p-2"
                    />
                  </div>
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Số đêm</p>
                    <input
                      disabled={canUpdate}
                      min={0}
                      value={tour.soDem}
                      onChange={(e) => {
                        if (e.target.value > 0) {
                          tour.soDem = e.target.value;
                          setStateReload(!stateReload);
                        }
                      }}
                      type="number"
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                      className="col-6 p-2"
                    />
                  </div>
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Số lượng người tham gia</p>
                    <input
                      disabled={canUpdate}
                      min={0}
                      value={tour.soNguoiThamGia}
                      onChange={(e) => {
                        if (e.target.value > 0) {
                          tour.soNguoiThamGia = e.target.value;
                          setStateReload(!stateReload);
                        }
                      }}
                      type="number"
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                      className="col-6 p-2"
                    />
                  </div>
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Số lượng filefile</p>
                    <input
                      disabled={canUpdate}
                      type="file"
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                      className="col-6 p2"
                    />
                  </div>
                  <div className="row mt-2" style={{ alignItems: "center" }}>
                    <p className="col-3">Loại tour</p>
                    <select
                      disabled={canUpdate}
                      onChange={(e) => {
                        tour.loaiTour = loaiTour[e.target.value];
                      }}
                      style={{
                        borderRadius: "3px",
                        outline: "none",
                        border: "1px solid lightgray",
                      }}
                      className="col-6 p-2"
                    >
                      {loaiTour.map((v, index) => {
                        return <option value={index}>{v.ten}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
              <Editor
                   onEditorChange={(content) => {
                    tour.moTa=content 
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
                          disabled={!v.canUpdate}
                          value={v.thoiGian}
                          defaultValue={new Date()}
                          onChange={(e) => {
                            if (new Date(e.target.value) > new Date()) {
                              v.thoiGian = e.target.value;
                              setStateReload(!stateReload);
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
                          disabled={!v.canUpdate}
                          value={v.gia}
                          onChange={(e) => {
                            if (e.target.value > 0) {
                              v.gia = e.target.value;
                              setStateReload(!stateReload);
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
                          disabled={!v.canUpdate}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          onChange={(e) => {
                            v.nhanVien = nhanVien[e.target.value];
                          }}
                          className="col-3"
                        >
                          {nhanVien.map((vv, index) => {
                            return <option value={index}>{vv.ten}</option>;
                          })}
                        </select>
                        {v.canUpdate ? (
                          <>
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
                                const today = new Date();
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
                          </>
                        ) : (
                          <p></p>
                        )}
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
                                  disabled={!v.canUpdate}
                                  defaultValue={new Date()}
                                  value={vv.ngayGioApDung}
                                  onChange={(e) => {
                                    if (new Date(e.target.value) > new Date()) {
                                      vv.ngayGioApDung = e.target.value;
                                      setStateReload(!stateReload);
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
                                  disabled={!v.canUpdate}
                                  value={vv.ngayKetThuc}
                                  onChange={(e) => {
                                    if (new Date(e.target.value) > new Date()) {
                                      vv.ngayKetThuc = e.target.value;
                                      setStateReload(!stateReload);
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
                                  disabled={!v.canUpdate}
                                  value={vv.gia}
                                  style={{
                                    outline: "none",
                                    borderRadius: "5px",
                                    border: "1px solid lightgray",
                                  }}
                                  onChange={(e) => {
                                    if (e.target.value > 0) {
                                      vv.gia = e.target.value;
                                      setStateReload(!stateReload);
                                    }
                                  }}
                                  min={0}
                                  type="number"
                                  className="col-3"
                                  placeholder="Giá giảm"
                                />
                                {v.canUpdate && (
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
                                )}
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
                {!canUpdate && (
                  <Button onClick={()=>{
                    tour.chan.push({ 
                      moTa: "",
                      ngayBatDau: new Date(),
                      ngayKetThuc: new Date(),
                      diaDiemDen: "Cần thơ",
                    })
                    setStateReload(!stateReload)
                  }} variant="outlined">
                    + Thêm chặn
                  </Button>
                )}
                {tour.chan.map((v, index) => {
                  return (
                    <>
                      <hr className="mt-2 mb-2" />
                      <div className="row mt-2 ml-1" style={{ gap: 15 }}>
                        <input
                          value={v.ngayBatDau}
                          disabled={canUpdate}
                          onChange={(e) => {
                            if (e.target.value>0) {
                              v.ngayBatDau = e.target.value;
                              setStateReload(!stateReload);
                            }
                          }}
                          defaultValue={v.thoiGian}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="number"
                          className="col-2"
                          placeholder="ngày bắt đầu"
                        />
                        <input
                          disabled={canUpdate}
                          value={v.ngayKetThuc}
                          onChange={(e) => {
                            if (e.target.value>0) {
                              v.ngayBatDau = e.target.value;
                              setStateReload(!stateReload);
                            }
                          }}
                          defaultValue={new Date()}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}
                          type="number"
                          className="col-2"
                          placeholder="ngày bắt đầu"
                        />
                        <input
                          disabled={canUpdate}
                          style={{
                            outline: "none",
                            borderRadius: "5px",
                            border: "1px solid lightgray",
                          }}

                          value={v.diaDiemDen}
                          onChange={(e) => {
                            v.diaDiemDen = e.target.value;
                            setStateReload(!stateReload);
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
                        {!canUpdate && (
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
                        )}
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
export default UpdateTour;
