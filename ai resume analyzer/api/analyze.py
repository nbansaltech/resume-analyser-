from fastapi import FastAPI, File, UploadFile
from utils.analyzer import analyze_resume
import pdfplumber
import docx
import io

app = FastAPI()

def extract_text_from_file(uploaded_file: UploadFile):
    if uploaded_file.filename.endswith(".pdf"):
        with pdfplumber.open(io.BytesIO(uploaded_file.file.read())) as pdf:
            return " ".join(page.extract_text() or "" for page in pdf.pages)
    elif uploaded_file.filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(uploaded_file.file.read()))
        return " ".join(p.text for p in doc.paragraphs)
    else:
        return uploaded_file.file.read().decode("utf-8")

@app.post("/api/analyze")
async def analyze(resume: UploadFile = File(...), jobdesc: UploadFile = File(...)):
    resume_text = extract_text_from_file(resume)
    job_text = extract_text_from_file(jobdesc)
    result = analyze_resume(resume_text, job_text)
    return result
