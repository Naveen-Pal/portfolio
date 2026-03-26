---
layout: ../../layouts/post.astro
title: 'Discovering Default Credentials in BAS Portal Admin Access'
author: Naveen Pal
description: 'A case study of responsible vulnerability disclosure: Finding and reporting default credential access in an administrative portal'
image:
    url: "/post/bas-admin-page.png"
    alt: "BAS Portal Admin Interface"
pubDate: 2023-11-28
links: []
tags: ["Cybersecurity"]
---

## Discovery Process

During a security assessment of the BAS portal, I discovered a significant vulnerability in the administrative interface. The portal, accessible at `http://bas.iitgn.ac.in:81`, was found to be using default credentials, potentially allowing unauthorized access within the IITGN-SSO network.

### Initial Investigation

1. **Port Scanning**
   - Target: BAS portal (IP: 10.0.137.172)
   - Discovery: Open service on port 81
   ```
   81/tcp   open  hosts2-ns
   ```

2. **Access Verification**
   - Located admin login portal for Smart Office Online
   - Research revealed default credentials:
     - Username: "smart"
     - Password: "smart"

### Security Implications

The vulnerability could allow unauthorized users to:
- Access administrative functions
- Modify user accounts
- Add or delete users
- Manipulate system settings

## Responsible Disclosure

After discovering this security issue:
1. Documented the vulnerability
2. Reported findings to appropriate authorities
3. Monitored remediation process

### Resolution

The security team took prompt action:
- Service on port 81 was removed
- Default credentials were addressed
- Access controls were strengthened

## Impact and Learning

This experience was particularly meaningful as my first bug discovery:
- Reinforced the importance of security testing
- Demonstrated the value of responsible disclosure
- Motivated further security research
- Highlighted the impact of proactive security measures

## Visual Evidence

Below is a screenshot of the admin interface that was accessible:

<img src="/post/bas-admin-page.png" width="700" alt="BAS Admin Portal Interface"/>

## Conclusion

This discovery emphasizes the importance of:
- Regular security audits
- Strong access controls
- Changing default credentials
- Proper network security

Happy (Ethical) Hacking! 🔒