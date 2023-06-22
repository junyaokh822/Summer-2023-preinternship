const jobs = [
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4E0BAQEiY07GSLZtFQ/company-logo_100_100/0/1539023176649?e=1694649600&v=beta&t=-vb-4kpBSDXQ36ou1Rk95RbdCiQO4kYGzGEFsnqhRg4",
      alt: "Aha! company logo",
    },
    company: "Aha!",
    title: "Ruby on Rails Engineer",
    salary: "$100k/yr - $160k/yr",
    location: "Chicago, IL (Remote)",
    postDate: "1 week ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQGiEbGtjE1o_w/company-logo_100_100/0/1523389063738?e=1694649600&v=beta&t=iWaF1nBxZfqNbg5mnkjkNWIbSAROTrqQrvpxDTEVUBk",
      alt: "Cal State Long Beach Logo",
    },
    company: "California State University, Long Beach",
    title: "Junior Software Developer",
    salary: "$3,713/m - $7,149/m",
    location: "Long Beach, CA (onsite)",
    postDate: "5 days ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQFSVDtroiTPVg/company-logo_100_100/0/1662729127883?e=1694649600&v=beta&t=z8CL4Gnp_srDR0UYgOE7nwIQKp10vghZDjQwm2CGGBE",
      alt: "Jobot company logo",
    },
    company: "Jobot",
    title: "Remote Wordpress Developer",
    salary: "$50/hr - $75/hr",
    location: "Malibu, CA (Hybrid)",
    postDate: "1 week ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQHbQYFSQsK__A/company-logo_100_100/0/1630511737707?e=1694649600&v=beta&t=Fa--go1eHlnSUYJLWyR07kb7Mfb5yp4upQyQUyUcBKQ",
      alt: "Braintrust Company Logo",
    },
    company: "Braintrust",
    title: "Software Engineer - Freelance (REMOTE)",
    salary: "$50/yr - $90/yr",
    location: "New York, NY (Remote)",
    postDate: "1 day ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4D0BAQEq6OEw509HRQ/company-logo_100_100/0/1519952238666?e=1694649600&v=beta&t=Bv3329fHJDl0SMfrnUZ4stRoZnLrb0JfYI6u1hQbkZU",
      alt: "Underdog Company Logo",
    },
    company: "Underdog.io",
    title: "Frontend Engineer - Remote",
    salary: "$88k/yr - $192k/yr",
    location: "New York, United States (Remote)",
    postDate: "2 days ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4E0BAQEiY07GSLZtFQ/company-logo_100_100/0/1539023176649?e=1694649600&v=beta&t=-vb-4kpBSDXQ36ou1Rk95RbdCiQO4kYGzGEFsnqhRg4",
      alt: "Aha! Company Logo",
    },
    company: "Aha!",
    title: "Lead Ruby on Rails Engineer",
    salary: "$120k/yr - $180k/yr",
    location: "Wichita, KS (Remote)",
    postDate: "6 days ago",
  },
];


console.log(document);
console.log(document.body);
console.dir(document.body);

console.log(document.getElementById('jobs').id);
console.log(document.getElementById('jobs').textContent);
console.log(document.querySelector('#jobs'));

const firstJob = document.getElementsByClassName("j-desc")[0];
// we could also do document.querySelector(".j-desc") to get the same element as by default it will retrieve the first match to the CSS selector
console.log(firstJob);
console.log(firstJob.parentElement) // section#jobs
console.log(firstJob.children) // HTMLCollection(2) [img.j-desc__company-image, div.j-desc__details]
const secondJob = firstJob.nextElementSibling;
console.log(secondJob) // <div class="j-desc">...</div>
console.log(firstJob === secondJob.previousElementSibling)

console.log(firstJob.lastElementChild.textContent);
console.log(secondJob.lastElementChild.textContent);

console.log(firstJob.querySelector(".j-desc__job-title").textContent)
console.log(secondJob.querySelector(".j-desc__job-title").textContent)

document.querySelectorAll('.j-desc').forEach(jobDiv => {
  const jobTitle = jobDiv.querySelector('.j-desc__job-title').textContent;
  console.log(jobTitle);
});

const firstJobImage = firstJob.querySelector(".j-desc__company-image");
console.log(firstJobImage.getAttribute("alt")); // logs: "Patterned Learning AI"

firstJobImage.setAttribute("alt", "Patterned Learning AI - Empowering with AI");
console.log(firstJobImage.getAttribute("alt")); // logs: "Patterned Learning AI - Empowering with AI"`

const firstJobTitle = firstJob.querySelector(".j-desc__job-title");
console.log(firstJobTitle.textContent); // logs: "Junior Front-End Developer"

firstJobTitle.textContent = "Junior Front-End Developer (React)";
console.log(firstJobTitle.textContent); // logs: "Junior Front-End Developer (React)"


// firstJobTitle.style.color = 'blue';
// firstJobTitle.style.textAlign = 'center';
firstJobTitle.styleContent = "Front-end Developer";
console.log(firstJobTitle.classList);

// function createNewJob() {
//   // Create new job description div
//   const jobDiv = document.createElement('div');
//   jobDiv.className = 'j-desc'; //class variable is taken, use something other than class

//   // Create job details div
//   const jobDetails = document.createElement('div');
//   jobDetails.className = 'j-desc__details';

//   // Create job title
//   const jobTitle = document.createElement('h2')
//   jobTitle.className = 'j-desc__job-title';
//   jobTitle.textContent = 'Newly Added Job Title';  

//   // Append newJobTitle to newJobDetails
//   jobDetails.appendChild(jobTitle);

//   // Append newJobDetails to newJob
//   jobDiv.appendChild(jobDetails);
  
//   // Append jobDiv to the jobs section
//   document.querySelector('section#jobs').appendChild(jobDiv);
// }

// createNewJob();

function createNewJob() {
  const jobDiv = document.createElement('div');
  jobDiv.className = 'j-desc';
  jobDiv.innerHTML = `
  <img
    class="j-desc__company-image"
    
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      
    </h2>
    <p class="j-desc__company"></p>
    <ul class="j-desc__metadata">
      <li class="j-desc__location></li>
      <li class="j-desc__salary></li>
      <li class="j-desc__posting_date></li>
    </ul>
  </div>
  `;

  const{ imgae: { src, alt }, company,title, salary, location, postingDate } = job;
  console.log(src, alt, company, title, salary, location, postingDate);

  const img = document.querySelector(".j-desc__company-image");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  jobDiv.querySelector(".j-desc__title").textContent = title; 
  jobDiv.querySelector(".j-desc__company").textContent = company;
  jobDiv.querySelector(".j-desc__location").textContent = location;
  jobDiv.querySelector(".j-desc__salary").textContent = salary;
  jobDiv.querySelector(".j-desc__posting_date").textContent = postingDate;

  document.querySelector('section#jobs').append(jobDiv);





}

createNewJob(jobs[3]);
createNewJob(jobs[4]);

for (let i = 0; i < jobTitles.length; i++) {
  jobTitles[i].onclick = function() {
    alert("You clicked on " + this.textContent);
  };
}
