import {environment }  from '../environments/environment'

export const urls = {
    BASE_URL : environment.BASE_URL,
    allUsers : 'user/allusers',
    saveTicket : 'ticket',
    ticket : 'ticket',
    updatestatus : 'ticket/updatestatus',
    updatepriority : 'ticket/updatepriority',
    updateassignto : 'ticket/updateassignto',
    closeTicket : 'ticket/complete',
    pendingTicket : 'ticket/pending',
    personalTicket : 'ticket/personal',
    remarks : 'remarks',
    auth : 'user/',
    tickets : 'ticket/ticket',
    dashboard :'dashboard',
    stage : 'stage',
    subStage : 'stage/subStage',
    childTicket : 'childticket',
    ticketdetails : 'ticket/ticketdetails'
}


export const status = [
    {id: 1001, name: 'Yet To Start'},
    {id: 1002, name: 'Working'},
    {id: 1003, name: 'Reading Doc.'},
    {id: 1004, name: 'Integration'},
    {id: 1005, name: 'Testing'},
    {id: 1006, name: 'Hold'},
    {id: 1007, name: 'Closed'},
    {id: 1008, name: 'Pending From Biller'},
    {id: 1009, name: 'Re-Open'}
  
  ]

  export const priorityLevel = [
    {id: 1001, name: 'High'},
    {id: 1002, name: 'Medium'},
    {id: 1003, name: 'Low'}
  ]

  export const problemType = [
    {id: 1001, name: 'Support'},
    {id: 1002, name: 'Integration'},
    {id: 1003, name: 'Internal'},
    {id: 1004, name: 'Other'}
  ]

  export const platform = [
    {id: 1001, name: 'Matrix'},
    {id: 1002, name: 'MGlobo Pay'},
    {id: 1003, name: 'GloboBill'},
    {id: 1004, name: 'Ginger'},
    {id: 1005, name: 'CMS'},
    {id: 1006, name: 'Other'}

  ]

  export interface detailsArray {
    addedOn : string,
    remarks: string,
    assignedTo : string, 
    status : string,
    type : string,
    ticketId : string,
  }

  export const details = [
    {id: 1001, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag
    We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag.`},
    {id: 1002, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag.
    We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag. `},
    {id: 1003, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag.
    We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag.  `},
    {id: 1004, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag.
    We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag. `},
    // {id: 1005, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag.
    // We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag.`},
    // {id: 1006, name: `We can make the text bold using the <b> tag. The tag uses both opening and closing tag. The text that needs to be made bold must be within <b> and </b> tag.
    // We can also use the <strong> tag to make the text strong, with added semantic importance. It also opens with <strong> and ends with </strong> tag.`},

  ]

  export const pending_url = "/ticket/pending" ;
  export const personal_url = "/ticket/personal" ;
  export const closed_url = "/ticket/closed" ;
