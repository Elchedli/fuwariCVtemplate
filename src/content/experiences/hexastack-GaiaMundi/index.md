---
title: Hexastack - GaiaMundi
published: 2022-11-25T22:55:34.404Z
image: ./coverimage.jpeg
description: An analytic platform for social media platforms
tags: [professional, cartographic]
category: experiences
language: EN
---

### make a language component explaining the language made with this project (usually french)
# What is GaïaMundi ?

An **open-source tool for scientific practice in the service of decision-making.**

GaïaMundi is an open-source tool whose primary purpose is to allow for **better structuring of the processes of observation and analysis of the needs of territories.**

To achieve this, the platform enables users to:

* **Build rational geographies** and analyze territorial transformations by confronting data and knowledge from stakeholders.
* **Reconcile data from heterogeneous sources** across different registers (economic, social, urban, environmental, educational, health).
* **Construct and share diagnostics and expertise**, which directly supports needs analysis approaches.
* Furthermore, it helps to disseminate **knowledge and understanding** about territories and their dynamics.
* Ultimately, the tool is used to **scenario-plan** analyzed situations and support the transition to action.



## GitHub Repository
::github{repo="Elchedli/Gaiamundi"}





## Project explanation

* when you enter the site you will greeted by a lot of pages that you can view and navigate with them

but to use the app you need to login or to register first
in case you don't have an account you "need" to create one

:::carousel
![Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta repudiandae, non eveniet quibusdam excepturi, deleniti sint labore repellat, commodi quas obcaecati necessitatibus ullam quam ea cupiditate maiores assumenda maxime ex consectetur cum officia corrupti quisquam deserunt! Modi sint incidunt nam maiores velit provident, pariatur quae veritatis. Beatae illum nisi quam aliquam magnam, porro sequi harum rem voluptatibus perspiciatis! Repellat consectetur nisi corporis tenetur. Ab voluptate esse exercitationem fugiat blanditiis libero repudiandae, eveniet asperiores nemo dicta culpa consectetur tempora, quam obcaecati tenetur. Pariatur enim, dicta voluptas vitae voluptatibus, nihil veniam ullam aliquid soluta fugiat quod obcaecati aut atque. Recusandae pariatur tenetur, eum vitae autem libero amet veniam architecto voluptatem. Voluptas, dolorem corporis cum error laboriosam, consequatur dolore tempore debitis dicta, ab illum laborum itaque quam tempora eveniet. Fugiat dolor error itaque enim sapiente nulla eveniet nisi quam molestias dolore eius recusandae quod dignissimos, accusantium doloremque quia dicta? Ducimus veritatis voluptates obcaecati recusandae maiores, saepe sit incidunt illum ea atque voluptatem. Assumenda magni est dignissimos perspiciatis tempore distinctio quaerat. Ullam inventore quasi libero provident porro quis neque tenetur quas, voluptatum quidem, esse velit unde mollitia quam culpa magni excepturi, pariatur perferendis nesciunt magnam laborum rerum ducimus temporibus. Reiciendis repudiandae, quas ab nisi assumenda animi mollitia qui atque eum nam doloremque culpa tempore eos iure sequi laborum, id repellendus nulla. Aliquid, mollitia amet. Facere, reprehenderit, a commodi, illo iusto inventore ipsa consequuntur amet quis porro natus distinctio eveniet provident ad blanditiis adipisci officia impedit animi assumenda eligendi sunt neque? Accusamus omnis voluptatem dolores natus soluta officia cumque? Exercitationem quaerat consectetur placeat deserunt dicta in numquam nesciunt a architecto officiis voluptatibus dolorem quibusdam ipsa beatae recusandae illum est, hic amet doloribus eius suscipit fugit sequi? Rem voluptas asperiores illo corrupti magnam illum doloremque velit voluptatum omnis? Sint rerum deleniti veniam totam, enim dolorum ad!](./assets/carousel_login/1.png)
![Description for Image 2](./assets/carousel_login/2.png)
![Description for Image 3](./assets/carousel_login/3.png)
:::

---


![GaiaMundi interface screenshot](./assets/diagram_explanation.png)

### 1. Data Input

* **GeoJSON Data** is the primary input source, which is fed directly into the **Geographic Map** component.

### 2. Map Enrichment (The "Add" Phase)

This central phase involves integrating additional data and calculations with the base Geographic Map:

* **Geographic Map** data can be combined with other data sources using the **Add** process (indicated by the large loop).
* **CSV files** are converted to JSON format (**JSON Conversion**) to make them compatible for integration.
* **Indicators** are created using a **Mathematical Equation**.
* The converted CSV data and the calculated Indicators are then brought together through a **Fusion** step.

### 3. Visualization Setup

* The fused data from the central loop is used to define the **Legends**. The Legends represent the categories or values that will be visually displayed on the map.

### 4. Output Customization

* The **Legends** are subject to a **Modification** step (highlighted in orange). This step allows a user to define how the map should look.
* This Modification ultimately determines the **Map Color**, which is the final visual output displayed on the Geographic Map.
