import requests
from bs4 import BeautifulSoup
import json

def scrape_amc_problems():
    url = "https://amctrivial.com/?problems=2022_AMC_10A_Problems/Problem_1|2022_AMC_10A_Problems/Problem_2|2022_AMC_10A_Problems/Problem_3|2022_AMC_10A_Problems/Problem_4|2022_AMC_10A_Problems/Problem_5|2022_AMC_10A_Problems/Problem_6|2022_AMC_10A_Problems/Problem_7|2022_AMC_10A_Problems/Problem_8|2022_AMC_10A_Problems/Problem_9|2022_AMC_10A_Problems/Problem_10|2022_AMC_10A_Problems/Problem_11|2022_AMC_10A_Problems/Problem_12|2022_AMC_10A_Problems/Problem_13|2022_AMC_10A_Problems/Problem_14|2022_AMC_10A_Problems/Problem_15|2022_AMC_10A_Problems/Problem_16|2022_AMC_10A_Problems/Problem_17|2022_AMC_10A_Problems/Problem_18|2022_AMC_10A_Problems/Problem_19|2022_AMC_10A_Problems/Problem_20|2022_AMC_10A_Problems/Problem_21|2022_AMC_10A_Problems/Problem_22|2022_AMC_10A_Problems/Problem_23|2022_AMC_10A_Problems/Problem_24|2022_AMC_10A_Problems/Problem_25&testyear=2022&testname=AMC%2010A"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the problems section
        problems_section = soup.find('div', class_='problems-section')
        
        if problems_section:
            # Find all problem articles
            problem_articles = problems_section.find_all('div', class_='article-problems')
            
            problems = []
            for article in problem_articles:
                heading = article.find('h2', class_='problem-heading')
                content = article.find('p')
                
                if heading and content:
                    problems.append({
                        'heading': heading.get_text(strip=True),
                        'content': str(content)  # Keep HTML formatting
                    })
            
            # Save to JSON file
            with open('amc_problems.json', 'w', encoding='utf-8') as f:
                json.dump(problems, f, ensure_ascii=False, indent=2)
                
            print(f"Successfully scraped {len(problems)} problems")
            return problems
            
    except Exception as e:
        print(f"Error scraping problems: {e}")
        return None

if __name__ == "__main__":
    problems = scrape_amc_problems()
