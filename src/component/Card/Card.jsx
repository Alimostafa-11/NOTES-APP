import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { userContext } from "../../context/user.context";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

const Card = ({ noteData, getNotes }) => {
  let { token, setToken } = useContext(userContext);
  let [notes, setNotes] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let validationSchema = yup.object({
    title: yup.string().required("title is required"),
    content: yup.string().required("content is required"),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: updateNote,
    validationSchema,
  });
  async function updateNote(values) {
    try {
      let { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteData._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Update Notes Successfully");
      handleClose();
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteNote() {
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteData._id}`,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      console.log(data);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="relative p-6 border-2 border-teal-400 rounded-lg pt-5 mt-5">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-teal-200 via-teal-500 to-teal-800"></span>

        <div className="my-4">
          <h2 className="text-gray-700 text-2xl font-bold pb-2">
            {noteData?.title}
          </h2>
          <p className="text-gray-700 py-1">{noteData?.content}</p>
        </div>

        <div className="flex justify-start gap-3 text-xl">
          <i
            onClick={handleShow}
            className="fa-solid fa-pen-to-square text-teal-500 cursor-pointer"
          ></i>
          <i
            onClick={deleteNote}
            className="fa-solid fa-trash text-red-500 cursor-pointer"
          ></i>
        </div>
      </div>

      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action="#"
            onSubmit={formik.handleSubmit}
            className=" w-full flex flex-col gap-4"
          >
            <div className="flex items-start flex-col justify-start">
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Enter Your Title"
                id="title"
                name="title"
                className="w-full px-3 text-black dark:bg-teal-400  py-2 rounded-md border border-teal-400 dark:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <input
                type="text"
                placeholder="Enter Your content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                id="content"
                name="content"
                className="w-full px-3 text-black dark:bg-teal-400 py-2 rounded-md border border-teal-300 dark:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handleShow}
              type="submit"
              className="cursor-pointer bg-teal-400 py-2 w-25 text-lg rounded-md"
            >
              Update Note
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Card;
