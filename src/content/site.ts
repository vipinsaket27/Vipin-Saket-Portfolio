// Edit your portfolio content here.
export const site = {
  name: "Vipin Saket",
  title: "Aspiring AI/ML Engineer",
  intro:
    "B.Tech CSE (AIML) student building hands-on machine learning projects in Python — from data cleaning and visualization to model building.",
  email: "vipin.saket56789@gmail.com",
  phone: "+91-8349828668",
  linkedin: "https://www.linkedin.com/in/vipin-saket-830b2b316/",
  github: "https://github.com/vipinsaket27", // TODO: replace with your GitHub URL
  // Put your resume at public/resume.pdf to enable the download button.
  resumePath: "./resume.pdf",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL"] },
  { group: "Data & ML", items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow (basics)"] },
  { group: "Visualization & BI", items: ["Matplotlib", "Seaborn", "Power BI", "Excel"] },
  { group: "Tools", items: ["Git", "GitHub", "Jupyter Notebook", "Google Colab"] },
  { group: "Foundations", items: ["Statistics", "Probability"] },
];

export const projects = [
  {
    title: "AI Resume ATS System",
    overview:
      "A computer vision project that detects faces in images or video and classifies facial expressions into emotion categories.",
    tech: ["Python", "OpenCV"],
    status: "In progress",
    link: "https://github.com/vipinsaket27/ai-resume-ats-project", // TODO: project repo/demo
  },
  {
    title: "Intelligent AI Attendance - Face & Voice",
    overview:
      "A regression project that learns from housing features to estimate property prices, covering data preparation and model training.",
    tech: ["Python", "Scikit-learn"],
    status: "In progress",
    link: "https://github.com/vipinsaket27/snapclass-vipinsaket-main",
  },
  {
    title: "Neural Style Transfer with AdaIN",
    overview:
      "An NLP text-classification project that converts email text into word-count features and classifies messages as spam or not spam.",
    tech: ["Python", "NLP", "CountVectorizer", "Naive Bayes"],
    status: "In progress",
    link: "https://github.com/vipinsaket27/ai-nst-project",
  },
];
