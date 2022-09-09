import { jsPDF } from "jspdf";
import React from 'react'
import axios from 'axios'


function ReportGenerator(props) {

    const handlePdf = () => {
        // Default export is a4 paper, portrait, using millimeters for units

        let data=[{"Account ID":"123","Name":"dev","Address":"Lucknow","Dues":"3251","AssignedTo":"abc","AssigneBy":"def","CompletionDate":"25-06-2021"},{"Account ID":"123","Name":"dev","Address":"Lucknow","Dues":"3251","AssignedTo":"abc","AssigneBy":"def","CompletionDate":"25-06-2021"}]

        
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
          });
       
          
         //doc.text("AccountID  Name  Address  Dues  AssignedTo    AssignedBy  CompletionDate", 1, 1);
         {data.map((data, i) => {
            doc.text(`${data.AccountID}${data.Name}${data.Address}${data.Dues}${data.AssignedTo}${data.AssigneBy}${data.CompletionDate}`,1,1)
          })}
          doc.save("two-by-four.pdf");
       
    }



    return (
        <>
            {!localStorage.getItem('role') ? <></> : <><h3>{localStorage.getItem('role')} Report Generation</h3><hr />
                <table className="table table-striped table-light text-left">
                    <tbody>
                        <tr>
                            <td>User Id</td>
                            {/* <td>{this.state.userId}</td> */}
                        </tr>
                        <tr>
                            <td>First Name</td>
                            {/* <td>{this.state.firstName}</td> */}
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            {/* <td>{this.state.lastName}</td> */}
                        </tr>
                        <tr>
                            <td>Role</td>
                            {/* <td>{this.state.role}</td> */}
                        </tr>
                        <tr>
                            <td>PDF</td>
                            <td><button type="button" className="btn btn-primary" onClick={handlePdf}>Pdf Generate</button></td>
                            {/* <td>{this.state.role}</td> */}
                        </tr>
                    </tbody>
                </table></>}
        </>
    )
}
    

export default ReportGenerator

