# MEGABATTEN Configurator and Drawing Creator

This configurator allows a customer to select their desired MEGABATTEN options,
and produce a submittal drawing instantly.  

* Mechanical drawing representing selected options.
* Assembles part number.
* Compiles Bill of Materials and quantities.
* Calculates shipping weight.
* Adds dynamic dimensions.
* Creates fold sheet if required.

The project also allows the customer to request a quote for any drawing created from the configurator and produce a custom label sheet if required.

## Technology
Built with the following frameworks, libraries, and/or services.

* NodeJS
* Express 
* MongoDB
* Pug
* Cache-Pug-Templates
* Nodemailer
* [Html2Pdf](https://ekoopmans.github.io/html2pdf.js/)


## How it works
### Configurator
1. A full set of user input is gathered from the main configurator page.

2. Each choice determines the next available choice and what options exist within it.  If a previous choice is changed, subsequent choices are removed and must be remade.

3. Final choices are submitted to be stored as a database record.  The record ID is then passed to the drawing engine. 

### Drawings
1. The drawing page is loaded with the ID as a route param. 

2. The drawing engine retrieves the choice data from the database.

3. The drawing data is used to create a specific object for each page of the drawing which is then passed to the main drawing template.

4. The Pug template engine is used extensively to generate the appropriate SVG elements from mixins, which make up the entire drawing.

5. Drawings can be printed as PDF files using HTML2PDF.

### Quotes
1. The quote page collects appropriate user information and allows multiple MEGABATTENS to be added and removed from request.

2. MEGABATTEN partnumbers are gathered from the database and used to create a list to select from.

3. This list is filtered as the user types to help find the desired part number.

4. When submitted and email is sent to The Light Source Inc.

### Label Sheet
1. After a part number is selected in the same manner as the quote page, a label sheet is generated that reflects the specific options selected.

2. Once the user has filled out the form, the data is stored in the database and a print sheet is rendered.

3. The print sheet can be printed using HTML2PDF.

## Choice and BOM Data

A seperate program that runs from a server located at The Light Source headquarters is used to update data on the website database.
This data is pulled from a sql databased used to handle all parts and options for all parts inside the companies part catalog.
