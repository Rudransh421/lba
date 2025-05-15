# Resume-Enhancer

**Enhance your resume using AI-driven insights to align with job descriptions and improve your chances of landing interviews.**

## 📌 Overview

Resume-Enhancer is a tool designed to optimize your resume by analyzing it against specific job descriptions. Leveraging AI, it provides suggestions to highlight relevant skills, experiences, and certifications, ensuring your resume stands out to potential employers.

## 🗂️ Project Structure

The repository is organized into three main directories:

- **`backend/`**: Contains the server-side logic, handling API requests, and integrating AI models for resume analysis.
- **`frontend/`**: Houses the client-side application, providing an intuitive interface for users to upload resumes and job descriptions.
- **`model/`**: Contains a sophisticated OCR and NLP pipeline that analyzes the resume and feeds the analysis report, along with the complete resume, to the LLM.

## 🚀 Features

- **AI-Powered Analysis**: Utilizes advanced language models to assess and enhance resumes.
- **Job Description Matching**: Aligns your resume content with specific job requirements.
- **User-Friendly Interface**: Interactive frontend for easy uploads and instant feedback.
- **Modular Design**: Separation of concerns with distinct backend, frontend, and model components.

## 🛠️ Installation & Setup

**Prerequisites**:

- [Node.js](https://nodejs.org/)
- [Python 3.x](https://www.python.org/)
- [Git](https://git-scm.com/)
- [Tesseract OCR](https://tesseract-ocr.github.io/tessdoc/Installation.html)
- [Gemini API](https://ai.google.dev/gemini-api/docs/quickstart) ([Introduction | tessdoc - Tesseract OCR - GitHub Pages](https://tesseract-ocr.github.io/tessdoc/Installation.html?utm_source=chatgpt.com), [Gemini API quickstart | Google AI for Developers](https://ai.google.dev/gemini-api/docs/quickstart?utm_source=chatgpt.com))

**Steps**:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SriomDash/Resume-Enhancer.git
   cd Resume-Enhancer
   ```




2. **Set Up Backend**:

   ```bash
   cd ../Backend
   npm install
   npm run dev
   ```



3. **Set Up Model**:

   ```bash
   cd ../model
   python -m venv myenv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```



4. **Set Up Frontend**:

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```



   The frontend will run on `http://localhost:5173`.

5. **Configure Environment Variables**:

   In each of the `backend/`, `model/`, and `frontend/` directories, create a `.env` file and add the necessary environment variables. For example:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   INPUT_FILE=your_input_file_path
   ```



   Replace `your_gemini_api_key_here` with your actual Gemini API key.

## 📄 Usage

1. Upload your current resume in PDF or DOCX format.
2. Paste the job description you're targeting.
3. Receive tailored suggestions to optimize your resume content.
4. Download the enhanced resume for your applications.

## 👥 Team Members

- **Rudransh Dash** – Backend Developer  
  GitHub: [Rudransh421](https://github.com/Rudransh421)  
  LinkedIn: [rudransh-dash-96b9b6259](https://www.linkedin.com/in/rudransh-dash-96b9b6259/)
  
- **Sriom Dash** – ML Developer  
  GitHub: [SriomDash](https://github.com/SriomDash)  
  LinkedIn: [contact-sriom-dash](https://www.linkedin.com/in/contact-sriom-dash)

- **Sudip Dash** – Frontend Developer  
  GitHub: [sudip-dash](https://github.com/sudip-dash)  
  LinkedIn: [sudip-dash-3b4419259](https://www.linkedin.com/in/sudip-dash-3b4419259/)

- **Asutosh Sadangi** – Data Manager  
  LinkedIn: [ashutosh-sadangi-0199752a5](https://www.linkedin.com/in/ashutosh-sadangi-0199752a5/)

---

## 🎉 Feedback

If you find this tool helpful, we'd love to hear your feedback! Feel free to share your reviews and suggestions with us.
