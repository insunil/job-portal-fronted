import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

 function EditJob() {
  const { id } = useParams();      
  const navigate = useNavigate();
  const [cookies] = useCookies(["employer_token", "name"]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      experience: "",
      skills: [],
      salary: "",
      address: "",
      date: "",
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      name: Yup.string().min(3).required(),
      description: Yup.string().min(10).required(),
      location: Yup.string().required(),
      experience: Yup.number().min(0).required(),
      skills: Yup.array().of(Yup.string().required()).min(1),
      salary: Yup.string().required(),
      address: Yup.string().required(),
      date: Yup.date().required(),
    }),
    onSubmit: (values) => {
      axios
        .patch(`http://api.insunil.ind.in/jobs/${id}`, values, {
          headers: {
            Authorization: `Bearer ${cookies.employer_token}`,
          },
        })
        .then(() => {
          alert("Job updated successfully");
          navigate("/employer/jobs");
        })
        .catch(err => {
          alert(err.response?.data?.message || "Update failed");
        });
    },
  });

  useEffect(() => {
    axios
      .get(`http://api.insunil.ind.in/jobs/${id}`)
      .then(res => {
        const job = res.data.job;

        formik.setValues({
          name: job.name,
          description: job.description,
          location: job.location,
          experience: job.experience,
          skills: job.skills || [],
          salary: job.salary,
          address: job.address,
          date: job.date?.split("T")[0], 
        });
      })
      .catch(() => {
        alert("Failed to load job data");
      });
  }, [id]);
  const addSkill = () => {
    formik.setFieldValue("skills", [...formik.values.skills, ""]);
  };

  const removeSkill = (index) => {
    if (formik.values.skills.length === 1) return;
    const updated = formik.values.skills.filter((_, i) => i !== index);
    formik.setFieldValue("skills", updated);
  };
  return (
    <div className="p-4 ms-5" style={{paddingLeft:'600px'}}>
      <h2>Edit Job – {cookies.name}</h2>
         
      <form onSubmit={formik.handleSubmit}>
        <dl className="row">

          <dt className="col-2">Name:</dt>
          <dd className="col-10">
            <input name="name" value={formik.values.name} onChange={formik.handleChange} />
            <div className="text-danger">{formik.errors.name}</div>
          </dd>

          <dt className="col-2">Description:</dt>
          <dd className="col-10">
            <input name="description" value={formik.values.description} onChange={formik.handleChange} />
            <div className="text-danger">{formik.errors.description}</div>
          </dd>

          <dt className="col-2">Location:</dt>
          <dd className="col-10">
            <input name="location" value={formik.values.location} onChange={formik.handleChange} />
            <div className="text-danger">{formik.errors.location}</div>
          </dd>

          <dt className="col-2">Experience:</dt>
          <dd className="col-10">
            <input type="number" name="experience" value={formik.values.experience} onChange={formik.handleChange} />
            <div className="text-danger">{formik.errors.experience}</div>
          </dd>

          <dt className="col-2">Skills:</dt>
          <dd className="col-10">
            {formik.values.skills.map((skill, i) => (
              <div key={i} className="d-flex mb-2">
                <input
                  name={`skills[${i}]`}
                  value={skill}
                  onChange={formik.handleChange}
                  className="me-2"
                />
                <button type="button" className="btn btn-danger" onClick={() => removeSkill(i)}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success btn-sm" onClick={addSkill}>
              + Add Skill
            </button>
          </dd>

          <dt className="col-2">Salary:</dt>
          <dd className="col-10">
            <input name="salary" value={formik.values.salary} onChange={formik.handleChange} />
          </dd>

          <dt className="col-2">Address:</dt>
          <dd className="col-10">
            <input name="address" value={formik.values.address} onChange={formik.handleChange} />
          </dd>

          <dt className="col-2">Last date:</dt>
          <dd className="col-10">
            <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} />
          </dd>

        </dl>

        <button type="submit" className="btn btn-primary">
          Update Job
        </button>
         <Link className="btn btn-warning" to="/employer/jobs">
                    Cancel
                  </Link>
      </form>
    </div>
  );
}

export default EditJob;