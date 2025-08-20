---
layout: ../../layouts/post.astro
title: 'Discovering and Reporting Security Vulnerabilities in IITGN Computer Labs'
author: Naveen Pal
description: 'A responsible disclosure of remote access vulnerabilities found in IITGN computer lab systems'
image:
    url: "/post/clab-access.png"
    alt: "Remote Access Demonstration Screenshot"
pubDate: 2024-12-03
links: []
tags: ["Cybersecurity"]
---

## Initial Discovery

During a regular session in the computer lab, I noticed NoMachine installed on the systems. After researching the software (yes, Google is every security researcher's best friend 😉), I learned that NoMachine is a remote desktop solution operating on port 4000 using the NX protocol.

## Investigation Process

### Remote Access Vulnerability

1. **Initial Setup**
   - Installed NoMachine on my laptop
   - Attempted connection to lab computer's IP
   
2. **Authentication Test**
   ![NoMachine connection information](/post/clab-set.png)
   - System prompted for credentials
   - Default student credentials were accepted
   
3. **Successful Access**
   ![Login by student Credentials in NoMachine](/post/clab-login.png)
   - Gained non-administrative remote access
   - Full user-level control achieved
   
![Remote Access Demonstration](/post/clab-access.png)

## Additional Findings

### SMB Vulnerability

A second vulnerability was discovered involving unrestricted access to system files through SMB ([Server Message Block](https://www.upguard.com/blog/smb-port)) protocol.

Credit for this discovery goes to [Chandrabhan Patel](https://github.com/cpatel321), who identified the Remote File Inclusion vulnerability.

![SMB Access Demonstration](/post/clab-smb.png)

## Responsible Disclosure

Both vulnerabilities were promptly reported to the IT Security Task Force (ISTF):
- Issues were acknowledged and verified
- Remediation measures were implemented
- Systems are now secured against these vulnerabilities

## Security Considerations

> "Could this be exploited during lab exams?"

While this was a natural concern, the faculty already had preventive measures in place, including disabling external connections during examinations.

## Conclusion

This experience highlights the importance of:
- Regular security audits
- Proper system configuration
- Prompt vulnerability reporting
- Responsible disclosure practices

Happy (Ethical) Hacking!