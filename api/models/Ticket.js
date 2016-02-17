/**
* Ticket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/


// TODO: CAN ENUM COME FROM EXTERNAL CONF FILES
module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    summary: {
      type: 'text'
    },
    status: {
      type: 'string'
      // *status* - string, enum - an extensible list of statuses that a ticket can have. Tickets can only have one status. Default statuses are: open, pending, closed.
    },
    ticketType: {
      type: 'string'
      // *type* - string, enum - ITIL ticket types. Defaults "Incident, Problem, Change"
    },
    urgency: {
      type: 'string'
      // *urgency* - string, enum - ITIL Urgency. How urgent is this issue? Defaults "High, Mid, Low"
    },
    impact: {
      type: 'string'
      // *impact* - string, enum - ITIL impact. How many are affected by this? Defaults "High, Mid, Low"
    },
    priority: {
      type: 'string'
      // *priority* - string, enum - Only available if added in config file. Defaults "Critical, High, Medium, Low". Off by default.
    }


  }
};
