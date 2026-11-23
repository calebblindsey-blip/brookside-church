# Fact-check checklist for Pastor Brad

Every church-specific statement on the live Brookside Church of God site, quoted exactly as it appears, with where it lives in the code and which page(s) show it. Work through each line and write any correction after **Brad's correction:**. Nothing here has been guessed or corrected; this is a list of what the site says today.

**How to read a line:** `- [ ] "text as it appears on the site" — file:line — page URL(s) — Brad's correction: ____`

Scope: everything that builds the live site (`src/pages`, `src/components`, `src/layouts`, `src/data`). The site has no content collections. Line numbers refer to the `redesign` branch at the time of writing. Where text is assembled from data (for example the address or service times), the rendered result is quoted and the source line is the data definition. Bible quotations are not listed.

## [TO CONFIRM WITH PASTOR BRAD] placeholders in the code

None found. No `[TO CONFIRM WITH PASTOR BRAD]` marker (or any "TO CONFIRM" / "TODO" placeholder) appears in `src`, `public`, `functions` or `scripts`.


## 1. Staff names and titles

- [ ] "Brad Lindsey, Senior Pastor" — src/pages/about.astro:51 — /about/ — Brad's correction: ____
- [ ] "Brad and his wife, Marcie, joined Brookside Church of God in 1999, and have seen God’s hand move sovereignly through their lives and the church in the years since. He has traveled nationally and internationally in missions work. Marcie serves across many areas of the church. Brad and Marcie have two sons, Caleb and Cole." — src/pages/about.astro:51 — /about/ — Brad's correction: ____
- [ ] "Brad Lindsey, Senior Pastor, with his wife Marcie" — src/pages/about.astro:51 — /about/ (photo alt text, read by screen readers) — Brad's correction: ____
- [ ] "Daniel Howard, Teaching Pastor" — src/pages/about.astro:52 — /about/ — Brad's correction: ____
- [ ] "Daniel was licensed in 1996 and ordained into the ministry in 1999. A self-proclaimed Bible nerd and treasure hunter, his greatest joy is digging into the Word, turning up the gold in it, and handing it to the church. He and his wife, Patti, have one son." — src/pages/about.astro:52 — /about/ — Brad's correction: ____
- [ ] "Daniel Howard, Teaching Pastor" — src/pages/about.astro:52 — /about/ (photo alt text, read by screen readers) — Brad's correction: ____
- [ ] "Caleb Lindsey, Worship Pastor" — src/pages/about.astro:53 — /about/ — Brad's correction: ____
- [ ] "Caleb leads the church into the presence of God through authentic worship, and counts it a privilege to use what God has given him to advance the Gospel from week to week. He and his wife have two daughters." — src/pages/about.astro:53 — /about/ — Brad's correction: ____
- [ ] "Caleb Lindsey, Worship Pastor, with his wife and their two daughters" — src/pages/about.astro:53 — /about/ (photo alt text, read by screen readers) — Brad's correction: ____
- [ ] "Cole Lindsey, Youth Pastor" — src/pages/about.astro:54 — /about/ — Brad's correction: ____
- [ ] "Cole and his wife, Aubrey, serve the students of Brookside Church of God." — src/pages/about.astro:54 — /about/ — Brad's correction: ____
- [ ] "Cole Lindsey, Youth Pastor, with his wife Aubrey" — src/pages/about.astro:54 — /about/ (photo alt text, read by screen readers) — Brad's correction: ____
- [ ] "Corey and Megan Jackson, Children’s Pastors" — src/pages/about.astro:55 — /about/ — Brad's correction: ____
- [ ] "Corey and Megan Jackson serve the children of Brookside Church of God." — src/pages/about.astro:55 — /about/ — Brad's correction: ____
- [ ] "Corey and Megan Jackson, Children’s Pastors" — src/pages/about.astro:55 — /about/ (photo alt text, read by screen readers) — Brad's correction: ____
- [ ] "Brad and Marcie Lindsey have been at Brookside since 1999." — src/pages/about.astro:93 — /about/ — Brad's correction: ____
- [ ] "Brad Lindsey" — src/data/sermons.json:12 — / (“This week’s sermon” speaker line) and /watch/ (“Most recent sermon”) — Brad's correction: ____

> Note: The speaker name on the home page and Watch page is not typed in the code; it is read from the sermon feed (`src/data/sermons.json`, the `speaker` of the first entry in `recent`, currently "Brad Lindsey") and changes each week.

> Note: Staff order on the About page (Brad, Daniel, Caleb, Cole, Corey and Megan) is the order of the `staff` array, `src/pages/about.astro:50`. A code comment says this is "seniority order"; the page itself does not say so.

## 2. Mission and missions wording

- [ ] "From Brookside to the world." — src/pages/about.astro:111 — /about/ — Brad's correction: ____
- [ ] "To preach and support the Gospel of Jesus Christ both locally and abroad, opening the door for lives to be changed and transformed through the power of Jesus Christ." — src/pages/about.astro:113 — /about/ — Brad's correction: ____
- [ ] "From Brookside to the world." — src/pages/index.astro:196 — / — Brad's correction: ____
- [ ] "Our mission is to preach and support the Gospel of Jesus Christ both locally and abroad, opening the door for lives to be transformed through His power." — src/pages/index.astro:198 — / — Brad's correction: ____
- [ ] "Brookside, Romania, Moldova, Honduras, Guatemala, Israel" — src/pages/index.astro:200 — / (list headed by hidden label “Places where Brookside supports ministry”, line 199) — Brad's correction: ____
- [ ] "To see a family of believers rooted in Christ, alive in the Spirit, and carrying the hope of the Gospel from Brookside to the world." — src/pages/index.astro:126 — / (labelled “Vision”) — Brad's correction: ____
- [ ] "We gather to worship, seek God through prayer, grow in Scripture, live in authentic community, and equip every believer to serve wherever Christ calls them." — src/pages/index.astro:130 — / (labelled “Mission”) — Brad's correction: ____
- [ ] "Worship, Prayer, Scripture, Community, Calling" — src/pages/index.astro:134 — / (list headed by hidden label “Our shared practices”) — Brad's correction: ____
- [ ] "Rooted in Christ. Alive in the Spirit." — src/pages/index.astro:121 — / — Brad's correction: ____

> Note: No partner organizations or missionaries are named anywhere in the live code; only the five countries above appear (a place list with no further wording). Brad’s bio also says "He has traveled nationally and internationally in missions work" (listed under heading 1, `src/pages/about.astro:51`).

## 3. Beliefs and declarations

- [ ] "A small Pentecostal church family on Cardiff Street in Brookside, Alabama, one we would love you to be part of. Come as you are and sit wherever you like." — src/pages/about.astro:65 — /about/ — Brad's correction: ____
- [ ] "Christian. Protestant. Foundational. Evangelical." — src/pages/about.astro:72 — /about/ — Brad's correction: ____
- [ ] "Four words the Church of God uses to describe itself. First and foremost, Brookside is built upon Jesus Christ, the Son of God, and our doctrine and practice rest on His teaching and the authority of Scripture." — src/pages/about.astro:73 — /about/ — Brad's correction: ____
- [ ] "We welcome people from all denominations." — src/pages/about.astro:74 — /about/ — Brad's correction: ____
- [ ] "First and foremost, the Church of God is a determinedly Christian church. It is built upon the person of Jesus Christ, the Son of God, and the doctrines and practices of the church are based upon His teachings." — src/pages/about.astro:26 — /about/ (“Christian”) — Brad's correction: ____
- [ ] "Founded upon the principles of Protestantism, though not a traditional follower of any one leader of the Reformation. We stand firmly for justification by faith, the priesthood of believers, the authority of the Bible, religious freedom, and the separation of church and state." — src/pages/about.astro:30 — /about/ (“Protestant”) — Brad's correction: ____
- [ ] "The Church of God subscribes to five foundational Christian doctrines." — src/pages/about.astro:34 — /about/ (“Foundational”) — Brad's correction: ____
- [ ] "The inerrancy and infallibility of the Bible." — src/pages/about.astro:36 — /about/ (five foundational doctrines, no. 1) — Brad's correction: ____
- [ ] "The virgin birth and complete deity of Christ." — src/pages/about.astro:37 — /about/ (five foundational doctrines, no. 2) — Brad's correction: ____
- [ ] "The atoning sacrifice of Christ’s death for the sins of the world." — src/pages/about.astro:38 — /about/ (five foundational doctrines, no. 3) — Brad's correction: ____
- [ ] "The literal resurrection of the body." — src/pages/about.astro:39 — /about/ (five foundational doctrines, no. 4) — Brad's correction: ____
- [ ] "Christ’s second coming in bodily form to earth." — src/pages/about.astro:40 — /about/ (five foundational doctrines, no. 5) — Brad's correction: ____
- [ ] "Evangelical describes those who affirm the primary doctrines revealed in the Scriptures: the inspiration and authority of the Word of God, the Trinity, the deity and virgin birth of Jesus Christ, salvation by faith in the atoning death of Christ, His bodily resurrection and ascension, the ministry of the Holy Spirit, the second coming of Christ, and the spiritual unity of believers." — src/pages/about.astro:45 — /about/ (“Evangelical”) — Brad's correction: ____
- [ ] "This is the declaration of faith of the Church of God, which Brookside holds without reservation. It is written plainly and it is not long. If you want the shorter description of who we are first, that is on the about page." — src/pages/what-we-believe.astro:40 — /what-we-believe/ — Brad's correction: ____
- [ ] "The declaration of faith of Brookside Church of God: sixteen articles on Scripture, the Trinity, salvation, sanctification, and the return of Christ." — src/pages/what-we-believe.astro:34 — /what-we-believe/ (page description, search-result/share text) — Brad's correction: ____
- [ ] "The Bible is the inspired and only infallible Word of God." — src/pages/what-we-believe.astro:13 — /what-we-believe/ (Article 1 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In one God eternally existing in three persons; namely, the Father, Son, and Holy Ghost." — src/pages/what-we-believe.astro:14 — /what-we-believe/ (Article 2 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "That Jesus Christ is the only begotten Son of the Father, conceived of the Holy Ghost, and born of the Virgin Mary." — src/pages/what-we-believe.astro:15 — /what-we-believe/ (Article 3 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "That Jesus was crucified, buried, and raised from the dead." — src/pages/what-we-believe.astro:16 — /what-we-believe/ (Article 4 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "That He ascended to heaven and is today at the right hand of the Father as the Intercessor." — src/pages/what-we-believe.astro:17 — /what-we-believe/ (Article 5 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "That all have sinned and come short of the glory of God and that repentance is commanded of God for all and necessary for forgiveness of sins." — src/pages/what-we-believe.astro:18 — /what-we-believe/ (Article 6 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "That justification, regeneration, and the new birth are wrought by faith in the blood of Jesus Christ." — src/pages/what-we-believe.astro:19 — /what-we-believe/ (Article 7 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In sanctification subsequent to the new birth, through faith in the blood of Christ; through the Word, and by the Holy Ghost." — src/pages/what-we-believe.astro:20 — /what-we-believe/ (Article 8 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "Holiness to be God’s standard of living for His people." — src/pages/what-we-believe.astro:21 — /what-we-believe/ (Article 9 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In the baptism with the Holy Ghost subsequent to a clean heart." — src/pages/what-we-believe.astro:22 — /what-we-believe/ (Article 10 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In water baptism by immersion, and all who repent should be baptized in the name of the Father, and of the Son, and of the Holy Ghost." — src/pages/what-we-believe.astro:23 — /what-we-believe/ (Article 11 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "The Lord’s Supper as a symbolic remembrance of Christ’s suffering and death for our salvation." — src/pages/what-we-believe.astro:24 — /what-we-believe/ (Article 12 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "Divine healing is provided for all in the atonement." — src/pages/what-we-believe.astro:25 — /what-we-believe/ (Article 13 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In the second coming of Jesus. First, to resurrect the righteous dead and to catch away the living saints to Him in the air." — src/pages/what-we-believe.astro:26 — /what-we-believe/ (Article 14 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "In the bodily resurrection; eternal life for the righteous, and eternal punishment for the wicked." — src/pages/what-we-believe.astro:27 — /what-we-believe/ (Article 15 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "Marriage is God-ordained. “The creator made them male and female, and said, ‘For this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh’” (Matthew 19:4-5). Marriage is to be an exclusive relationship, a lifelong faithful union between a man and a woman. This relationship between a husband and wife should parallel the relationship between Christ and the Church (Ephesians 5:23-30)." — src/pages/what-we-believe.astro:28 — /what-we-believe/ (Article 16 of 16, introduced by “We believe:”) — Brad's correction: ____
- [ ] "Everything above is what this church holds to be true. None of it is a substitute for the thing it is all pointing at. If you want to know how a person actually comes to Christ, that is written out plainly on its own page." — src/pages/what-we-believe.astro:53 — /what-we-believe/ — Brad's correction: ____
- [ ] "Everything we do returns to one message: Jesus Christ died and rose again so people could come home to God." — src/pages/index.astro:113 — / — Brad's correction: ____

> Note: The "Church of God (Cleveland, Tennessee)" affiliation is named only in a code comment (`src/pages/about.astro:15-16`), not in visible text. The visible text says "Church of God" and "Pentecostal" (above).

## 4. Gospel and giving copy

- [ ] "Giving here pays for the ministry of this church and supports the Gospel beyond it. However you choose to give, it goes to the same place." — src/pages/give.astro:32 — /give/ — Brad's correction: ____
- [ ] "Give securely online" — src/pages/give.astro:33 — /give/ (button; links to https://brooksidechurchofgod.churchcenter.com/giving) — Brad's correction: ____
- [ ] "Give to Brookside Church of God online through Planning Center, in the Church Center app, in person on a Sunday, or by mail." — src/pages/give.astro:28 — /give/ (page description) — Brad's correction: ____
- [ ] "Four ways to give" — src/pages/give.astro:37 — /give/ — Brad's correction: ____
- [ ] "Our secure giving portal runs on Planning Center, the same system the church uses for its groups and scheduling. Give once or set giving to repeat, with a card or straight from a bank account." — src/pages/give.astro:42 — /give/ (“Online”) — Brad's correction: ____
- [ ] "https://brooksidechurchofgod.churchcenter.com/giving" — src/pages/give.astro:21 — /give/ (link text “Planning Center” and the “Give securely online” button) — Brad's correction: ____
- [ ] "The same giving, on your phone, along with the church directory and groups. Sign in once and giving takes a few seconds after that." — src/pages/give.astro:48 — /give/ (“Church Center app”) — Brad's correction: ____
- [ ] "https://apps.apple.com/us/app/church-center-app/id1357742931" — src/pages/give.astro:22 — /give/ (link text “iPhone”) — Brad's correction: ____
- [ ] "https://play.google.com/store/apps/details?id=com.ministrycentered.churchcenter" — src/pages/give.astro:23 — /give/ (link text “Android”) — Brad's correction: ____
- [ ] "Envelopes are in the foyers on Sundays and at Wednesday Classes. Cash or check, into the offering containers." — src/pages/give.astro:55 — /give/ (“In person”) — Brad's correction: ____
- [ ] "Checks can be mailed to the church office." — src/pages/give.astro:60 — /give/ (“By mail”) — Brad's correction: ____
- [ ] "Brookside COG P.O. Box 24 Brookside, AL 35036" — src/pages/give.astro:61 — /give/ (mailing address block; box number and ZIP come from src/data/church.ts:51 and :39) — Brad's correction: ____
- [ ] "Ten percent of our income, contributed to the church on a regular basis." — src/pages/give.astro:69 — /give/ (“Tithe”) — Brad's correction: ____
- [ ] "What we give when we feel called to give over and above the tithe." — src/pages/give.astro:70 — /give/ (“Offering”) — Brad's correction: ____
- [ ] "Giving statements, recurring gifts, correcting something that went through wrong, or giving toward something specific. Call the office or send an email." — src/pages/give.astro:77 — /give/ — Brad's correction: ____
- [ ] "Online, in the Church Center app, in person on a Sunday, or by mail." — src/pages/404.astro:18 — 404 page (“Give” card) — Brad's correction: ____
- [ ] "Online giving happens in Church Center, run by Planning Center, not on this website. Your payment details go to Planning Center and its payment processor and never pass through this site." — src/pages/privacy.astro:48 — /privacy/ (“Giving”) — Brad's correction: ____
- [ ] "This church exists to preach one message, and this page is that message written down rather than preached. It takes about three minutes to read. Nothing on it is complicated, and none of it depends on you cleaning yourself up first." — src/pages/knowing-christ.astro:33 — /knowing-christ/ — Brad's correction: ____
- [ ] "God closed the gap Himself. Jesus paid the penalty for our sin by dying in our place, and then walked out of the grave. This is what this church means when it says it preaches Christ crucified." — src/pages/knowing-christ.astro:16 — /knowing-christ/ (“God’s remedy is the cross”) — Brad's correction: ____
- [ ] "God is not distant and He is not indifferent. He made you, He loves you, and what He wants for you is life rather than the wearing-down most people settle for." — src/pages/knowing-christ.astro:14 — /knowing-christ/ (“God’s plan is peace and life”) — Brad's correction: ____
- [ ] "People choose their own way instead of God’s, and that choice puts distance between us and Him. It is not a matter of being worse than the person next to you. It is true of every one of us, and no amount of effort closes the gap from our side." — src/pages/knowing-christ.astro:15 — /knowing-christ/ (“Our problem is separation”) — Brad's correction: ____
- [ ] "Knowing all of this is not the same as receiving it. What God offers has to be taken, and it is taken by trusting Christ and asking Him to be Lord of your life." — src/pages/knowing-christ.astro:17 — /knowing-christ/ (“The response is to receive Him”) — Brad's correction: ____
- [ ] "Admit your need. You are a sinner, the same as everyone who has ever walked into this building." — src/pages/knowing-christ.astro:20 — /knowing-christ/ (How to receive Christ, step 1) — Brad's correction: ____
- [ ] "Be willing to turn from your sin. That is what repentance means, and it is a change of direction rather than a change of mood." — src/pages/knowing-christ.astro:21 — /knowing-christ/ (How to receive Christ, step 2) — Brad's correction: ____
- [ ] "Believe that Jesus Christ died for you on the cross and rose from the grave, and say so out loud." — src/pages/knowing-christ.astro:22 — /knowing-christ/ (How to receive Christ, step 3) — Brad's correction: ____
- [ ] "In prayer, ask Jesus Christ to come into your life and to lead it, as Lord and Savior." — src/pages/knowing-christ.astro:23 — /knowing-christ/ (How to receive Christ, step 4) — Brad's correction: ____
- [ ] "There are no particular words that have to be used. God is not listening for a formula, He is listening for somebody who means it." — src/pages/knowing-christ.astro:56 — /knowing-christ/ — Brad's correction: ____
- [ ] "If you prayed that, this church would count it a privilege to hear about it and to help you take the next step. Come on a Sunday and say so, or email ahead if walking in cold is easier. Either reaches a real person, and nobody will make a spectacle of you." — src/pages/knowing-christ.astro:63 — /knowing-christ/ — Brad's correction: ____
- [ ] "How a person comes to Christ: God’s plan, our problem, the cross, and how to receive Him. Written plainly by Brookside Church of God." — src/pages/knowing-christ.astro:29 — /knowing-christ/ (page description) — Brad's correction: ____
- [ ] "Every one of these sermons is about the same thing." — src/pages/watch.astro:310 — /watch/ — Brad's correction: ____

> Note: The Bible verses on /knowing-christ/ (John 3:16, Romans 3:23, Romans 5:8, John 1:12, `src/pages/knowing-christ.astro:14-17`) and 1 Corinthians 2:2 on the home page (`src/pages/index.astro:109`) are scripture quotations, not church claims, and are not listed as items.

> Note: PayPal is not on the live site (removed 2026-09-11 per a code comment at `src/pages/give.astro:5-6`). The only giving platform named is Planning Center / Church Center.

## 5. History and founding claims

- [ ] "Every sermon since 2020 plays right here, and Sunday worship streams live at 10:45 AM." — src/pages/index.astro:183 — / (year is computed from the oldest sermon in the feed, March 18, 2020; the “Every sermon since” wording is on line 183) — Brad's correction: ____
- [ ] "Every sermon the church has recorded, back to 2020, and all of them play here." — src/pages/404.astro:15 — 404 page (“Sermons” card) — Brad's correction: ____
- [ ] "The full archive, back to 2020." — src/pages/watch.astro:298 — /watch/ (Apple Podcasts card) — Brad's correction: ____
- [ ] "Six years of preaching. One subject." — src/pages/watch.astro:141 — /watch/ (“Six” is computed from the feed: newest year minus oldest year) — Brad's correction: ____
- [ ] "Sunday worship streams live at 10:45 AM. Everything before it is here, back to the first recording in March 2020." — src/pages/watch.astro:142 — /watch/ (month and year are computed from the oldest sermon in the feed) — Brad's correction: ____
- [ ] "The archive begins with March 18, 2020, “Is Love Tolerant?”." — src/pages/watch.astro:286 — /watch/ (computed from the oldest sermon in `src/data/sermons.json`) — Brad's correction: ____
- [ ] "All 308 sermons Brookside Church of God has recorded since March 2020, plus the Sunday livestream. Worship streams live at 10:45 AM." — src/pages/watch.astro:124 — /watch/ (page description; count and date are computed from the feed) — Brad's correction: ____
- [ ] "Sermon archive · 308 messages" — src/pages/watch.astro:229 — /watch/ (count computed from the feed) — Brad's correction: ____
- [ ] "Every sermon since March 2020 plays right here." — src/pages/watch.astro:231 — /watch/ (date computed from the feed) — Brad's correction: ____
- [ ] "The complete archive goes back to March 2020 and is free on the platforms you already use." — src/pages/watch.astro:295 — /watch/ (date computed from the feed) — Brad's correction: ____
- [ ] "This site was rebuilt in 2026 and a few of the old addresses did not survive the move. Nothing was lost, it just lives somewhere else now." — src/pages/404.astro:29 — 404 page — Brad's correction: ____
- [ ] "Last updated October 5, 2026" — src/pages/privacy.astro:20 — /privacy/ (date of the privacy page) — Brad's correction: ____

> Note: **None found** for founding year, founding story, number of pastors, or building history. The live site states no founding date, no building history and no count of pastors.

> Note: Dates and "since" claims that *are* on the live site are listed under other headings and repeated here only as pointers (not extra checkboxes): "Brad and Marcie Lindsey have been at Brookside since 1999" and Daniel Howard "licensed in 1996 and ordained into the ministry in 1999" (heading 1, `src/pages/about.astro:51-52,93`).

## 6. Contact, address, and service times

- [ ] "200 Cardiff Street, Brookside, Alabama 35036" — src/data/church.ts:36 — every page footer (“Find us”, `src/components/SiteFooter.astro:66`); /visit/ (`src/pages/visit.astro:74`); structured data on every page — Brad's correction: ____
- [ ] "200 Cardiff Street · Brookside, Alabama" — src/pages/index.astro:87 — / — Brad's correction: ____
- [ ] "200 Cardiff Street." — src/pages/visit.astro:64 — /visit/ — Brad's correction: ____
- [ ] "Brookside sits just northwest of Birmingham, off I‑22, and there is plenty of parking at the building. Mail does not come to the building; anything mailed to the church goes to the P.O. Box." — src/pages/visit.astro:65 — /visit/ — Brad's correction: ____
- [ ] "Mail: P.O. Box 24, Brookside, AL 35036" — src/data/church.ts:51 — /visit/ (`src/pages/visit.astro:79`); also /give/ (as “Brookside COG, P.O. Box 24, Brookside, AL 35036”) — Brad's correction: ____
- [ ] "(205) 675-0703" — src/data/church.ts:58 — / (via footer, every page); /visit/; /give/; /privacy/; 404 page; structured data — Brad's correction: ____
- [ ] "info@brooksidecog.com" — src/data/church.ts:64 — every page footer; /visit/; /give/; /privacy/; structured data — Brad's correction: ____
- [ ] "Sunday School 9:45 AM" — src/data/church.ts:74 — every page footer; / (hero card); /about/; /visit/; 404 page — Brad's correction: ____
- [ ] "Morning Worship 10:45 AM" — src/data/church.ts:75 — every page footer; / (hero card); /about/; /visit/; 404 page — Brad's correction: ____
- [ ] "Wednesday Classes 6:30 PM" — src/data/church.ts:76 — every page footer; / (hero card); /about/; /visit/; 404 page — Brad's correction: ____
- [ ] "Everyone is welcome. There is nothing to sign up for, and nobody needs to know you are coming. Morning Worship starts at 10:45 and we are usually done around 12:15." — src/pages/visit.astro:36 — /visit/ — Brad's correction: ____
- [ ] "Everyone is welcome. There is nothing to sign up for, and nobody needs to know you are coming. Morning Worship starts at 10:45 and we are usually done around 12:15." — src/pages/index.astro:143 — / — Brad's correction: ____
- [ ] "Sunday 10:45" — src/pages/index.astro:168 — / (orbit graphic next to “Hear the message”) — Brad's correction: ____
- [ ] "Sunday 10:45 AM" — src/pages/index.astro:190 — / (YouTube live link) — Brad's correction: ____
- [ ] "Plan a visit to Brookside Church of God. Sunday School 9:45 AM, Morning Worship 10:45 AM, Wednesday Classes 6:30 PM, at 200 Cardiff Street, Brookside, AL 35036." — src/pages/visit.astro:31 — /visit/ (page description; address built from src/data/church.ts) — Brad's correction: ____
- [ ] "A Christ-centered church family in Brookside, Alabama. Sunday School at 9:45 AM, Morning Worship at 10:45 AM, or watch online anytime." — src/layouts/SiteLayout.astro:52 — / (home page description; default for any page without its own) — Brad's correction: ____
- [ ] "Live Sunday 10:45 AM" — src/pages/watch.astro:144 — /watch/ (Watch live box, “Live Sunday” line 144, “10:45” line 145) — Brad's correction: ____
- [ ] "Live Sundays, 10:45 AM" — src/pages/watch.astro:217 — /watch/ (shown on the video panel when no recent service date is available) — Brad's correction: ____
- [ ] "Live on Sunday morning. The rest of the week, the most recent one." — src/pages/watch.astro:220 — /watch/ — Brad's correction: ____
- [ ] "Sunday 09:45 to 12:15; Wednesday 18:30 to 19:30" — src/data/church.ts:87 — not visible; structured data (JSON-LD) on every page, `src/components/ChurchSchema.astro:48-53`. Wednesday end time 7:30 PM recorded as confirmed by Caleb Lindsey 2026-08-24 (code comment, lines 79-84) — Brad's correction: ____
- [ ] "https://www.google.com/maps/search/?api=1&query=200+Cardiff+Street+Brookside+AL+35036" — src/data/church.ts:118 — / (“Get directions” button); /visit/ (Google Maps link; Apple Maps link is built from the address in `src/pages/visit.astro:25`); every page footer (“Directions”) — Brad's correction: ____
- [ ] "Plan a visit · Brookside, Alabama" — src/pages/visit.astro:33 — /visit/ — Brad's correction: ____

## 7. Anything else

- [ ] "Brookside Church of God" — src/data/church.ts:32 — every page (name in header, footer, titles, structured data) — Brad's correction: ____
- [ ] "Preaching Christ Crucified" — src/data/church.ts:102 — every page footer (after © year); also home-page headline “Preaching Christ Crucified” (`src/pages/index.astro:88`) — Brad's correction: ____
- [ ] "A Christ-centered church family in the heart of Brookside. Come as you are. Sit wherever you like." — src/pages/index.astro:89 — / — Brad's correction: ____
- [ ] "Brookside Church of God is a small church on Cardiff Street in Brookside, Alabama. What we believe, who leads, and what happens on a Sunday." — src/pages/about.astro:61 — /about/ (page description) — Brad's correction: ____
- [ ] "Facebook, Instagram, YouTube (https://facebook.com/BrooksideChurchofGod, https://instagram.com/brooksidechurchofgod, https://www.youtube.com/@brooksidechurchofgod)" — src/data/church.ts:92 — every page footer (“Follow”); structured data — Brad's correction: ____
- [ ] "Apple Podcasts / Spotify (https://podcasts.apple.com/us/podcast/id1094539094, https://open.spotify.com/show/6KxGfsUUCpUN6xyVMPEy76)" — src/data/church.ts:105 — every page footer; / ; /watch/ — Brad's correction: ____
- [ ] "Nobody has to sit through a service wondering whether their child is welcome. Here is exactly what happens on Sunday morning." — src/pages/visit.astro:51 — /visit/ — Brad's correction: ____
- [ ] "Every Sunday, and open through both Sunday School and Morning Worship. Bring your babies." — src/pages/visit.astro:54 — /visit/ (“Nursery”) — Brad's correction: ____
- [ ] "Starts at 10:45. The children stay in the sanctuary with everyone else for worship, then are dismissed together once the singing is over." — src/pages/visit.astro:55 — /visit/ (“Kids Church”) — Brad's correction: ____
- [ ] "Every fourth Sunday the children stay in for the whole service, and the whole church is in one room." — src/pages/visit.astro:56 — /visit/ (“Corporate Sunday”) — Brad's correction: ____
- [ ] "9:45, with classes for every age: nursery, kids, youth and adults." — src/pages/visit.astro:57 — /visit/ (“Sunday School”) — Brad's correction: ____
- [ ] "Nursery is open through Sunday School and worship. Kids Church begins at 10:45 after children worship with everyone." — src/pages/index.astro:153 — / — Brad's correction: ____
- [ ] "Look for the two crosses and the blue doors." — src/pages/visit.astro:70 — /visit/ (photo caption); also / (`src/pages/index.astro:157`) — Brad's correction: ____
- [ ] "Brookside Church of God from Cardiff Street: red brick with a white gable, a bell tower, and two crosses." — src/pages/visit.astro:69 — /visit/ (building photo alt text) — Brad's correction: ____
- [ ] "Brookside Church of God on Cardiff Street: a brick building with a white gable, a bell tower, and two crosses against a blue sky." — src/layouts/SiteLayout.astro:222 — every page (share-image description; not visible on the page) — Brad's correction: ____
- [ ] "You do not need to know anybody here or have anything figured out first. Walk in whenever you are ready, and we will be glad you did." — src/pages/index.astro:149 — / — Brad's correction: ____
- [ ] "Find us at 200 Cardiff Street. Look for the two crosses and the blue doors." — src/pages/index.astro:157 — / — Brad's correction: ____
- [ ] "Thanksgiving Community Service — Sunday, November 22, 2026, 6:30 PM to 8:00 PM. This service is hosted at 2347 Brookside Coalburg Rd, Brookside, AL 35214. It is not at our church building on 200 Cardiff Street." — src/data/church.ts:133 — / and /visit/ (banner shown until 8:00 PM CT on Nov 22, 2026; the visible sentence is built in `src/components/EventNotice.astro:22`) — Brad's correction: ____
- [ ] "Sunday morning worship is still at our building as usual." — src/components/EventNotice.astro:23 — / and /visit/ (same banner) — Brad's correction: ____
- [ ] "All of the churches in Brookside gather to worship as one congregation. Pastors from around the community will share, and the worship teams from each church will lead us in song. Come be part of it." — src/data/church.ts:144 — / and /visit/ (same banner) — Brad's correction: ____
- [ ] "Special evening service" — src/components/EventNotice.astro:19 — / and /visit/ (same banner) — Brad's correction: ____
- [ ] "Last updated October 5, 2026. This website has no accounts and no sign-up forms, and we never sell or share personal information." — src/pages/privacy.astro:29 — /privacy/ (see line 20 for the date) — Brad's correction: ____
- [ ] "We use Google Analytics to understand how the site is used: which pages are visited, roughly where visitors are (city level), what kind of device they use, how they found us, and which links they tap, such as directions, the phone number or giving. It sets cookies in your browser to do this. It does not tell us who you are, and we keep this information for 14 months." — src/pages/privacy.astro:38 — /privacy/ (“Counting visits”) — Brad's correction: ____
- [ ] "When you play a sermon here, the audio streams from our podcast host, Spotify for Creators. Links to YouTube, Facebook, Instagram, Apple Podcasts and Spotify take you to those services, and their own privacy policies apply once you are there. The site itself is hosted by Cloudflare, which keeps short technical logs to protect it from attacks." — src/pages/privacy.astro:43 — /privacy/ (“Sermons and links”) — Brad's correction: ____
- [ ] "If you email or call the church, we use what you send only to answer you and to care for you. It stays with the church staff who need it." — src/pages/privacy.astro:53 — /privacy/ (“When you contact us”) — Brad's correction: ____
- [ ] "Our media team uses YouTube API Services, through a small tool of our own, to manage the Brookside Church of God YouTube channel: adding titles, descriptions, chapters, captions and thumbnails to our service videos, and checking that they published correctly." — src/pages/privacy.astro:61 — /privacy/ — Brad's correction: ____
- [ ] "The tool works only on our own channel, with permission from the Google account that owns it. It does not collect, store or share any information about people who watch our videos. What it receives from Google stays on church staff computers and is used only to manage the channel." — src/pages/privacy.astro:62 — /privacy/ — Brad's correction: ____
- [ ] "This site does not ask anyone, of any age, for personal information, and we do not knowingly collect it from children." — src/pages/privacy.astro:73 — /privacy/ (“Children”) — Brad's correction: ____
- [ ] "Email info@brooksidecog.com or call (205) 675-0703, and someone from the church will answer you." — src/pages/privacy.astro:83 — /privacy/ (“Questions”) — Brad's correction: ____
- [ ] "What this church believes and who leads it." — src/pages/404.astro:17 — 404 page (“About the church” card) — Brad's correction: ____
- [ ] "Service times, the address on Cardiff Street, and how to ask a question first." — src/pages/404.astro:16 — 404 page (“Plan a visit” card) — Brad's correction: ____
- [ ] "Nothing loads from YouTube until you press play." — src/pages/watch.astro:223 — /watch/ — Brad's correction: ____
- [ ] "Where the Sunday service streams live." — src/pages/watch.astro:300 — /watch/ (YouTube card) — Brad's correction: ____
- [ ] "The same archive, without leaving the app." — src/pages/watch.astro:299 — /watch/ (Spotify card) — Brad's correction: ____

> Note: Sermon titles, dates, lengths and speaker names are loaded from the podcast feed (`src/data/sermons.json`) and the latest livestream (`src/data/live.json`) and refresh weekly. They are not typed in the code, so they are not itemized here. 308 sermons are listed on /watch/; Brad may want to skim that archive separately.

## Not on live site

These are mentions found in the repository that do not appear on any published page. They are reported only so Brad knows they exist; none of them is a claim to verify on the site, and none has been restored or added.

- **Founding-year history.** No 1948 founding year, schoolhouse, or building-expansion history appears in any page, component, layout or data file. The only mention is a developer comment in `src/data/church.ts:13-15` and `src/pages/about.astro:12-13` saying an earlier draft asserted an "invented 1948 founding year, a borrowed schoolhouse and four building expansions" and that these were deleted. `src/data/church.ts:19-20` also says "Nobody at the church knows the year" of founding. (The only other "1948" in the repo is a sermon length, 1948 seconds, in `src/data/sermons.json:2367`.)
- **Old branches.** The repository has only the `redesign` branch (plus this working branch, which holds a single commit, the same as `redesign`). No other branches or unused components exist to search.
- **Outside listings (code comments only).** `src/data/church.ts:5-9,57,63` says the phone number (205) 674-6969 and the email brooksidecog@gmail.com appear on Facebook/Yelp (and that YellowPages and DisciplePair list the church in Graysville). These are notes about other websites, not text on this site; Brad may want to check those listings too.
- **"Cleveland, Tennessee."** `src/pages/about.astro:15-16` (comment) says Brookside is Church of God (Cleveland, Tennessee). It is not in any visible text.
