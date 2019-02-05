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
    notUpdated : 'ticket/notUpdatedTicket',
    all_raised : 'ticket/raised',
    raised_pending : 'ticket/progress',
    raised_closed : 'ticket/closed',
    issueNotUpdated : 'ticket/issue/notUpdatedTicket',
    updatereview : 'remarks/updatereview',
    approveTicket : 'remarks/approveTicket',
    country : 'ticket/country',
    review : 'remarks/review',
    status : 'ticket/status'

}


export const headstatus = [
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

  export const status = [
    {id: 1001, name: 'Yet To Start'},
    {id: 1002, name: 'Working'},
    {id: 1003, name: 'Reading Doc.'},
    {id: 1004, name: 'Integration'},
    {id: 1005, name: 'Testing'},
    {id: 1006, name: 'Hold'},
    {id: 1008, name: 'Pending From Biller'},
    {id: 1009, name: 'Re-Open'}
  
  ]

  export const priorityLevel = [
    {id: 'Imme', name: 'Immediate'},
    {id: 'High', name: 'High'},
    {id: 'Mode', name: 'Moderate'},
    {id: 'Low', name: 'Low'},
    {id: 'None', name: 'None'}
  ]

  export const problemType = [
    {id: 'FINC', name: 'Finance'},
    {id: 'HR', name: 'HR'},
    {id: 'MKTG', name: 'Marketing'}, 
    {id: 'TECH', name: 'Technical'},
    {id: 'MEDI', name: 'Media Buying'},
    {id: 'ADVR', name: 'Advertising'}, 
    {id: 'APPL', name: 'Application'},
    {id: 'CONT', name: 'Content'},
    {id: 'ANLY', name: 'Analytics'}
  ]
  export const techLeads = [
    {id: 'FINC', name: 'rathindra@globocom.info'},
    {id: 'MKTG', name: 'rv@globocom.info'},
    {id: 'TECH', name: 'pankaj@globocom.info'},
    {id: 'MEDI', name: 'rv@globocom.info'},
    {id: 'ADVR', name:'rv@globocom.info'},
    {id: 'CONT', name:'rv@globocom.info'},
    {id: 'ANLY', name:'saji@globocom.info'},
    {id: 'APPL', name: 'pankaj@globocom.info'},
    {id: 'OTHR', name:'juhi.singh@globocom.info'}
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
    {id: 1002, name: 'Existing Change'},
    {id: 1003, name: 'Integration'},
    {id: 1004, name: 'New Development'},
    {id: 1005, name: 'Issue'},
    {id: 1006, name: 'Recurring Issue'},
    {id: 1007, name: 'Optimization'},
    {id: 1008, name: 'Other'}
  ]
  
  export const fincSubProblem = [
    {id: 1001, name: 'Pay/Recv List'},
    {id: 1002, name: 'Commercial'},
    {id: 1003, name: 'Account'},
    {id: 1004, name: 'Reporting'},
    {id: 1005, name: 'Other'}
  ]

  export const appSubProblem = [
    {id: 1001, name: 'Reporting'},
    {id: 1002, name: 'New Request'},
    {id: 1003, name: 'Existing change'},
    {id: 1004, name: 'Issue Resolution'},
    {id: 1005, name: 'Other'}
  ]
  export const contSubProblem = [
    {id: 1001, name: 'New Portal'},
    {id: 1002, name: 'Portal Issue'},
    {id: 1003, name: 'New Creative'},
    {id: 1004, name: 'Reporting'},
    {id: 1005, name: 'Refreshment'},
    {id: 1006, name: 'Content'},
    {id: 1007, name: 'Issue'},
    {id: 1008, name: 'Other'}
  ]

  export const advSubProblem = [
    {id: 1001, name: 'New Request'},
    {id: 1002, name: 'Other'}
  ]

  export const markSubProblem = [
    {id: 1001, name: 'New Agreement'},
    {id: 1002, name: 'Presentaion'},
    {id: 1003, name: 'Review'},
    {id: 1004, name: 'Reporting'},
    {id: 1005, name: 'Revenue Projection'},
    {id: 1006, name: 'Other'}
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

  export const pending_url = "/ticket/pending" ;
  export const personal_url = "/ticket/personal" ;
  export const closed_url = "/ticket/closed" ;
  export const raised_closed_url = "/ticket/raised/closed" ;
  export const raised_all_url = "/ticket/raised/all" ;
  export const raised_working_url = "/ticket/raised/working" ;
  export const raised_notupdated = "/ticket/raised/notupdated";
  export const issued_notupdated = "/ticket/issued/notupdated";
  export const review_ticket_url = "/ticket/review";
