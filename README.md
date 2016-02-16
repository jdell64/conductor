# conductor

a [Sails](http://sailsjs.org) application

Conductor is meant to be an open source ticketing system.

##models

###ticket

The most basic model in the application. It contains dates of creation and modification. It has a relation to many of the other models as well.

####members
**title** - string - ticket title. Used by the front end to allow quick view of a ticket.

**summary** - text - A more in depth and current listing of what this ticket is meant to address. This is meant to be a quick summary, not an in depth report.

####methods
####relations

###user

####members
**role** - string, enum - an extensible list of roles a user can have. Default roles are: conductor, admin, technician, auditor, customer.

####methods
####relations


###workEntry
This is meant to provide both an audit log and a work summary of a ticket. Technicians can use this to keep track of what work has been done and what work needs to be done. Auditors can keep track of how often a user was contacted for a specific issue, etc.

Work entries are not editable except by conductors(superadmins).

####members
**value** - text - The text value of the entry.
####methods
####relations
**author** - user - the user who made this entry.


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
