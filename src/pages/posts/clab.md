---
layout: ../../layouts/post.astro
title: 'Computer Labs Security Vulnerabilities'
author: Naveen Pal
description: 'A responsible disclosure of remote access vulnerabilities found in IITGN computer lab systems'
image:
    url: "/post/clab-access.png"
    alt: "Remote Access Demonstration Screenshot"
pubDate: 2024-12-03
links: []
tags: ["Cybersecurity"]
---

During a regular session in the computer lab, I noticed NoMachine installed on the systems. After researching (basically googling) the software, I learned that NoMachine is a remote desktop solution operating on port 4000 using the NX protocol.

### Time to exploit

1. **Setup**
   - Installed NoMachine on my laptop
   - Attempted connection to lab computer's IP
   
2. **Authentication**
   ![NoMachine connection information](/post/clab-set.png)
   - System prompted for credentials
   - Default student credentials were accepted
   
3. **Successful Access**
   ![Login by student Credentials in NoMachine](/post/clab-login.png)
   - Gained non-administrative remote access
   - Full user-level control achieved
   
![Remote Access Demonstration](/post/clab-access.png)

### SMB Vulnerability

A second vulnerability was discovered involving unrestricted access to system files through SMB ([Server Message Block](https://www.upguard.com/blog/smb-port)) protocol.

Got to know via [Chandrabhan Patel](https://github.com/cpatel321), who identified the Remote File Inclusion vulnerability.

![SMB Access Demonstration](/post/clab-smb.png)

Vulnerabilities were promptly reported to the ISTF and the issues were acknowledged and No machine is no more installed in the lab systems.
![SMB Access Demonstration](/post/clab-mail.png)

## Ah so it was possible to cheat during lab exams?

While this was a natural concern, the faculty already had preventive measures in place, including disabling external connections during examinations. When the connection get stop it doesn't just the internet it stop the local communication between devices.

Happy Hacking!