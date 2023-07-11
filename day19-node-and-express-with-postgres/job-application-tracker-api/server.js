const express = require("express");
const app = express();
const port = 4000;
const jobs = require("./jobs");
const { query } = require('./database');
require("dotenv").config();


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    
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