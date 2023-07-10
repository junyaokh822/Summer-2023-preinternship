const express = require("express");
const app = express();
const port = 4000;
const jobs = require("./jobs");
const { query } = require('./database');
require("dotenv").config();

// app.use((req, res, next) => {

//   res.on("finish", () => {
//     // the 'finish' event will be emitted when the response is handed over to the OS
//     console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
//   });
//   next();
// });
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.get("/", (req, res) => {
  res.send("Welcome to the Job App Tracker API!!!!");
});

// Get all the jobs
// app.get("/jobs", (req, res) => {
//   res.send(jobs);
// });
app.get("/jobs", async (req, res) => {
  try {
    const allJobs = await query("SELECT * FROM job_applications");

    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific job
// app.get("/jobs/:id", (req, res) => {
//   const jobId = parseInt(req.params.id, 10);
//   const job = jobs.find((j) => j.id === jobId);
//   if (job) {
//     res.send(job);
//   } else {
//     res.status(404).send({ message: "Job not found" });
//   }
// });
app.get("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const job = await query("SELECT * FROM job_applications WHERE id = $1", [jobId]);

    if (job.rows.length > 0) {
      res.status(200).json(job.rows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Create a new job
// app.post("/jobs", (req, res) => {
//   const newJob = {
//     ...req.body,
//     id: getNextIdFromCollection(jobs),
//   };
//   jobs.push(newJob);
//   console.log("newJob", newJob);
//   res.status(201).send(newJob);
// });

app.post("/jobs", async (req, res) => {
  const { company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status } = req.body;

  try {
    const newJob = await query(
      `INSERT INTO job_applications (company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status]
    );
      console.log(newJob);
    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a specific job
// app.patch("/jobs/:id", (req, res) => {
//   const jobId = parseInt(req.params.id, 10);
//   const jobUpdates = req.body;
//   const jobIndex = jobs.findIndex((job) => job.id === jobId);
//   if (jobIndex !== -1) {
//     const originalJob = jobs[jobIndex];
//     const updatedJob = {
//       ...originalJob,
//       ...jobUpdates,
//     };
//     jobs[jobIndex] = updatedJob;
//     res.send(updatedJob);
//   } else {
//     res.status(404).send({ message: "Job not found" });
//   }
// });

// app.patch("/jobs/:id", async (req, res) => {
//   const jobId = parseInt(req.params.id, 10);

//   const { company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status } = req.body;

//   try {
//     const updatedJob = await query(
//       "UPDATE job_applications SET company = $1, title = $2, minSalary = $3, maxSalary = $4, location = $5, postDate = $6, jobPostUrl = $7, applicationDate = $8, lastContactDate = $9, companyContact = $10, status = $11 WHERE id = $12 RETURNING *",
//       [company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status, jobId]
//     );

//     if (updatedJob.rows.length > 0) {
//       res.status(200).json(updatedJob.rows[0]);
//     } else {
//       res.status(404).send({ message: "Job not found" });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

app.patch("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  const fieldNames = [
    "company",
    "title",
    "minSalary",
    "maxSalary",
    "location",
    "postDate",
    "jobPostUrl",
    "applicationDate",
    "lastContactDate",
    "companyContact",
    "status",
    "jobId",
  ].filter((name) => req.body[name]);

  let updatedValues = fieldNames.map(name => req.body[name]);
  const setValuesSQL = fieldNames.map((name, i) => {
    return `${name} = $${i + 1}`
  }).join(', ');

  try {
    const updatedJob = await query(
      `UPDATE job_applications SET ${setValuesSQL} WHERE id = $${fieldNames.length+1} RETURNING *`,
      [...updatedValues, jobId]
    );

    if (updatedJob.rows.length > 0) {
      res.status(200).json(updatedJob.rows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete a specific job
// app.delete("/jobs/:id", (req, res) => {
//   const jobId = parseInt(req.params.id, 10);
//   const jobIndex = jobs.findIndex((job) => job.id === jobId);
//   if (jobIndex !== -1) {
//     jobs.splice(jobIndex, 1);
//     res.send({ message: "Job deleted successfully" });
//   } else {
//     res.status(404).send({ message: "Job not found" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


app.delete("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const deleteOp = await query("DELETE FROM job_applications WHERE id = $1", [jobId]);

    if (deleteOp.rowCount > 0) {
      res.status(200).send({ message: "Job deleted successfully" });
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});