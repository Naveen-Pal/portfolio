---
layout: ../../layouts/post.astro
title: Computer labs of IITGN is vulnerable to remote access!!
author: Naveen Pal
description: "How I Discovered a Remote Access Vulnerability in IITGN's Computer Lab"
image:
    url: "/post/clab-access.png"
    alt: "Thumbnail of Astro arcs."
pubDate: 2024-12-03
tags: ["Cybersecurity","computer"]
---

One day sitting in the computer lab. I don't no what I was doing but I found Nomachine is installed in their system googling about NoMachine (yes, most powerfull hacking skill is Googling :). I find out NoMachine is used for remote desktop and runs on port 4000 with nx protocol.

Now I know what to do I install Nomachine in my laptop and put the IP of lab computer and try to connect it. 
<br>
<!-- 
<img src="/post/clab-set.png" width="500"/>
<br> -->
<div class="w-100 text-center my-4">
    <img src="/post/clab-set.png" alt="Computer lab setup" class="img-fluid shadow-sm"style="width: 80%;"/>
    <p class="text-center text-muted small mt-2">NoMachine connection information </p>
</div>


It was asking for username and password. I simple give it the default credentials of student and gain access.
<!-- ![alt text](image.png) -->

<br>
<div class="w-100 text-center my-4">
    <img src="/post/clab-login.png" alt="Computer lab setup" class="img-fluid shadow-sm"style="width: 80%;"/>
    <p class="text-center text-muted small mt-2">Login by student Credentials in Nomachine </p>
</div>

Fortunately It connected successfully and I was able to do everything on the lab computer remotely but I don't have admin level previleges althrough we can use their high resources at the comfort of hostel. What do you mean we can also cheat using this during lab exam, This was my first thought but professor shutdowns the connections during lab exams.
<div class="w-100 text-center my-4">
    <img src="/post/clab-access.png" alt="Computer lab setup" class="img-fluid shadow-sm"style="width: 80%;"/>
    <p class="text-center text-muted small mt-2">Got remote access to the Computer</p>
</div>
There was also another vulnerability by which anyone can get access to systems files and directories through [SMB](https://www.upguard.com/blog/smb-port). 
Credites to <a href="https://github.com/cpatel321" target="_blank" rel="noopener noreferrer">Chandrabhan Patel</a>
for finding this Remote file inclusion vulnerability.
<div class="w-100 text-center my-4">
    <img src="/post/clab-smb.png" alt="Computer lab setup" class="img-fluid shadow-sm"style="width: 80%;"/>
    <!-- <p class="text-center text-muted small mt-2">Got remote access to the Computer</p> -->
</div>
Unfortunately or fortunately after reporting this issue it was resolved by the ISTF. 

<br>
Happy Hacking