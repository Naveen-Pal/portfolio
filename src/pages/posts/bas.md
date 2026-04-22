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

### How did I find it.

1. **Port Scanning** 
   - Target: BAS portal (IP: 10.0.137.172)
   - Discovery: Open service on port 81
   ```
   81/tcp   open  hosts2-ns
   ```

2. **Access Verification**
   - Located admin login portal for _Smart Office_
   - Google search for the default credentials for Smart Office suite.
     It turn out to be :
     - Username: "smart"
     - Password: "smart"


After discovering this security issue, I reported it to the appropriate authorities and monitored the remediation process. 

![BAS Portal Admin Interface](/post/bas-mail.png)


The security team took prompt action and removed the service on port 81. Hence solve the issue.

Below is a screenshot of the interface that was accessible:

<img src="/post/bas-admin-page.png" width="700" alt="BAS Admin Portal Interface"/>

Happy Hacking!