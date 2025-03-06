import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ comment, fetchReplies }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchReplies = async () => {
    if (comment.replies.length === 0) {
      setIsLoading(true);
      await fetchReplies(comment.id);
      setIsLoading(false);
    }
  };

  const addcomment = async () => {
    let f= new FormData()
  f.append("idcha", comment.id)
  f.append("noidung", document.getElementById("them"+comment.id).value)
  axios.post("http://localhost:8080/phanhoi/addthem",f)
    .then(data=>{
      if(data.data.status=="OK"){
        
        document.getElementById("them"+comment.id).value=""
        if(comment.replies.length!=0){
          fetchReplies(comment.id)

        }
        
      }
    })
  }
  return (
    <div style={styles.comment}>
      <div style={styles.commentHeader}>
        <img src={comment.avatar || "https://i.pravatar.cc/45"} alt="Avatar" style={styles.avatar} />
        <div style={styles.commentInfo}>
          <p style={styles.author}>{comment.author || "Unknown"}</p>
          <p style={styles.date}>{comment.date || "N/A"}</p>
        </div>
      </div>

      <p style={styles.content}>{comment.content || "No content available"}</p>
      <input placeholder="Để lại bình luận của bạn" id={"them"+comment.id
      } style={{padding:"10px",border:"0px", borderBottom:"1px solid black", outline:"none", marginBottom:"10px"}} type="text"></input>
      <div style={styles.replyContainer}>
        <button style={styles.replyButton} onClick={()=>{
          addcomment()
        }} >Reply</button>
        
        {comment.replies.length === 0 && (
          <p style={{marginLeft:"2%",cursor:"pointer",color:"#7AB730", marginBottom:"0px", height:"30px", marginTop:"10px"}} onClick={handleFetchReplies}>
            {isLoading ? "Đang tải..." : "Xem thêm phản hồi"}
          </p>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div style={styles.replies}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} fetchReplies={fetchReplies} />

          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/phanhoi/getbytour?id=${id}`);
        const formattedComments = response.data.data.map(d => ({
          id: d.id,
          avatar: "https://i.pravatar.cc/45",
          author: d.khachHang?.ten || "Unknown",
          date: d.thoiGianPhanHoi || "N/A",
          content: d.noiDungPhanHoi || "No content",
          replies: []
        }));
        setComments(formattedComments);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách comment:", error);
      }
    };
    fetchComments();
  }, [id]);

  const fetchReplies = async (commentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/phanhoi/getbyph?id=${commentId}`);
      const replies = response.data.data.map(d => ({
        id: d.id,
        avatar: "https://i.pravatar.cc/45",
        author: d.khachHang?.ten || "Unknown",
        date: d.thoiGianPhanHoi || "N/A",
        content: d.noiDungPhanHoi || "No content",
        replies: []
      }));

      setComments(prevComments =>
        prevComments.map(comment => updateCommentTree(comment, commentId, replies))
      );
    } catch (error) {
      console.error("Lỗi khi lấy phản hồi:", error);
    }
  };

  const updateCommentTree = (comment, targetId, newReplies) => {
    if (comment.id === targetId) {
      return { ...comment, replies: newReplies };
    }
    return {
      ...comment,
      replies: comment.replies.map(reply => updateCommentTree(reply, targetId, newReplies))
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Bình luận</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} fetchReplies={fetchReplies} />
        ))
      ) : (
        <p>Chưa có bình luận nào.</p>
      )}
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    padding: "30px",
    width: "100%",
    margin: "auto",
    textAlign: "left",
  },
  header: {
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "bold",
  },
  comment: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  commentInfo: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    marginRight: "10px",
    border: "2px solid #ddd",
  },
  author: {
    margin: "0",
    fontWeight: "bold",
    color: "#28a745",
    fontSize: "1rem",
  },
  date: {
    fontStyle: "italic",
    color: "#777",
    fontSize: "0.9rem",
  },
  content: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "0px",
    textAlign: "left",
  },
  replyContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },
  replyButton: {
    padding: "6px 12px",
    border: "1px solid #28a745",
    background: "transparent",
    color: "#28a745",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "0.9rem",
    marginTop: "5px",
    transition: "all 0.3s ease",
  },
  viewReplies: {
    color: "#007bff",
    cursor: "pointer",
    marginLeft: "10px",
    fontSize: "0.9rem",
  },
  replies: {
    marginTop: "15px",
    paddingLeft: "50px",
    borderLeft: "2px solid #ddd",
  },
};

export default CommentSection;
