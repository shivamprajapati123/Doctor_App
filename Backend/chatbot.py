# # import os
# # from dotenv import load_dotenv
# # from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# # from langchain.prompts import ChatPromptTemplate
# # from langchain.chains import ConversationalRetrievalChain
# # from langchain.text_splitter import RecursiveCharacterTextSplitter
# # from langchain.vectorstores import FAISS
# # from langchain.docstore.document import Document

# # # Load API key
# # load_dotenv()

# # # --- Step 1: Load model ---
# # llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

# # # --- Step 2: Load documents (RAG knowledge base) ---
# # def load_documents():
# #     docs = []
# #     data_path = "data/medical_knowledge.txt"
# #     if os.path.exists(data_path):
# #         with open(data_path, "r", encoding="utf-8") as f:
# #             text = f.read()
# #         splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
# #         chunks = splitter.split_text(text)
# #         docs = [Document(page_content=chunk) for chunk in chunks]
# #     return docs

# # documents = load_documents()

# # # --- Step 3: Create Vector Store (FAISS for RAG) ---
# # if documents:
# #     embeddings = OpenAIEmbeddings()
# #     vectorstore = FAISS.from_documents(documents, embeddings)
# #     retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
# # else:
# #     retriever = None

# # # --- Step 4: Prompt Engineering ---
# # prompt_template = """
# # You are DoctorGPT, an AI-powered medical assistant.
# # You should:
# # - Provide helpful, accurate, and empathetic explanations.
# # - Use retrieved context when available.
# # - Always remind the patient to consult a licensed doctor before taking medical decisions.

# # Context from knowledge base:
# # {context}

# # Patient Question: {question}

# # Answer as DoctorGPT:
# # """

# # prompt = ChatPromptTemplate.from_template(prompt_template)

# # # --- Step 5: Chain Setup (with or without RAG) ---
# # if retriever:
# #     qa_chain = ConversationalRetrievalChain.from_llm(
# #         llm=llm,
# #         retriever=retriever,
# #         return_source_documents=True,
# #         verbose=False
# #     )
# # else:
# #     qa_chain = None

# # # --- Step 6: Chat Function ---
# # def ask_doctor(question: str, chat_history=[]):
# #     if qa_chain:  # Use RAG if available
# #         result = qa_chain.invoke({"question": question, "chat_history": chat_history})
# #         answer = result["answer"]
# #         sources = result["source_documents"]
# #         if sources:
# #             answer += "\n\n📖 Sources consulted: " + ", ".join(
# #                 [s.metadata.get("source", "local_doc") for s in sources]
# #             )
# #     else:  # Pure LLM
# #         final_prompt = prompt.format_messages(context="(no extra context)", question=question)
# #         response = llm.invoke(final_prompt)
# #         answer = response.content
# #     return answer

# # # --- Step 7: Run Interactive Chat ---
# # if _name_ == "_main_":
# #     print("🩺 DoctorGPT Assistant (type 'quit' to exit)\n")
# #     history = []
# #     while True:
# #         user_query = input("Patient: ")
# #         if user_query.lower() in ["quit", "exit"]:
# #             print("DoctorGPT: Take care! Goodbye 👋")
# #             break
# #         reply = ask_doctor(user_query, history)
# #         history.append((user_query, reply))
# #         print(f"DoctorGPT: {reply}\n")



# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import os
# from dotenv import load_dotenv
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import ConversationalRetrievalChain
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.vectorstores import FAISS  # UPDATED IMPORT
# from langchain.docstore.document import Document

# # Load API key from .env
# load_dotenv()

# # Step 1: Load the model
# llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

# # Step 2: Load documents (RAG knowledge base)
# def load_documents():
#     docs = []
#     data_path = "data/medical_knowledge.txt"
#     if os.path.exists(data_path):
#         with open(data_path, "r", encoding="utf-8") as f:
#             text = f.read()
#         splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
#         chunks = splitter.split_text(text)
#         docs = [Document(page_content=chunk) for chunk in chunks]
#     return docs

# documents = load_documents()

# # Step 3: Create Vector Store (FAISS for RAG)
# if documents:
#     embeddings = OpenAIEmbeddings()
#     vectorstore = FAISS.from_documents(documents, embeddings)
#     retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
# else:
#     retriever = None

# # Step 4: Prompt Engineering
# prompt_template = """
# You are DoctorGPT, an AI-powered medical assistant.
# You should:
# - Provide helpful, accurate, and empathetic explanations.
# - Use retrieved context when available.
# - Always remind the patient to consult a licensed doctor before taking medical decisions.

# Context from knowledge base:
# {context}

# Patient Question: {question}

# Answer as DoctorGPT:
# """

# prompt = ChatPromptTemplate.from_template(prompt_template)

# # Step 5: Chain Setup (with or without RAG)
# if retriever:
#     qa_chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         retriever=retriever,
#         return_source_documents=True,
#         verbose=False
#     )
# else:
#     qa_chain = None

# # Step 6: Chat Function
# def ask_doctor(question: str, chat_history=[]):
#     if qa_chain:  # Use RAG if available
#         result = qa_chain.invoke({"question": question, "chat_history": chat_history})
#         answer = result["answer"]
#         sources = result["source_documents"]
#         if sources:
#             answer += "\n\n📖 Sources consulted: " + ", ".join(
#                 [s.metadata.get("source", "local_doc") for s in sources]
#             )
#     else:  # Pure LLM
#         final_prompt = prompt.format_messages(context="(no extra context)", question=question)
#         response = llm.invoke(final_prompt)
#         answer = response.content
#     return answer

# # Step 7: Flask API
# app = Flask(__name__)
# CORS(app)

# @app.route('/ask_doctor', methods=['POST'])
# def ask_doctor_api():
#     data = request.get_json()
#     question = data.get('question', '')
#     answer = ask_doctor(question)
#     return jsonify({'response': answer})

# if __name__ == '__main__':
#     app.run(port=4000)



# import os
# from dotenv import load_dotenv
# from langchain_openai import ChatOpenAI
# from langchain.prompts import ChatPromptTemplate

# # Load API key from .env
# load_dotenv()

# # Initialize model (using GPT-4o-mini for low cost and speed)
# llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

# # Prompt template for doctor assistant
# template = """
# You are DoctorGPT, a helpful and knowledgeable medical assistant.
# You can explain symptoms, possible conditions, medications, and lifestyle advice.
# ⚠ Important: Always remind users to consult a licensed doctor for medical decisions.

# Patient Question: {question}
# """

# prompt = ChatPromptTemplate.from_template(template)

# def ask_doctor(question: str):
#     final_prompt = prompt.format_messages(question=question)
#     response = llm.invoke(final_prompt)
#     return response.content

# if __name__ == "__main__":
#     print("🩺 DoctorGPT Assistant (type 'quit' to exit)\n")
#     while True:
#         user_query = input("You: ")
#         if user_query.lower() in ["quit", "exit"]:
#             print("DoctorGPT: Take care! Goodbye 👋")
#             break
#         answer = ask_doctor(user_query)
#         print(f"DoctorGPT: {answer}\n")





from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

load_dotenv()

# Initialize model & prompt
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
template = """
You are DoctorGPT, a helpful and knowledgeable medical assistant.
You can explain symptoms, possible conditions, medications, and lifestyle advice.
⚠ Important: Always remind users to consult a licensed doctor for medical decisions.

Patient Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

def ask_doctor(question: str):
    final_prompt = prompt.format_messages(question=question)
    response = llm.invoke(final_prompt)
    return response.content

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend calls

@app.route('/ask_doctor', methods=['POST'])
def ask_doctor_api():
    data = request.get_json()
    question = data.get('question', '')
    answer = ask_doctor(question)
    return jsonify({'response': answer})

if __name__ == '__main__':
    app.run(port=4000)
