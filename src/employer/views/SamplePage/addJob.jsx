import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddJob() {
  const [cookies] = useCookies(["name", "employer_token", "companyId"]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      companyId: cookies.companyId,
      name: "",
      description: "",
      location: "",
      experience: "",
      skills: [""],
      salary: "",
      address: "",
      date: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Job name is required"),
      description: Yup.string().min(10).required("Description is required"),
      location: Yup.string().required("Location is required"),
      experience: Yup.number().min(0).required("Experience is required"),
      skills: Yup.array().of(Yup.string().required()).min(1, "At least one skill required"),
      salary: Yup.string().required("Salary is required"),
      address: Yup.string().required("Address is required"),
      date: Yup.date().required("Last date is required"),
    }),

    onSubmit: (values) => {
      axios
        .post("http://api.insunil.ind.in/jobs", values, {
          headers: { Authorization: `Bearer ${cookies.employer_token}` },
        })
        .then(() => {
          alert("Job added successfully");
          navigate("/employer");
        })
        .catch((err) => {
          alert(err.response?.data?.message || "Failed to add job");
        });
    },
  });

  const addSkill = () => {
    formik.setFieldValue("skills", [...formik.values.skills, ""]);
  };

  const removeSkill = (index) => {
    if (formik.values.skills.length === 1) return;
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-2">Add New Job – {cookies.name}</h2>

      <div className="d-flex justify-content-center">
        <form onSubmit={formik.handleSubmit} style={{ width: "600px" }}>

          
          <div >
            <label >Job Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.name}</div>
          </div>

          
          <div >
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.description}</div>
          </div>

          
          <div >
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.location}</div>
          </div>

          
          <div >
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              className="form-control"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.experience}</div>
          </div>

          
          <div >
            <label className="form-label">Skills</label>

            {formik.values.skills.map((skill, index) => (
              <div key={index} className="d-flex mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  name={`skills[${index}]`}
                  value={skill}
                  onChange={formik.handleChange}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeSkill(index)}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={addSkill}
            >
              + Add Skill
            </button>

            <div className="text-danger">{formik.errors.skills}</div>
          </div>

          
          <div >
            <label className="form-label">Salary</label>
            <input
              type="text"
              className="form-control"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.salary}</div>
          </div>

          
          <div >
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.address}</div>
          </div>

          
          <div >
            <label className="form-label">Last Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.date}</div>
          </div>

          
          <button type="submit" className="btn btn-primary me-3">
            Add Job
          </button>
          <Link className="btn btn-warning" to="/employer/jobs">
            Cancel
          </Link>

        </form>
      </div>
    </div>
  );
}

export default AddJob;