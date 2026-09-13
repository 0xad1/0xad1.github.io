from pathlib import Path
import re

content_dir = Path("content")

# Fields that contain sentence-like text and should be quoted
fields_to_quote = {
    "title",
    "state",
    "latest",
    "hypothesis",
    "premise",
    "question",
    "contentLabel",
    "nextDirection",
    "kind"
}

for md_file in content_dir.rglob("*.md"):
    text = md_file.read_text(encoding="utf-8")

    # Split front matter from body
    if not text.startswith("---"):
        continue

    parts = text.split("---", 2)

    if len(parts) < 3:
        continue

    front_matter = parts[1]
    body = parts[2]

    lines = front_matter.splitlines()
    new_lines = []

    for line in lines:
        match = re.match(r'^(\s*)([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$', line)

        if match:
            indent, key, value = match.groups()

            if (
                key in fields_to_quote
                and value
                and not value.startswith('"')
                and not value.startswith("'")
            ):
                # Escape existing double quotes
                value = value.replace('"', '\\"')

                line = f'{indent}{key}: "{value}"'

        new_lines.append(line)

    new_text = "---" + "\n".join(new_lines) + "\n---" + body

    md_file.write_text(new_text, encoding="utf-8")

    print(f"Fixed: {md_file}")

print("\nDone! All Markdown front matter has been processed.")