# MUI Views

<!--
```yaml
date: 2020-01-03T10:01:24+0800
keys:
  - mui-views
titles:
  - MUI Views
depends:
  - https://github.com/mui-lib/mui-lib
location: https://github.com/mui-lib/mui-views
```
-->

An opinionated graphical library
depending on the [Material-UI](https://material-ui.com/),
covering topics of views/pages/routes/animations/transitions/etc,
and designed for commercialized products,
which is also an extended library of the core [mui-lib](https://github.com/mui-lib/mui-lib).


<!-- why/Motivation-->
## I. Goals

This repo will change often with various views,
as like the graphical stuff never satisfies.

Here will be a demo, which can be used for references.

<!-- ## Motivations -->

<!-- what/how -->
## II. Content

### 1. App `app`

The views serving as organic components for standalone or embedded applications.

- App Action Button
- App Languages Selector
- App Page Header
- App Page Paragraph
- App Secondary Menu

### 2. Data `data`

The data intensive views for commonly structured data,
anything for data visualization except the diagrams,
often supported with simple and plain views.

#### a. Kinds of Data

- Basic Data
	- Array / Sorted or Unsorted List / Linked List
	- Tree / Simple Tree / Treed List
- Mixed Data
	- Collection of Objects / Simple Table
	- Grouped Collection of Objects
	- Networked Objects

#### b. Available Views

All components should named starting with "View", and hence its category. 

Currently the categories are

- Card
	- A Card may often be an item of a gallery.
- Gallery
- Grid
	- A grid may be a kind of dense gallery.
- Item
	- Item for Gallery
- Table

#### c. Available View Components

Name the components following the above rule.

- View Card Statistics
- View Grid Calendar
	- A dense grid containing usually indexed entries like a calendar.
	- Good to be used for seats-table-like cases.
- View Informative Table
- View Item Statistics
- View Plain List


### 3. Diagrams `diagrams`

The views containing visual diagrams.

### 4. Docs

The views rendering kinds of text documents.

- View Markdown

### 5. Helpers


### 6. Options

The shared options empowering the available views.

### 7. Themes

The options related to coloring.

### 8. Utils

#### a. clx

An alternative utility of [clsx](https://github.com/lukeed/clsx),
to combine css class names conditionally,
mentioned from [here](https://material-ui.com/getting-started/faq/#whats-the-clsx-dependency-for).

```ts
export const clx = (...fields: (string | boolean | undefined)[]) => fields.filter(t => Boolean(t)).join(' ');
```


## III. References

- [Diagram | Definition of Diagram by Merriam-Webster](https://www.merriam-webster.com/dictionary/diagram)
