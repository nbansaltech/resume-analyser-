import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load("en_core_web_sm")

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.lower().strip()

def extract_keywords(text):
    doc = nlp(text)
    return [token.lemma_.lower() for token in doc if token.is_alpha and not token.is_stop]

def analyze_resume(resume_text, job_text):
    resume_text = clean_text(resume_text)
    job_text = clean_text(job_text)

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([resume_text, job_text])
    score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
    match_score = round(score * 100, 2)

    resume_kw = set(extract_keywords(resume_text))
    job_kw = set(extract_keywords(job_text))
    missing_keywords = list(job_kw - resume_kw)

    feedback = (
        f"Your resume matches the job description by {match_score}%. "
        f"Consider adding keywords like {', '.join(missing_keywords[:10])} "
        f"to improve your match."
    )

    return {
        "match_score": match_score,
        "missing_keywords": missing_keywords[:10],
        "feedback": feedback,
    }
