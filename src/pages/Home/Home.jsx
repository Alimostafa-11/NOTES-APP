import React, { useContext, useEffect, useState } from "react";
import Card from "../../component/Card/Card";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { userContext } from "../../context/user.context";
import axios from "axios";
import * as yup from "yup";
const Home = () => {
  let { token, setToken } = useContext(userContext);
  let [notes, setNotes] = useState(null);
  async function addNote(values) {
    let loading = toast.loading("loading...");
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      console.log(data);
      if (data.msg == "done") {
        // toast.success("Note Added Successfully");
        handleClose();
        getNotes();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
    console.log(values);
    handleClose();
    clearNote();
    toast.success("Note Added Successfully");
  }
  async function getNotes() {
    try {
      let { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      console.log(data);
      if (data.msg == "done") {
        // toast.success("Notes Adedd Successfully");
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getNotes();
  }, []);

  function clearNote() {
    formik.values.title = "";
    formik.values.content = "";
  }
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
    onSubmit: addNote,
    validationSchema,
  });

  return (
    <>
      <div className="home mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-row md:flex-row justify-between md:px-50 px-5 items-center pt-40 ">
          <div className="heading">
            <h1 className="text-2xl pe-4">My Notes</h1>
          </div>
          <div className="button">
            <button
              onClick={handleShow}
              type="submit"
              className="cursor-pointer bg-teal-400 p-2 text-lg rounded-md"
            >
              + Add Note
            </button>
          </div>
        </div>
        {notes == null ? (
          <h3 className="pt-10 px-5">loading...</h3>
        ) : (
          <div className="mt-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {notes?.map((note) => {
              return (
                <Card
                  key={note._id}
                  noteData={note}
                  getNotes={getNotes}
                  notes={notes}
                  setNotes={setNotes}
                />
              );
            })}
          </div>
        )}
      </div>
      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
              + Add Note
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
