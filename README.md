# Advanced Programming CA - Inventory & Listing System for Lego Reseller 

My CA for my advanced programming module is a web-based inventory & listing system for Brickvault, a fictional specialist reseller of retired and pre owned Lego set

The core porblem that the system addresses is the intake process, it is currently slow and repetitive. Each set requires investigation by searching piece count, minifigure count, year of release, description etc

This sytem offers a seamless solution by having a intuitive UI that allows stakeholders to input stock, while data is fetched via rebrickable API to reduce manual entry

# Stakeholders


# User Stories
## Use Case 1 - Intake Inventory (Create)
``Actor``: Manager, shop employees
``Precondition``: lego set has been received, inspected & ready to be added to the system.
``Process Flow``: 
1. User navigates to intake form
2. Enter LEGO set number (is marked on the box)
3. System calls the Rebrickable API & auto populates the set name, theme, year, piece-count
4. User reviews auto-populated fields, user enters price, condition, and any other relevanrt notes.
5. Submit form
6. Form validation
7. Set is saved to BE with status of 'in stock'
8. System runs wishlist matching process - checks if uploaded set is on any active wishlists
9. System displays wishlist matches

``Alternative Flows``:
3a - Rebrickable API is unavailble / set is not found, staff member needs to manually populate details
6a - Form validation fails, user needs to correct details & resubmit.

## Use Case 2 - View Inventory (Read)
``Actor``: Manager, shop employees 
``Precondition``: Minimum of one set needs to be present on the system
``Process Flow:``
1. User opens Inventory List view
2. System diplays list of sets, displaying name, price & status
3. User can click on individual set to view full details

## Use Case 3 - Update Inventory (Update)
``Actor:`` Manager, shop employees
``Precondition``: Set to be updated exists in the system
``Process Flow:`` 
1. User opens the set via the inventory list
2. User clicks the 'edit' button
3. Form is in 'update' mode
4. User updates relevant fields eg, price, notes etc
5. Submit form
6. Form validation
7. Updated set details are saved to BE

``Alternative Flows:``
6a - Form validation fails, user needs to correct details & resubmit.

## Use Case 4 - Delete Inventory (Delete)
``Actor``: Manager
``Precondition``: Target set exists & has 'in stock' status (sold sets cannot be deleted, they are kept for historical records)
``Process Flow``:
1. User opens the set via the inventory list
2. User clicks the 'delete button' button
3. System displays confirmation dialog to confirm deletion 
4. User confirms deletion
5. System deletes record

``Alternative Flows``:
2a - Set has 'sold' status, delete button is disabled.
4a - User cancells action

## Use Case 5 - Record a Sale
``Actor:`` Manager, shop employees
``Precondition``: Set to be updated exists in the system
``Process Flow``:
1. User opens the set via the inventory list
2. User clicks the 'edit' button
3. Form is in 'update' mode
4. User updates status field to 'sold'
5. Updated set status are saved to BE

``Alternative Flows``:
4a - Set is already marked as sold

## Use Case 6 - Manage Customers
``Actor``: Manager, shop employees
``Precondition``: NA
Main Flow (Create):
``Process Flow - Create``:
1. User navigates to the Customers section and clicks "Add Customer."
2. User enters customer name, email, and contact details.
3. System validates and saves the customer record.

``Process Flow - Read``:
1. User views the customer list or searches by name/email.

``Process Flow - Update``:
1. User edits an existing customer's details.
`
``Process Flow - Delete - Manager Only``:
1.Manager deletes a customer. System warns if the customer has active wishlist entries or sales history.

## Use Case 7 - Manage Customer Wishlists
``Actor``: Manager, shop employees (on behalf of customer)
``Precondition``: The customer record exists in the system. A customer contacts BrickVault (by phone, email, or in person) and requests to be notified when specific types of sets come in. Staff log this as a wishlist entry against the customer's record. The customer never interacts with the system directly.
``Process Flow - Create``:
1. User navigates to the customer's profile (or the Wishlists section potentially??).
2. User clicks "Add Wishlist Entry."
3. System validates and saves the entry as "Active."

``Process Flow - Read``:
1. User views all wishlist entries.

``Process Flow - Update``:
1. Add or remove inventory from customer wishlist

``Process Flow - Delete - Manager Only``:
 1. User removes a wishlist entry (e.g. customer is no longer interested).

 ## Use Case 7 - View Wishlist Matches
``Actor``: Staff / Manager
``Precondition``: At least one set is "In Stock" and at least one wishlist entry is "Active."
``Description``: Staff use this view to identify which customers should be contacted about newly available stock.
``Process Flow:``
1.User open's set details (reference use case 2)
2. System automatically checks the set's theme, condition grade, and price against all active wishlist entries.
3. If matches exist, the system displays a "Wishlist Matches" section within the detail view, showing each matching customer's name, contact details, and which criteria matched.
4. User can click a customer name to navigate to their profile (UC-06) to see their full wishlist or take further action.


``Alternative Flows``:
2a. No current matches → System displays "No matches at this time."
# Requirements


