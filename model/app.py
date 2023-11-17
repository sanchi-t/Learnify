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

def get_recommendation(title,cosine_sim_mat,df,num_of_rec=10):
	course_indices = pd.Series(df.index,index=df['course_title']).drop_duplicates()
	idx = course_indices[title]

	sim_scores =list(enumerate(cosine_sim_mat[idx]))
	sim_scores = sorted(sim_scores,key=lambda x: x[1],reverse=True)
	selected_course_indices = [i[0] for i in sim_scores[1:]]
	selected_course_scores = [i[1] for i in sim_scores[1:]]

	result_df = df.iloc[selected_course_indices]
	result_df['similarity_score'] = selected_course_scores
	final_recommended_courses = result_df[['course_title']]
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
    search_term = search_term.lower()
    num_of_rec = 5
    try:
        
        results = get_recommendation(search_term, cosine_sim_mat, df, num_of_rec)
        print('results ',results,type(results))
        # return results         
        return jsonify({'message': 'Assessment data processed successfully'})
        
    except Exception as e:
        search_term = clean_text(search_term, puncts=True, stopwords=True)
        result_df = search_term_if_not_found(search_term, df)
        result_df = result_df.sample(n=4)
        recommendations_list = []
        for c in result_df['course_title']:
            results = get_recommendation(c, cosine_sim_mat, df, num_of_rec)
            print('wow',results,'end')
            recommendations_list.append(str(results))
        print('recom list  ', results, type(recommendations_list))

        return jsonify({'result': recommendations_list}) 
        # print('whats ',results.to_json())

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        search_term = request.form['search_term'].lower()
        num_of_rec = 5

        try:
            results = get_recommendation(search_term, cosine_sim_mat, df, num_of_rec)
            return render_template('index.html', search_term=search_term, results=results.to_html())
        except:
            search_term = clean_text(search_term, puncts=True, stopwords=True)
            result_df = search_term_if_not_found(search_term, df)
            result_df = result_df.sample(n=4)
            recommendations_list = []
            for c in result_df['course_title']:
                results = get_recommendation(c, cosine_sim_mat, df, num_of_rec)
                recommendations_list.append(results)

            return render_template('index.html', search_term=search_term, recommendations_list=recommendations_list)

    return render_template('index.html')

if __name__ == '__main__':
    df = load_data('udemy_course_data.csv')
    df['course_title'] = df['title'].str.lower()
    cosine_sim_mat = vectorize_text_to_cosine_mat(df['course_title'])
    app.run(debug=True)
