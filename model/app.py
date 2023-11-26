from flask import Flask, render_template, request, jsonify
import pandas as pd 
from sklearn.feature_extraction.text import CountVectorizer
from neattext.functions import clean_text
from sklearn.metrics.pairwise import cosine_similarity
import os

app = Flask(__name__)




def load_data(data):
	df = pd.read_csv(data)
	return df

def vectorize_text_to_cosine_mat(data):
	count_vect = CountVectorizer()
	cv_mat = count_vect.fit_transform(data)
	cosine_sim_mat = cosine_similarity(cv_mat)
	return cosine_sim_mat

def get_recommendation(title,cosine_sim_mat,df,budget,time,level,num_of_rec=5):
    course_indices = pd.Series(df.index,index=df['course_title']).drop_duplicates()
    idx = course_indices[title]
    sim_scores =list(enumerate(cosine_sim_mat[idx]))
    
    sim_scores = sorted(sim_scores,key=lambda x: x[1],reverse=True)
    selected_course_indices = [i[0] for i in sim_scores[1:]]
    selected_course_scores = [i[1] for i in sim_scores[1:]]
    
    result_df = df.iloc[selected_course_indices].copy()
    result_df['similarity_score'] = selected_course_scores
    filtered_df = df[(df['price'] <= budget) & (df['duration_no'] <= time) & (df['level_course'] == level)]
    final_recommended_courses = filtered_df
    return final_recommended_courses.head(num_of_rec)

def search_term_if_not_found(term,df):
    result_df = pd.DataFrame()
    for i in term.split(" "):
        result_df = pd.concat([result_df, df[df['course_title'].str.contains(i)]], ignore_index=True)
    return result_df


@app.route('/assessment', methods=['POST'])
def assessment():
    data = request.get_json()
    search_term = data['data']['question1']
    assessment_data = data['data']
    coursetype = data['data']['courseType']
    if(coursetype == "free"):
        budget = 0
    else:
        budget = data['data']['budget']
    time = data['data']['hours']
    level = data['data']['experience']
    if(level == "beginner"):
        level = "Beginner"
    elif(level == "intermediate"):
        level = "Intermediate"
    else:
        level = "All Levels"
    search_term = search_term.lower()
    num_of_rec = 5
    search_term = clean_text(search_term, puncts=True, stopwords=True)
    result_df = search_term_if_not_found(search_term, df)
    result_df = result_df.sample(n=4)
    course_names = list(result_df['course_title'])
    recommended_courses = []
    for i, c in enumerate(course_names):
        d1 = dict()
        d1["name"] = "masterset" + str(i+1)
        results = get_recommendation(c,cosine_sim_mat,df,budget,time,level,num_of_rec)
        d1["total_price"] = sum(results["price"])
        d1["total_duration"] = sum(results["duration_no"])
        cour = []
        for index, row in results.iterrows():
            cour.append(dict(row))
        d1["courses"] = cour
        recommended_courses.append(d1)
    return jsonify({"result": recommended_courses}) 
    # print('whats ',results.to_json())

@app.route('/')
def get_users():
    print("Using jsonify")
    search_term = "i want to learn python"
    num_of_rec = 5
    budget = 4000
    time = 5
    level = "Beginner"
    search_term = clean_text(search_term, puncts=True, stopwords=True)
    result_df = search_term_if_not_found(search_term, df)
    result_df = result_df.sample(n=4)
    course_names = list(result_df['course_title'])
    recommended_courses = []
    for i, c in enumerate(course_names):
        d1 = dict()
        d1["name"] = "masterset" + str(i+1)
        results = get_recommendation(c,cosine_sim_mat,df,budget, time, level,num_of_rec)
        d1["total_price"] = sum(results["price"])
        d1["total_duration"] = sum(results["duration_no"])
        cour = []
        for index, row in results.iterrows():
            cour.append(dict(row))
        d1["courses"] = cour
        recommended_courses.append(d1)
        
    return jsonify({'result': recommended_courses})


df = load_data("out.csv")
df = df.head(10000)
df["duration_no"] = df['duration'].str.extract('(\d+)').astype(float)
df['course_title'] = df['title'].str.lower()
cosine_sim_mat = vectorize_text_to_cosine_mat(df['course_title'])


if __name__ == '__main__':
    app.run(host= '0.0.0.0',port=5000)