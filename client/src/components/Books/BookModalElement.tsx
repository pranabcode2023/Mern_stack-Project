import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { serverURL } from "../../utilis/serverURL";

interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
}

interface Comment {
  authorId: string;
  authorName: string;
  authorImage: string;
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface UserWhoPosted {
  _id: string;
  email: string;
  username: string;
  avatar: string;
}

interface Book {
  _id: string;
  bookName:string;
  userWhoPosted: UserWhoPosted;
  image: string;
  description: string;
  price: string;
  likes: string[];
  Comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BookModalElementProps {
  user: User | null;
  book: Book;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  handleCommentSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleCommentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteCommentModal: (bookId: string, commentId: string) => Promise<void>;
  textInput: string;
  getAllComments?: any;
}

const BookModalElement = ({
  user,
  book,
  comments,
  setComments,
  handleCommentSubmit,
  handleCommentChange,
  deleteCommentModal,
  textInput,
  getAllComments,
}: BookModalElementProps) => {
  const [modalComments, setModalComments] = useState<Comment[]>([]);
  const token = localStorage.getItem("token");

  const getModalComments = async (bookId: string) => {
    // console.log('%csbook ID',"color:blue", bookId)
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}books/allcomments/${bookId}`,
        `${serverURL}/api/books/allcomments/${bookId}`,
        requestOptions
      );
      //  console.log("%call comments :>> ", "color:green",response);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      // console.log("%call comments :>> ", "color:green",result);
      const updatedComments = result.book.Comments; // this is the new book back from the server without the comment we deleted
      console.log("%call comments :>> ", "color:green", updatedComments);

      setModalComments(updatedComments);

      // openModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    console.log("%cuseEffectmodal", "color:lightblue", book._id);
    getModalComments(book._id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.length, modalComments.length]);
  return (
    <>
      <h3>Comments</h3>
      {user ? (
        <>
          {console.log('JSX modal "comments">>> :', modalComments)}
          {modalComments.length > 0 ? (
            modalComments.map((comment) => (
              <div key={comment._id} className="single-comment-modal">
                <img
                  src={comment.authorImage}
                  alt="profile-img-author"
                  className="comment-user-pic"
                ></img>
                <span>
                  {comment.authorName}: {comment.text}
                </span>
                <p>
                  Posted on: {new Date(comment.createdAt).toLocaleDateString()}{" "}
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </p>
                {user && comment.authorId === user._id && (
                  <MdDeleteForever
                    className="delete-icon-comment"
                    onClick={() => {
                      deleteCommentModal(book._id, comment._id);
                      getModalComments(book._id);
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No comments found for this post</p>
          )}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              name="comment"
              placeholder="write something"
              onChange={handleCommentChange}
              value={textInput}
            />
            <br />
            <button className="custom-button" type="submit">
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>You have to log in to comment</p>
      )}
    </>
  );
};
export default BookModalElement;


