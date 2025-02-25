import React from "react";

const Comment = ({ avatar, author, date, content, replies }) => {
  return (
    <div style={styles.comment}>
      <div style={styles.commentHeader}>
        <img src={avatar} alt="Avatar" style={styles.avatar} />
        <div style={styles.commentInfo}>
          <p style={styles.author}>{author}</p>
          <p style={styles.date}>{date}</p>
        </div>
      </div>

      <p style={styles.content}>{content}</p>

      <div style={styles.replyContainer}>
        <button style={styles.replyButton}>Reply</button>
      </div>

      {replies && replies.length > 0 && (
        <div style={styles.replies}>
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
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
    marginBottom: "10px",
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
  replies: {
    marginTop: "15px",
    paddingLeft: "50px",
    borderLeft: "2px solid #ddd",
  },
};

const sampleComments = [
  {
    avatar: "https://i.pravatar.cc/45",
    author: "John Doe",
    date: "01 Jan 2045",
    content:
      "Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua, tempor labore accusam ipsum et no at.",
    replies: [
      {
        avatar: "https://i.pravatar.cc/45?img=2",
        author: "Jane Doe",
        date: "02 Jan 2045",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      },
    ],
  },
  {
    avatar: "https://i.pravatar.cc/45?img=3",
    author: "Alice",
    date: "03 Jan 2045",
    content:
      "Kasd diam tempor rebum magna dolores sed sed eirmod ipsum. Gubergren clita aliquyam.",
  },
];

const CommentSection = () => (
  <div style={{ padding: "30px", width: "100%", margin: "auto", textAlign: "left" }}>
    <h2 style={{ textTransform: "uppercase", letterSpacing: "2px", fontWeight: "bold" }}>
      3 Comments
    </h2>
    {sampleComments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ))}
  </div>
);

export default CommentSection;
