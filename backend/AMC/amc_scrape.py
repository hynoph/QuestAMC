import requests
from bs4 import BeautifulSoup
import json
import re
import os
import time
from urllib.parse import urljoin, urlparse
import base64
from io import BytesIO

class AMCScraper:
    def __init__(self, base_url="https://artofproblemsolving.com/wiki/index.php"):
        self.base_url = base_url
        self.session = requests.Session()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        
    def get_soup(self, url):
        """Get BeautifulSoup object from URL with appropriate error handling and rate limiting"""
        try:
            response = self.session.get(url, headers=self.headers)
            response.raise_for_status()
            time.sleep(1)  # Rate limiting to be polite to the server
            return BeautifulSoup(response.text, 'html.parser')
        except requests.exceptions.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def download_image(self, img_url):
        """Download image and convert to base64 encoding"""
        if not img_url.startswith(('http:', 'https:')):
            img_url = urljoin(self.base_url, img_url)
        
        try:
            response = self.session.get(img_url, headers=self.headers)
            response.raise_for_status()
            image_data = response.content
            image_type = response.headers.get('Content-Type', 'image/png')
            
            # Convert to base64
            encoded = base64.b64encode(image_data).decode('utf-8')
            return f"data:{image_type};base64,{encoded}"
        except Exception as e:
            print(f"Error downloading image {img_url}: {e}")
            return None

    def get_amc_problems(self, year, version):
        """Get all problems for a specific AMC test"""
        test_name = f"{year} AMC 10{version}"
        url = f"{self.base_url}/{test_name}"
        
        main_soup = self.get_soup(url)
        if not main_soup:
            print(f"Failed to retrieve main page for {test_name}")
            return None
        
        # Find all problem links
        problem_links = []
        for link in main_soup.find_all('a'):
            href = link.get('href', '')
            text = link.get_text().strip()
            if f"Problem" in text and f"{year}_AMC" in href:
                problem_links.append(urljoin(self.base_url, href))
        
        if not problem_links:
            # Try an alternative approach to find problem links
            problem_section = main_soup.find('span', id=lambda x: x and 'Problems' in x)
            if problem_section:
                problem_list = problem_section.find_next('ol')
                if problem_list:
                    for item in problem_list.find_all('li'):
                        link = item.find('a')
                        if link and link.get('href'):
                            problem_links.append(urljoin(self.base_url, link.get('href')))
        
        print(f"Found {len(problem_links)} problems for {test_name}")
        
        problems_data = []
        for link in problem_links:
            problem_data = self.extract_problem_data(link, test_name)
            if problem_data:
                problems_data.append(problem_data)
                
        return {
            "test_name": test_name,
            "problems": problems_data
        }
    
    def extract_problem_data(self, problem_url, test_name):
        """Extract data from a single problem page"""
        soup = self.get_soup(problem_url)
        if not soup:
            return None
        
        problem_data = {
            "url": problem_url,
            "test_name": test_name,
            "problem_number": self._extract_problem_number(problem_url, soup),
            "problem_statement": "",
            "images": [],
            "answer_choices": [],
            "official_solution": "",
            "solutions": [],
            "video_solutions": []
        }
        
        # Find the problem statement
        problem_heading = soup.find('h2', string=lambda s: s and 'Problem' in s)
        if problem_heading:
            problem_statement = ""
            current = problem_heading.find_next()
            
            # Process until we hit the next heading or answer choices section
            while current and current.name != 'h2' and not self._is_answer_choices(current):
                if current.name == 'p':
                    # Extract text from paragraph
                    problem_statement += current.get_text().strip() + "\n\n"
                    
                    # Check for images in this paragraph
                    for img in current.find_all('img'):
                        img_src = img.get('src')
                        if img_src:
                            img_base64 = self.download_image(img_src)
                            if img_base64:
                                problem_data["images"].append({
                                    "src": img_src,
                                    "data": img_base64,
                                    "alt": img.get('alt', '')
                                })
                
                current = current.find_next()
            
            problem_data["problem_statement"] = problem_statement.strip()
        
        # Extract answer choices
        answer_choices = self._extract_answer_choices(soup)
        if answer_choices:
            problem_data["answer_choices"] = answer_choices
        
        # Extract the official solution
        solution_heading = soup.find('h2', string=lambda s: s and 'Solution' in s)
        if solution_heading:
            official_solution = ""
            solution_by = ""
            current = solution_heading.find_next()
            
            # First paragraph after Solution is usually the official solution
            while current and current.name != 'h2':
                if current.name == 'p':
                    solution_text = current.get_text().strip()
                    
                    # Check if this is a "Solution by" attribution
                    if solution_text.startswith("Solution by"):
                        solution_by = solution_text
                    else:
                        official_solution += solution_text + "\n\n"
                        
                    # Check for images in the solution
                    for img in current.find_all('img'):
                        img_src = img.get('src')
                        if img_src:
                            img_base64 = self.download_image(img_src)
                            if img_base64:
                                problem_data["images"].append({
                                    "src": img_src,
                                    "data": img_base64,
                                    "alt": img.get('alt', ''),
                                    "context": "solution"
                                })
                                
                current = current.find_next()
            
            problem_data["official_solution"] = official_solution.strip()
            if solution_by:
                problem_data["solution_by"] = solution_by
        
        # Extract alternative solutions
        problem_data["solutions"] = self._extract_alternative_solutions(soup)
        
        # Extract video solutions
        video_heading = soup.find(lambda tag: tag.name == 'h2' and 'Video' in tag.get_text())
        if video_heading:
            current = video_heading.find_next()
            while current and current.name != 'h2':
                if current.name == 'p' and current.find('a'):
                    for link in current.find_all('a'):
                        href = link.get('href')
                        text = link.get_text()
                        if href and ('youtube' in href or 'vimeo' in href):
                            problem_data["video_solutions"].append({
                                "url": href,
                                "title": text
                            })
                current = current.find_next()
        
        return problem_data
    
    def _extract_problem_number(self, url, soup):
        """Extract the problem number from URL or page content"""
        # Try from URL first
        url_match = re.search(r'Problem_(\d+)', url)
        if url_match:
            return int(url_match.group(1))
        
        # Try from the heading
        problem_heading = soup.find('h2', string=lambda s: s and 'Problem' in s)
        if problem_heading:
            heading_text = problem_heading.get_text()
            num_match = re.search(r'Problem\s+(\d+)', heading_text)
            if num_match:
                return int(num_match.group(1))
        
        # Default to -1 if we can't find it
        return -1
    
    def _is_answer_choices(self, element):
        """Check if an element contains answer choices"""
        if element.name == 'p':
            text = element.get_text()
            # Most AMC problems have answer choices formatted like "(A) ... (B) ... (C) ..."
            if re.search(r'\([A-E]\)', text):
                return True
        return False
    
    def _extract_answer_choices(self, soup):
        """Extract the multiple choice answer options"""
        choices = []
        
        # Look for paragraphs with answer choices
        for p in soup.find_all('p'):
            text = p.get_text()
            if re.search(r'\([A-E]\)', text):
                # Try to split by answer choice markers
                parts = re.split(r'\s*\(([A-E])\)\s*', text)
                if len(parts) > 2:  # We have some splits
                    # First part is any text before choices, then alternating letter and choice
                    for i in range(1, len(parts), 2):
                        if i+1 < len(parts):
                            choices.append({
                                "label": parts[i],
                                "text": parts[i+1].strip()
                            })
                return choices
        
        return choices
    
    def _extract_alternative_solutions(self, soup):
        """Extract alternative solutions from the page"""
        solutions = []
        
        # Find Solution headings that aren't the main one
        solution_headings = soup.find_all('h2', string=lambda s: s and 'Solution' in s)
        if len(solution_headings) <= 1:
            return solutions
        
        # Skip the first one as it's the official solution
        for heading in solution_headings[1:]:
            # Process until we hit "See also" or another h2
            solution_text = ""
            solution_by = ""
            current = heading.find_next()
            
            while current and (current.name != 'h2' or "See also" not in current.get_text()):
                if current.name == 'p':
                    text = current.get_text().strip()
                    if text.startswith("Solution by"):
                        solution_by = text
                    else:
                        solution_text += text + "\n\n"
                        
                    # Check for images in this solution
                    for img in current.find_all('img'):
                        img_src = img.get('src')
                        if img_src and "See also" not in current.get_text():
                            # We already handled images in the main process
                            pass
                
                next_elem = current.find_next()
                if not next_elem or (next_elem.name == 'h2' and "See also" in next_elem.get_text()):
                    break
                    
                current = next_elem
            
            if solution_text:
                solution_entry = {
                    "text": solution_text.strip()
                }
                if solution_by:
                    solution_entry["by"] = solution_by
                solutions.append(solution_entry)
            
            # If we hit "See also", stop processing alternative solutions
            if current and current.name == 'h2' and "See also" in current.get_text():
                break
        
        return solutions
    
    def scrape_multiple_years(self, start_year=2002, end_year=2024, versions=None):
        """Scrape multiple years and versions of AMC tests"""
        if versions is None:
            versions = ['A', 'B']
            
        all_tests = []
        
        for year in range(start_year, end_year + 1):
            for version in versions:
                print(f"Scraping {year} AMC 10{version}...")
                test_data = self.get_amc_problems(year, version)
                if test_data:
                    all_tests.append(test_data)
                    
                    # Save individual test files as we go
                    output_dir = "amc_data"
                    os.makedirs(output_dir, exist_ok=True)
                    with open(f"{output_dir}/{year}_AMC_10{version}.json", 'w', encoding='utf-8') as f:
                        json.dump(test_data, f, indent=2, ensure_ascii=False)
                    
                    print(f"Saved {year} AMC 10{version} with {len(test_data['problems'])} problems")
        
        return all_tests

def main():
    scraper = AMCScraper()
    
    # Example usage for a single test
    test_data = scraper.get_amc_problems(2024, 'A')
    if test_data:
        # Save to file
        os.makedirs("amc_data", exist_ok=True)
        with open("amc_data/2024_AMC_10A.json", 'w', encoding='utf-8') as f:
            json.dump(test_data, f, indent=2, ensure_ascii=False)
        print(f"Saved 2024 AMC 10A with {len(test_data['problems'])} problems")
    
    # Uncomment to scrape multiple years
    # all_tests = scraper.scrape_multiple_years(2022, 2024)  # Adjust years as needed
    
    print("Scraping completed!")

if __name__ == "__main__":
    main()