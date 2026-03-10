from PyPDF2 import PdfReader, PdfWriter

def split_pdf(input_pdf, split_pages):
    reader = PdfReader(input_pdf)
    total_pages = len(reader.pages)

    # ensure sorted and include final boundary
    split_pages = sorted(split_pages)
    split_pages.append(total_pages + 1)

    for i in range(len(split_pages) - 1):
        start = split_pages[i] - 1
        end = split_pages[i+1] - 1

        writer = PdfWriter()

        for page in range(start, end):
            writer.add_page(reader.pages[page])

        output_name = f"split_{i+1}.pdf"
        with open(output_name, "wb") as f:
            writer.write(f)

        print(f"Created {output_name} with pages {start+1}-{end}")

# example
split_pdf("PhysicsNotes.pdf", [10, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 36, 37, 40, 41, 42, 44, 46, 47, 48, 51, 52, 54, 55, 56, 58, 59, 61, 62, 63, 64, 65, 67, 68, 70, 72, 73, 75, 76, 77, 78, 79, 81, 83])