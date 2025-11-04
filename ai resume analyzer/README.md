# 🧠 AI Resume Analyzer (Next.js + FastAPI + TailwindCSS)

Analyze how well a resume matches a job description using NLP.

## 🚀 Features
- Upload resume and job description (PDF/DOCX)
- Extract keywords using spaCy
- Compute similarity with TF-IDF
- Display match score and detailed feedback
- Deployable on Vercel (Python 3.10 runtime)

## 🛠️ Setup
```bash
npm install
pip install -r requirements.txt
python -m spacy download en_core_web_sm
npm run dev
