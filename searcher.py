import os

def search_string_in_file(file_path, search_string):
    line_number = 0
    count = 0
    found_lines = []

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line_number += 1
            if search_string in line:
                count += 1
                found_lines.append(line_number)
    
    return count, found_lines

def search_through_directory(directory_path, search_string, exclude_paths):
    matches = {}
    total_count = 0

    for root, dirs, files in os.walk(directory_path):
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in exclude_paths]
        for file in files:
            if file.endswith(('.js', '.jsx')) and os.path.join(root, file) not in exclude_paths:
                file_path = os.path.join(root, file)
                count, lines = search_string_in_file(file_path, search_string)
                if count > 0:
                    matches[file_path] = {'count': count, 'lines': lines}
                    total_count += count

    return total_count, matches

def output_results_to_file(output_path, search_string, total_count, matches):
    with open(output_path, 'w') as file:
        file.write(f"Total occurrences of '{search_string}': {total_count}\n")
        for file_path, data in matches.items():
            file.write(f"\nIn file: {file_path}\n")
            file.write(f"Occurrences: {data['count']}\n")
            file.write(f"Lines: {data['lines']}\n")

# Set the base directory to the script's directory
base_directory = os.path.dirname(os.path.realpath(__file__))

search_string = input("Enter the search string: ")
output_file_name = input("Enter the output file name (e.g., 'output.txt'): ")
output_file_path = os.path.join(base_directory, output_file_name)

# Define paths to exclude (modify as needed)
exclude_paths = [
    # Add paths to exclude here, e.g., os.path.join(base_directory, 'node_modules')
]

total_count, matches = search_through_directory(base_directory, search_string, exclude_paths)
output_results_to_file(output_file_path, search_string, total_count, matches)

print(f"Search results have been written to {output_file_path}")
