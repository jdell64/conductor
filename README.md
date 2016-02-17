# conductor

a [Sails](http://sailsjs.org) application

Conductor is meant to be an open source ticketing system.

##Configuration

This application should run fine out of the box, however, you may want to make a few changes before running.

####some_config_file_path

**Ticket Prefix**

    ticket_prefix: 'COND'

A string value to prefix to the beginning of your tickets. Defaults to 'COND' which produces tickets that look like 'COND1', 'COND2', etc.

**Ticket Levels**

    urgency:on
    impact:on
    priority:off

This determines what levels you want applied to your ticket. ITIL uses urgency and impact. You may (in addition or alternatively), use priority.

**Ticket Level Lists**

    urgency_list:['High', 'Mid', 'Low']
    impact_list:['High', 'Mid', 'Low']
    priority_list:['Critical', 'High', 'Medium', 'Low']

The levels that are available for a ticket to be classified at. Changing these will not migrate old tickets to a new classification.  

**Auth**

    auth:'local'

Where is the auth service? Out of the box, local is supported.

##models

###ticket

The most basic model in the application. It contains dates of creation and modification. It has a relation to many of the other models as well.

The ID field will be serve as the ticket number.

####members
*title* - string - ticket title. Used by the front end to allow quick view of a ticket.

*summary* - text - A more in depth and current listing of what this ticket is meant to address. This is meant to be a quick summary, not an in depth report.

*status* - string, enum - an extensible list of statuses that a ticket can have. Tickets can only have one status. Default statuses are: open, pending, closed.

*ticketType* - string, enum - ITIL ticket types. Defaults "Incident, Problem, Change"

*urgency* - string, enum - ITIL Urgency. How urgent is this issue? Defaults "High, Mid, Low"

*impact* - string, enum - ITIL impact. How many are affected by this? Defaults "High, Mid, Low"

*priority* - string, enum - Only available if added in config file. Defaults "Critical, High, Medium, Low". Off by default.

####methods
*createProblemParent(ticket)* - creates a new ticket with the default values from the ticket input. The customer is changed to the technician opening the ticket, and the existing ticket is related as a child of the new ticket.

*addRelation(ticket, type)* -

*childrenCustomers()* - returns a list of customer objects of all tickets that are children of this one.

*relatives()* - returns an object of all relatives. eg:

    {'parent': {}, 'children': {}, 'siblings':{} }

...
####relations
*customer* - user - the customer this ticket is opened for.

*assignedTo* - user - the user this ticket is assigned to.

*assignedGroup* - the userGroup the ticket is assigned to.

*openedBy* - user - the technician that opened this ticket.

*children* - [ticket] - used by problem tickets. The problem ticket is the parent and the incident tickets are the children.

*parent* - ticket - used by problem tickets.

*auditLog* - [ticketChange] - a list of ticket changes.

A ticket can have 1 parent and multiple children and siblings.

###ticketChange

A text value of a change to the ticket. This is meant to track down who made changes to a ticket. By default, not viewable by a customer. These cannot be deleted.

####members

*username* - user.name - the user that made this change.
*field* - string - the attribute of the ticket that was changed.
*ticketNumber* - string - the ticket that was changed.
*oldValue* - string - the old value of the field.
*newValue* - string - the new value of the field.

####methods

*toString()* - returns a string formated thusly:

    "**username** changed **field** in ticket **ticketNumber** from **oldValue** to **newValue**"

####relations

*ticket* - ticket - the ticket this ticket change belongs to.

###user

####members
*role* - list?/string, enum - an extensible list of roles a user can have. Users can have multiple roles. Default roles are: conductor, admin, technician, auditor, customer.

*username*

*password*

*email*
*phone*

####methods

####relations
*openedTickets* - [ticket] - tickets that were opened by this user.

*reportedTickets* - [ticket] - tickets that this user was the "customer" for.

*ticketActivity* - [ticketChange] - all ticket changes this user was responsible for.

###userGroup###

A list of users or groups

###workEntry
This is meant to provide both an audit log and a work summary of a ticket. Technicians can use this to keep track of what work has been done and what work needs to be done. Auditors can keep track of how often a user was contacted for a specific issue, etc.

Work entries are not editable except by conductors(superadmins).

####members
*value* - text - The text value of the entry.
####methods
####relations
*author* - user - the user who made this entry.


###report

####members
####methods
####relations

##Default User roles
The system is designed to allow users to have multiple roles, if that is what you want to do. The highest rights wins when trying to perform an action. For example, if someone is both an auditor and a technician (not advised), they will be able to perform the functions of both roles.

If you are trying to implement a "separation of duties" practice, limit the number of roles each user can have to one.

###conductor
AKA, **super-admin**. Has full rights in the system, including the ability to edit workEntries. **It is not recommended to have a lot of these.** Hand out this role sparingly.

Only the conductor can create other conductors.

###admin
Has the ability to create new users (except for conductors).

###technician
Can create, view, and modify tickets.

###auditor
Can view tickets and reports.

###customer
Can log in and create tickets. Can view tickets that were created by them.
