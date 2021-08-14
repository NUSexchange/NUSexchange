from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
from .TestConstants import NEW_STOPWORDS
from .similarity_finder import cosine_sim, stem_tokens, normalize
import sys

def run(text1, text2, new_stop_words, old_stopwords_set):
    my_stop_words = old_stopwords_set.union(new_stop_words)
    normalised_stop_words = normalize(" ".join([i for i in my_stop_words]))
    vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words=normalised_stop_words)
    return cosine_sim(text1, text2, vectorizer)

def wrapper(text1, text2):
    return run(text1, text2, NEW_STOPWORDS, ENGLISH_STOP_WORDS)