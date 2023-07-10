const express = require("express");
const app = express();
const port = 4000;
// const axios = require('axios');
// require('dotenv').config();

// app.get('/recipes', async (req, res) => {
//   try {
//     const apiKey = process.env.SPOONACULAR_API_KEY;
//     const url = `https://api.spoonacular.com/recipes/complexSearch`;

//     // Pass parameters from the Express request to the Spoonacular API
//     const { data } = await axios.get(url, {
//       params: {
//         ...req.query,
//         apiKey: apiKey
//       }
//     });

    // Send the response from the Spoonacular API back to the client
//     res.json(data);
//   } catch (error) {
//     res.status(500).send('An error occurred');
//   }
// });

const jobs = [
  {
    id: 1,
    image: {
      src: "https://media.licdn.com/dms/image/C4E0BAQEiY07GSLZtFQ/company-logo_100_100/0/1539023176649?e=1694649600&v=beta&t=-vb-4kpBSDXQ36ou1Rk95RbdCiQO4kYGzGEFsnqhRg4",
      alt: "Aha! company logo",
    },
    company: "Aha!",
    title: "Ruby on Rails Engineer",
    minSalary: 100000,
    maxSalary: 160000,
    location: "Philadelphia, PA (Remote)",
    postDate: "2023-06-17",
    jobPostUrl: "https://www.linkedin.com/jobs/view/3638618757",
    applicationDate: null,
    lastContactDate: null,
    companyContact: null,
    status: 1,
  },
  {
    id: 2,
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQFSVDtroiTPVg/company-logo_100_100/0/1662729127883?e=1694649600&v=beta&t=z8CL4Gnp_srDR0UYgOE7nwIQKp10vghZDjQwm2CGGBE",
      alt: "Jobot company logo",
    },
    company: "Jobot",
    title: "Remote Front End Developer",
    minSalary: 120000,
    maxSalary: 200000,
    location: "Los Angeles, CA (Hybrid)",
    postDate: "2023-06-24",
    jobPostUrl: "https://www.linkedin.com/jobs/view/3643460386",
    applicationDate: null,
    lastContactDate: null,
    companyContact: null,
    status: 1,
  },
  {
    id: 3,
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQHbQYFSQsK__A/company-logo_100_100/0/1630511737707?e=1694649600&v=beta&t=Fa--go1eHlnSUYJLWyR07kb7Mfb5yp4upQyQUyUcBKQ",
      alt: "Braintrust Company Logo",
    },
    company: "Braintrust",
    title: "Software Engineer - Freelance (REMOTE)",
    minSalary: 50000,
    maxSalary: 90000,
    location: "New York, NY (Remote)",
    postDate: "2023-06-20",
    jobPostUrl: "https://www.linkedin.com/jobs/view/3641063402",
    applicationDate: null,
    lastContactDate: null,
    companyContact: null,
    status: 2,
  },
  {
    id: 4,
    image: {
      src: "https://media.licdn.com/dms/image/C4D0BAQEq6OEw509HRQ/company-logo_100_100/0/1519952238666?e=1694649600&v=beta&t=Bv3329fHJDl0SMfrnUZ4stRoZnLrb0JfYI6u1hQbkZU",
      alt: "Underdog Company Logo",
    },
    company: "Underdog.io",
    title: "Frontend Engineer",
    minSalary: 88000,
    maxSalary: 192000,
    location: "New York, United States (On site)",
    postDate: "2023-06-19",
    jobPostUrl: "https://www.linkedin.com/jobs/view/3639725859",
    applicationDate: null,
    lastContactDate: null,
    companyContact: null,
    status: 2,
  },
];

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
  if(collection.length === 0) return 1; 
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.get("/", (req, res) => {
  res.send("Welcome to the Job Application Tracker API!");
});

// List all jobs
app.get("/jobs", (req, res) => {
  res.send(jobs);
});

// Get a specific job
app.get("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find((job) => job.id === jobId);
  if (job) {
    res.send(job);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});

// Create a new job
app.post("/jobs", (req, res) => {
  const newJob = req.body;
  jobs.push(newJob);
  res.status(201).send(newJob);
});

// Update a specific job
app.patch("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobUpdates = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  const updatedJob = { ...jobs[jobIndex], ...jobUpdates };
  if (jobIndex !== -1) {
    jobs[jobIndex] = updatedJob;
    res.send(updatedJob);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});

// Delete a specific job
app.delete("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex !== -1) {
    jobs.splice(jobIndex, 1);
    res.send({ message: "Job deleted successfully" });
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

