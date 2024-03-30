from elasticsearch import Elasticsearch
import csv

es = Elasticsearch(hosts=["http://127.0.0.1:9200"])

print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

with open("./data.csv", "r") as f:
    reader = csv.reader(f)

    for i, line in enumerate(reader):
        document = {
            "id": line[0],
            "language": line[1],
            "producer": line[2],
            "show": line[3],
            "event": line[4],
            "category": line[5],
            "ageRating": line[6],
            "season": line[7],
            "episode": line[8],
            "title": line[9],
            "intro": line[10],
            "featured": line[11],
            "thumbnail": line[12],
            "region": line[13],
            "poster": line[14],
            "weblink": line[15]
        }
        es.index(index="content-data", document=document)



# from elasticsearch import Elasticsearch
# import csv

# es = Elasticsearch(hosts=["http://127.0.0.1:9200"])

# print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

# with open("./data.csv", "r") as f:
#     reader = csv.DictReader(f)  # Use DictReader to read rows as dictionaries

#     for i, document in enumerate(reader):
#         # Assuming all columns from the CSV should be indexed
#         es.index(index="content", document=document)



# from elasticsearch import Elasticsearch
# import csv

# es = Elasticsearch(hosts=["http://127.0.0.1:9200"])

# print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

# with open("./data.csv", "r") as f:
#     reader = csv.reader(f)

#     for i, line in enumerate(reader):
#         document = {
#             "title": line[9]
#         }
#         es.index(index="pagal", document=document)