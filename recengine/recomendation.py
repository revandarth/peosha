import pandas as pd
import itertools
from  collections import Counter
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


jds_df=pd.read_csv(r'C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\\naukri_com-job_sample.csv')
jds_df['jobdescription']=jds_df['jobdescription'].astype(str)
jds_df['jobdescription']=jds_df['jobdescription'].apply(lambda x:x.lower())
users_df=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\\Employee_details.csv")
users_df=users_df.dropna()
users_df['jobs_viewed']=users_df['jobs_viewed'].apply(lambda x:x.lower().split(","))
def fn_combinations_sequence(skills_most):
    dict_skills=dict(skills_most)
    list_of_skill={}
    for i in range(1, len(dict_skills) + 1):  #  xrange will return the values 1,2,3,4 in this loop
      for val in list(itertools.combinations(dict_skills.keys(), i)):
            scores=0
            for ele in val:
                 scores=scores+dict_skills[ele]
            list_of_skill[val]=scores
    return sorted(list_of_skill.items(), key=lambda list_of_skill:list_of_skill[1],reverse=True)

def recommendations_inside(skills_most,df_rec):
  skills_most=fn_combinations_sequence(skills_most)
  if len(skills_most)>0:
     for ind in skills_most:
          all_words=[ val for val in ind[0]]
          reg_exp = ''.join(['(?=.*%s)' % (i) for i in all_words])
          jds_df['True_False']=jds_df.jobdescription.str.match(reg_exp, as_indexer=True)
          interm=jds_df[jds_df['True_False']==True]
          if interm.shape[0]>0:
              
              return interm.head(5)
 
def fn_recomendations_from_JD(val):
    dm_Dom=[x for (y,x) in sorted(zip(Similarity[val,:],jds_df_IT['uniq_id']),reverse=True)]
    Sorted1=sorted(Similarity[val,:],reverse=True)
    Sorted1=Sorted1[1:10]
    return (Sorted1,dm_Dom[1:10])     
        
    
def recommendation(df_rec):
    skills_most= dict(Counter(list(itertools.chain.from_iterable(df_rec['jobs_viewed']))))
    skills_most=sorted(skills_most.items(), key=lambda skills_most:skills_most[1],reverse=True)
    #columns_with_imp=[cl for cl in df_rec.columns if cl not in ["jobs_viewed","name","current_company","recently_visited","u_id"]]
    columns_with_imp=['job_location','package_Range']
    imp_var_df=[]
    for cl in columns_with_imp:
        xc=pd.DataFrame(pd.value_counts(df_rec[cl]))
        xc.columns=['Imp']
        xc['Var']=xc.index
        xc['Column']=cl
        xc.index=range(0,xc.shape[0])
        xc['Imp']=xc['Imp']/df_rec.shape[0]
        imp_var_df.append(xc)
    imp_var_df=pd.concat(imp_var_df)
    imp_var_df=imp_var_df.sort_values('Imp',ascending=False)
    imp_var_df['Var_plus_cat']=imp_var_df[['Var','Column']].apply(lambda x:(x[0],x[1]),axis=1)
    return list(recommendations_inside(skills_most,imp_var_df)['jobtitle'])
    

Recommendations_users={}
for user_id in pd.unique(users_df.u_id):
    df_rec=users_df[users_df['u_id']==user_id].sort_values('recently_visited')[0:3]
    Recommendations_users[user_id]=recommendation(df_rec[['jobs_viewed','job_location','package_Range']])
users_df_dict=users_df[['name','u_id']].drop_duplicates()
users_df_dict=dict(zip(users_df_dict['u_id'],users_df_dict['name']))
Recommendations_users=pd.DataFrame([Recommendations_users.keys(),Recommendations_users.values()]).transpose()
Recommendations_users.columns=['U_ID','Recommendations']
Recommendations_users['name']=Recommendations_users['U_ID'].replace(users_df_dict)

#for name in Recommendations_users['name']:
#    rc= Recommendations_users[Recommendations_users['name']==name]
#    print (name,",".join(list(rc['Recommendations'])[0]))
def fn_combinations_sequence_for_other_categories(variable_order):
    variable_order
    dict_skills=dict(skills_most)
    list_of_skill={}
    for i in range(1, len(dict_skills) + 1):  #  xrange will return the values 1,2,3,4 in this loop
      for val in list(itertools.combinations(dict_skills.keys(), i)):
            scores=0
            for ele in val:
                 scores=scores+dict_skills[ele]
            list_of_skill[val]=scores
    return sorted(list_of_skill.items(), key=lambda list_of_skill:list_of_skill[1],reverse=True)
    
"""Job recommendation with Cosine Similarity """
jds_df_IT=jds_df[jds_df['industry']=="IT-Software / Software Services"] 
jds_df_IT['Seqnence']=range(0,jds_df_IT.shape[0])
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(jds_df_IT['jobdescription'])
Similarity=cosine_similarity(tfidf_matrix.toarray(),tfidf_matrix.toarray())
jds_df_IT['Recommendations']=jds_df_IT['Seqnence'].apply(fn_recomendations_from_JD)

roles_uniqids_dict=dict(zip(jds_df_IT['uniq_id'],jds_df_IT['jobtitle']))
jds_df_IT['Job_Recommendations']=jds_df_IT['Recommendations'].apply(lambda x:[roles_uniqids_dict[val] for val in x[1]])

    
 