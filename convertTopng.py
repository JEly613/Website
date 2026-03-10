import os
from pathlib import Path
from pdf2image import convert_from_path


def convert_pdf(pdf_path):
    pdf_path = Path(pdf_path)
    output_dir = pdf_path.parent

    try:
        pages = convert_from_path(pdf_path)

        for i, page in enumerate(pages, start=1):
            output_file = output_dir / f"page-{i}.png"
            page.save(output_file, "PNG")

        print(f"Converted: {pdf_path} ({len(pages)} pages)")

    except Exception as e:
        print(f"Failed to convert {pdf_path}: {e}")


def scan_directory(root_dir):
    for path, _, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(".pdf"):
                convert_pdf(os.path.join(path, file))


if __name__ == "__main__":
    root_directory = "./public/notes-images/"
    scan_directory(root_directory)