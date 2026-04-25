#!/usr/bin/env python3
"""Round all floats in a JSON file to 3 decimal places."""

import json
import sys


def round_floats(obj, decimals=3):
    if isinstance(obj, float):
        return round(obj, decimals)
    if isinstance(obj, dict):
        return {k: round_floats(v, decimals) for k, v in obj.items()}
    if isinstance(obj, list):
        return [round_floats(item, decimals) for item in obj]
    return obj


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python round_json.py <file.json> [decimals]")
        sys.exit(1)

    path = sys.argv[1]
    decimals = int(sys.argv[2]) if len(sys.argv) > 2 else 3

    with open(path, "r") as f:
        data = json.load(f)

    data = round_floats(data, decimals)

    with open(path, "w") as f:
        json.dump(data, f, separators=(",", ":"))

    print(f"Done — rounded all floats in {path} to {decimals} decimal places.")
