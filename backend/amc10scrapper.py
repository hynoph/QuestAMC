# # Display the JSON output
# # print(problems_json)
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# import os
# import shutil
# import json

# # Create directories
# if os.path.exists("./AMC/"):
#     shutil.rmtree("./AMC/")
# os.mkdir("./AMC/")
# os.mkdir("./AMC/10/")

# # Setup Chrome options
# options = Options()
# options.add_argument("--headless")
# options.add_experimental_option("excludeSwitches", ["enable-automation"])
# options.add_experimental_option('useAutomationExtension', False)

# # Initialize browser
# browser = webdriver.Chrome(options=options)

# # Dictionary to store all problems
# all_problems = {}

# for year in range(2002, 2025):
#     year_dict = {}
#     for exam in 'AB':
#         exam_dict = {}
#         for problem in range(1, 26):
#             url = f"https://artofproblemsolving.com/wiki/index.php/{year}_AMC_10{exam}_Problems/Problem_{problem}"
#             browser.get(url)
            
#             try:
#                 # Find the main content div
#                 div = browser.find_element(By.CLASS_NAME, "mw-parser-output")
                
#                 # Find all p tags
#                 p_tags = div.find_elements(By.TAG_NAME, "p")
                
#                 # We typically want the first two p tags after the first h2
#                 # First, find the index of the first h2
#                 elements = div.find_elements(By.XPATH, ".//*")
#                 h2_index = next(i for i, elem in enumerate(elements) if elem.tag_name == "h2")
                
#                 # Get the LaTeX content from the two p tags after h2
#                 problem_text = []
#                 p_count = 0
#                 for element in elements[h2_index:]:
#                     if element.tag_name == "p":
#                         latex_content = element.get_attribute('innerHTML')
#                         problem_text.append(latex_content)
#                         p_count += 1
#                         if p_count == 2:  # We have both problem and solution
#                             break
                
#                 # Store the content
#                 exam_dict[problem] = {
#                     "problem": problem_text[0] if len(problem_text) > 0 else "",
#                     "choices": problem_text[1] if len(problem_text) > 1 else "",
#                     "solution": problem_text[2] if len(problem_text) > 2 else "",
#                 }
                
#                 print(f"Successfully scraped Year {year} AMC 10{exam} Problem {problem}")
                
#             except Exception as e:
#                 print(f"ERROR in Year {year} AMC 10{exam} Problem {problem}:", str(e))
#                 exam_dict[problem] = {
#                     "problem": "",
#                     "solution": "",
#                     "error": str(e)
#                 }
#                 continue
        
#         year_dict[exam] = exam_dict
#     all_problems[year] = year_dict

# # Save the results
# with open('./AMC/10/amc10problems.json', 'w', encoding='utf-8') as f:
#     json.dump(all_problems, f, ensure_ascii=False, indent=2)

# browser.close()

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import os
import shutil
import json

# Create directories
if os.path.exists("./AMC/"):
    shutil.rmtree("./AMC/")
os.mkdir("./AMC/")
os.mkdir("./AMC/10/")

# Setup Chrome options
options = Options()
options.add_argument("--headless")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)

# Initialize browser
browser = webdriver.Chrome(options=options)

# Dictionary to store all problems
all_problems = {}

for year in range(2002, 2025):
    year_dict = {}
    for exam in 'AB':
        exam_dict = {}
        for problem in range(1, 26):
            url = f"https://artofproblemsolving.com/wiki/index.php/{year}_AMC_10{exam}_Problems/Problem_{problem}"
            browser.get(url)
            
            try:
                # Find the main content div
                div = browser.find_element(By.CLASS_NAME, "mw-parser-output")
                
                # Find all elements to iterate through
                elements = div.find_elements(By.XPATH, ".//*")
                
                # Find the index of the first h2
                h2_index = next(i for i, elem in enumerate(elements) if elem.tag_name == "h2")
                
                # Collect text between tags after h2 and before a table or the next h2
                problem_content = []
                for element in elements[h2_index+1:]:
                    if element.tag_name == "table":
                        # or element.tag_name == "h2"
                        break
                    
                    if element.tag_name in ["p", "h3"]:  # Collect <p> and <h3> which might provide more statements
                        latex_content = element.get_attribute('innerHTML')
                        problem_content.append(latex_content.strip())

                # Store the content
                modified_content = "\n".join(problem_content)
                exam_dict[problem] = {
                    "problem_statement": modified_content if len(problem_content) > 0 else "",
                }
                
                print(f"Successfully scraped Year {year} AMC 10{exam} Problem {problem}")
                
            except Exception as e:
                print(f"ERROR in Year {year} AMC 10{exam} Problem {problem}:", str(e))
                exam_dict[problem] = {
                    "problem_statement": "",
                    "error": str(e)
                }
                continue
        
        year_dict[exam] = exam_dict
    all_problems[year] = year_dict

# Save the results
with open('./AMC/10/amc10problems.json', 'w', encoding='utf-8') as f:
    json.dump(all_problems, f, ensure_ascii=False, indent=2)

browser.close()