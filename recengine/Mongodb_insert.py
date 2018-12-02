import pymongo
import pandas as pd
df_industry=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\\naukri_com-job_sample.csv")
df_country_phone=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\globalareacodes.csv")
df_country_country_name=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\Country_code_country_name.csv",encoding='latin')
languages_df=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\languages.csv")
cities_states_us=pd.read_csv(r"C:\Users\menav\Documents\Python Scripts\MY_Projects\MY_Projects\BLOCKCHAIN\\us_cities_states_counties.csv")

merge_country_code=pd.merge(df_country_phone,df_country_country_name,on="country",how="inner")
merge_country_code=merge_country_code.dropna()
merge_country_code['country_phone_code']=merge_country_code['country_phone_code'].apply(lambda x:"+"+str(x))
languages=list(pd.unique(languages_df['name']))
languages_dict=[{"_id":ind,"skills":vl} for ind,vl in enumerate(languages) ]


dict_industries=list(pd.unique(df_industry['industry']))
dict_industries_dict=[{"_id":ind,"industry":vl} for ind,vl in enumerate(dict_industries) ]
                 
merge_country_code_list_dict=[{"_id":ind,"country":val[0],"code":val[1],"country_code":val[2]} for ind,val in enumerate(merge_country_code.values)]
states_us=[{"_id":ind,"city":val[0],"state_short":val[1],"state_full":val[2],"country":"US"} for ind,val in enumerate(cities_states_us.values)]


client = pymongo.MongoClient('35.196.1.182', 27017)
client.list_database_names()
db=client.blockedin.employers
result=db.insert_many(dict_industries_dict,ordered=False)


dict_industries=list(pd.unique(df_industry['industry']))
dict_industries_dict=[{"_id":valll[4],"agreed":True,'admins':[],"industry":valll[0],"employee_count":0,'owner_id':3,'name':valll[1],"org_id":valll[2],'location':[],'company_type': 1,"desc":"",'founded':"",'size':11, 'website':valll[3] ,'specialities': []} for valll in df_tt[['industry','company','org_id','website','index']][10:].values]

df_tt=df_industry[['industry','company']].drop_duplicates()
df_tt=df_tt.dropna()
df_tt['website']=df_tt['company'].apply(lambda x:"www."+x.replace(" ","").lower()+".com")
df_tt['org_id']=range(6,df_tt.shape[0]+6)
df_tt['index']=range(0,df_tt.shape[0])
for val1 in df_tt[['industry','company','org_id','website']][0:5].values:
    print(val1)