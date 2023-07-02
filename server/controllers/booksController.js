
// import BooksModel from "../models/booksModel.js";
// import { imageUpload } from "../utils/imageManagement.js";

// const getAllbooks = async (req, res) => {
//     try {
//         const books = await BooksModel.find();
//         res.status(200).json({ books });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Something went wrong..." });
//     }
// };

// const getById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const book = await BooksModel.findById(id).populate({ path: "author" });
//         if (!book) {
//             return res.status(404).json({ message: "No Book Found" });
//         }
//         res.status(200).json({ book });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Something went wrong..." });
//     }
// };

// const addBook = async (req, res) => {
//     console.log('req.file>>>>>>', req.file)
//     console.log('req.body>>>>>>', req.body)

//     try {
//         const image = await imageUpload(req.file, "user_books");
//         const newBook = new BooksModel({
//             ...req.body,
//             image: image
//         });
//         const savedBook = await newBook.save();
//         res.status(201).json({ book: savedBook });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to add the book" });
//     }
// };



// const updateBook = async (req, res) => {
//     console.log('req.file>>>><', req.file)
//     console.log('req.body>>>><', req.body)
//     try {
//         const image = await imageUpload(req.file, "user_books");
//         const updatedBookData = {
//             ...req.body,
//             image: image
//         };
//         const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, updatedBookData, { new: true });

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Unable to update by this ID" });
//         }

//         res.status(200).json({ book: updatedBook });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to update the book" });
//     }
// };

// const commentsBook = async (req, res) => {

//     const newComments = {
//         ...req.body,
//         author: req.user._id
//     };
//     console.log(newComments)
//     // res.send("testing")
//     try {
//         //NOTE - moongoose push method
//         const comments = await BooksModel.findByIdAndUpdate(req.params.id, { $push: { comments: newComments } }, { new: true });
//         res.status(200).json({ message: "comments added" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong..." });
//     }
// };

// const uncommentsBook = async (req, res) => {
//     const id = req.params.id;
//     const userId = req.user._id
//     const commentAuthor = req.body.author
//     const check = userId.equals(commentAuthor) //NOTE - mongoose equal method

//     // const isEqual = user._id.equals(oid)
//     // res.send(check)

//     if (check) {
//         try {
//             const uncommentsBook = await BooksModel.findByIdAndRemove(id, { $pull: { comments: { _id: req.body.delete } } }, { new: true });
//             if (!uncommentsBook) {
//                 return res.status(404).json({ message: "Unable to delete by this ID" });
//             }
//             res.status(200).json({ message: "Successfully Deleted" });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ message: "Something went wrong..." });
//         }
//     }
//     else {
//         res.status(403).json({ message: "you can't delete someone comment" })
//     }
// };

// const deleteBook = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const deletedBook = await BooksModel.findByIdAndRemove(id);
//         if (!deletedBook) {
//             return res.status(404).json({ message: "Unable to delete by this ID" });
//         }
//         res.status(200).json({ message: "Successfully Deleted" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong..." });
//     }
// };

// export { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook };



import BooksModel from "../models/booksModel.js";
import { imageUpload } from "../utils/imageManagement.js";

const getAllbooks = async (req, res) => {
    try {
        const books = await BooksModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong..." });
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await BooksModel.findById(id).populate({ path: "user" });
        if (!book) {
            return res.status(404).json({ message: "No Book Found" });
        }
        res.status(200).json({ book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong..." });
    }
};

const addBook = async (req, res) => {
    console.log('req.file>>>>>>', req.file)
    console.log('req.body>>>>>>', req.body)

    try {
        const avatar = await imageUpload(req.file, "user_books");
        const newBook = new BooksModel({
            ...req.body,
            avatar: avatar
        });
        const savedBook = await newBook.save();
        res.status(201).json({ book: savedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to add the book" });
    }
};



const updateBook = async (req, res) => {
    console.log('req.file>>>><', req.file)
    console.log('req.body>>>><', req.body)
    try {
        const avatar = await imageUpload(req.file, "user_books");
        const updatedBookData = {
            ...req.body,
            avatar: avatar
        };
        const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, updatedBookData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Unable to update by this ID" });
        }

        res.status(200).json({ book: updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to update the book" });
    }
};

const commentsBook = async (req, res) => {

    const newComments = {
        ...req.body,
        user: req.user._id
    };
    console.log(newComments)
    // res.send("testing")
    try {
        //NOTE - moongoose push method
        const comments = await BooksModel.findByIdAndUpdate(req.params.id, { $push: { comments: newComments } }, { new: true });
        res.status(200).json({ message: "comments added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};

const uncommentsBook = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id
    const commentUser = req.body.user
    const check = userId.equals(commentUser) //NOTE - mongoose equal method

    // const isEqual = user._id.equals(oid)
    // res.send(check)

    if (check) {
        try {
            const uncommentsBook = await BooksModel.findByIdAndRemove(id, { $pull: { comments: { _id: req.body.delete } } }, { new: true });
            if (!uncommentsBook) {
                return res.status(404).json({ message: "Unable to delete by this ID" });
            }
            res.status(200).json({ message: "Successfully Deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong..." });
        }
    }
    else {
        res.status(403).json({ message: "you can't delete someone comment" })
    }
};

const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await BooksModel.findByIdAndRemove(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Unable to delete by this ID" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};

export { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook };


