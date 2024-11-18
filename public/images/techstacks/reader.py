import os
import json
from PIL import Image

def get_image_dimensions(directory):
    image_data = {}
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')):
            file_path = os.path.join(directory, filename)
            with Image.open(file_path) as img:
                width, height = img.size
                image_data[filename] = {"width": width, "height": height}
    return image_data

def save_to_json(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Specify the directory containing the images
directory = "./"
output_file = "imagedata.json"

# Get image dimensions and save to JSON
image_data = get_image_dimensions(directory)
save_to_json(image_data, output_file)

print(f"Image dimensions saved to {output_file}")
