import os

def process_files(root_dir, combined_file, list_file):
    exclude_dirs = {'src','dist', 'node_modules', '.git', 'logs'}
    exclude_files = {
        './UserStories.md',
        './combine.py',
        './combine3.txt',
        './combine.py',
        './list2.txt',
        './.gitignore',
        './.env',
        './README.md',
        './searcher.py'
        './package-lock.json',
        './package.json',
        './webpack.config.js',
        './public/pictures/arc-triomf_888_1.jpg',
        './src/assets/avatardefault_.png',
    }

    with open(combined_file, 'w', encoding='utf-8') as outfile, \
         open(list_file, 'w', encoding='utf-8') as listfile:
        for subdir, _, files in os.walk(root_dir):
            # Split the subdir into parts
            subdir_parts = subdir.split(os.sep)

            # Check if any part of subdir is in exclude_dirs
            if any(part in exclude_dirs for part in subdir_parts):
                continue

            for file in files:
                file_path = os.path.join(subdir, file)
                if file_path in exclude_files:
                    continue  # Skip excluded files
                file_size = os.path.getsize(file_path)
                # Write file info to list.txt
                listfile.write(f"{file_path}, {file_size} bytes\n")
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        # Write file content to combine2.txt
                        outfile.write(infile.read() + '\n')
                except UnicodeDecodeError:
                    try:
                        with open(file_path, 'r', encoding='latin1') as infile:
                            outfile.write(infile.read() + '\n')
                    except Exception as e:
                        print(f"Could not read {file_path} due to {e}")

process_files('.', 'combine3.txt', 'list2.txt')