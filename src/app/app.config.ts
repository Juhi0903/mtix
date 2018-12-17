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
    ticketdetails : 'ticket/ticketdetails',
    download : 'user/download',
    upload : 'user/upload',
    emailId : 'user/emailId',
    statusorperson : 'ticket/statusorperson',
    graphData : 'ticket/graphdata',
    notUpdated : 'ticket/notUpdatedTicket'
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
    {id: 1001, name: 'Immediate'},
    {id: 1002, name: 'High'},
    {id: 1003, name: 'Moderate'},
    {id: 1004, name: 'Low'},
    {id: 1005, name: 'None'}
  ]

  export const problemType = [
    {id: 1001, name: 'Finance'},
    {id: 1002, name: 'HR'},
    {id: 1003, name: 'Marketing'},
    {id: 1004, name: 'Technical'},
    {id: 1005, name: 'Aliance'},
    {id: 1006, name: 'Media Buying'},
    {id: 1007, name: 'Advertising'}, 
    {id: 1008, name: 'Billing'},
    {id: 1008, name: 'Application'},
    {id: 1008, name: 'Content'},
    {id: 1009, name: 'Analytics'}
  ]

  export const platform = [
    {id: 1001, name: 'Matrix'},
    {id: 1002, name: 'MGlobo Pay'},
    {id: 1003, name: 'GloboBill'},
    {id: 1004, name: 'Ginger'},
    {id: 1005, name: 'CMS'},
    {id: 1006, name: 'App'},
    {id: 1007, name: 'Mtix'},
    {id: 1008, name: 'Other'}

  ]

  export const techSubProblem = [
    {id: 1001, name: 'Support'},
    {id: 1002, name: 'Internal'},
    {id: 1003, name: 'Integration'},
    {id: 1004, name: 'Other'},
  ]

  export interface detailsArray {
    addedOn : string,
    remarks: string,
    assignedTo : string, 
    status : string,
    type : string,
    ticketId : string,
    stage : string,
    subStage : string,
    id : string,
    filename : string,
    filepath : string,
  }

  export interface email{
    email : string
  }

  export interface statusCount{
    status : string
    count : number
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
