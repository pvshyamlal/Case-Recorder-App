import os

def get_all_files(directory):
    # List to store all file paths
    file_paths = []
    
    # Walk through the directory
    for root, dirs, files in os.walk(directory):
        # Exclude .git and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules']]
        
        # Add file paths to the list
        for file in files:
            file_paths.append(os.path.join(root, file))
    
    return file_paths

# Define the directory path
directory_path = r'D:\Github\Case-Recorder-App'

# Get all file paths excluding .git and node_modules
files = get_all_files(directory_path)

# Print all file paths
for file in files:
    print(file)
