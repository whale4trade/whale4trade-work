import { useState } from "react";
import axios from "axios";
import env from "../../../../../environments/enviroments";
const EditBundle = (props) => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    win: "",
    ImgBundle: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState<any>(null);
  const [err, setErr] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const updateUser = async () => {
    try {
      await axios
        .patch(`${env.url}/bundle/${props.b.id}`, {
          name: props.b.name,
          price: input.price === "" ? props.b.price : input.price,
          win: input.win === "" ? props.b.win : input.win,
          ImgBundle:
            input.ImgBundle === "" ? props.b.imgbundle : input.ImgBundle,
          description:
            input.category === "" ? props.b.category : input.category,
          category:
            input.description === "" ? props.b.description : input.description,
          id: props.b.id,
        })
        .then((res) => {
          window.location.reload();
        });
    } catch (err: any) {
      setErr(err.response.data);
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };
  const handleSubmit = (event) => {
    if (file !== null) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post(`${env.ver}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          input.ImgBundle = res.data;
        })
        .then(() => {
          updateUser();
        })
        .catch((error) => {});
    } else {
      updateUser();
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#EditBundle${props.b.id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`EditBundle${props.b.id}`}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Whale4trade
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                name="price"
                onChange={handelChange}
                placeholder="price"
              />
              <input
                type="number"
                name="win"
                onChange={handelChange}
                placeholder="win"
              />
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                placeholder="ImgBundle"
              />
              <textarea
                onChange={handelChange}
                name="description"
                placeholder="description"
              />
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={handelChange}
              >
                <option value="sel">select category</option>
                <option value="hide">Hide</option>
                <option value="bronze">bronze</option>
                <option value="silver">silver</option>
                <option value="gold">gold</option>
                <option value="platinum">platinum</option>
                <option value="vip">vip</option>
              </select>
              {err}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBundle;
