import requests
import json
import re

# Helper function to validate if the problem title is of the correct format
def valid_problem(problem):
    return re.match(r'^\d{4} .* Problems\/Problem [A-Z]?\d+$', problem)

# Helper function to compute the test name (e.g., AMC 10, AMC 12, etc.)
def compute_test(problem):
    return re.sub(
        r'AMC ((?:10)|(?:12))[AB]',
        r'AMC \1',
        re.sub(
            r'AIME I+',
            'AIME',
            re.sub(r'AJHSME', 'AMC 8', problem.split(' Problems')[0])
        )
    )

# Helper function to compute the year from the problem title
def compute_year(problem):
    return problem.split(' ')[0]

# Helper function to compute the problem number from the title
def compute_number(problem):
    return problem.split(' ')[-1]

# Helper function to sort the problems
def sort_problems(problems):
    return sorted(
        problems,
        key=lambda problem: (
            int(compute_year(problem)),
            compute_test(problem),
            int(compute_number(problem))
        )
    )

def main():
    all_pages = []
    all_problems = []
    num_pages = 16500  # Estimated total pages
    api_endpoint = "https://artofproblemsolving.com/wiki/api.php"
    params = {
        'action': 'query',
        'list': 'allpages',
        'aplimit': 'max',
        'format': 'json',
    }
    params_continue = None

    print("Preloading all wiki pages, allow around 15 seconds...")

    response = requests.get(api_endpoint, params=params)
    json_data = response.json()

    while True:
        for page in json_data['query']['allpages']:
            if not page['title'].startswith("/"):
                all_pages.append(page['title'])
                if valid_problem(page['title']):
                    all_problems.append(page['title'])

        if 'continue' not in json_data:
            break

        print(f"{round((len(all_pages) / num_pages) * 100)}% loaded...")
        params_continue = {**params, 'apcontinue': json_data['continue']['apcontinue']}
        response = requests.get(api_endpoint, params=params_continue)
        json_data = response.json()

    print(f"Finished loading Special:AllPages ({len(all_pages)} pages).")

    all_problems = sort_problems(all_problems)

    # Writing results to JSON files
    try:
        with open('./backend/data/allpages.json', 'w') as f:
            json.dump(all_pages, f, indent=2)
        with open('./backend/data/allproblems.json', 'w') as f:
            json.dump(all_problems, f, indent=2)
    except Exception as e:
        print(f"Error writing files: {e}")

    # Update the downloadlists.js file
    try:
        rounded_length = (len(all_pages) // 500 + 1) * 500
        with open('downloadlists.js', 'r') as file:
            code = file.read()

        code = code.replace(
            r'let numPages = \d*?;',
            f'let numPages = {rounded_length};'
        )

        with open('downloadlists.js', 'w') as file:
            file.write(code)
    except Exception as e:
        print(f"Error updating downloadlists.js: {e}")

if __name__ == '__main__':
    main()
