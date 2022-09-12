import { jsPDF } from "jspdf";
import React from 'react'
import axios from 'axios'


function ReportGenerator(props) {
var Data=[]
    const handlePdf = () => {
        // Default export is a4 paper, portrait, using millimeters for units

        let data = [{ AccountID: "123", Name: "dev", Address: "Lucknow", Dues: "3251", AssignedTo: "abc", AssigneBy: "def", CompletionDate: "25-06-2021" }, { AccountID: "123", Name: "dev", Address: "Lucknow", Dues: "3251", AssignedTo: "abc", AssigneBy: "def", CompletionDate: "25-06-2021" }]

        // let data1 = [ "123","dev", "Lucknow", "3251","abc", "def",  "25-06-2021" ]
        // const createHeaders = (keys) => {
        //     var result = [];
        //     for (var i = 0;i<keys.length;i+=1){
        //         result.push({
        //             id:keys[i],
        //             name:keys[i],
        //             prompt:keys[i],
        //             width:50,
        //             align:"center",
        //             padding:0
        //         })
        //     }
        //     return result;
        // }
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [100, 50]
        });
        // var headers = createHeaders(["AccountID",
        //     "Name",
        //     "Address",
        //     "Dues",
        //     "AssignedTo",
        //     "AssignedBy",
        //     "CompletionDate"])

           
            // data.map((Data, i) => {return[
            // Data.AccountID,
            // Data.Name,
            // Data.Address,
            // Data.Dues,
            // Data.AssignedTo,
            // Data.AssigneBy,
            // Data.CompletionDate]

           
            // })

        //doc.text("AccountID  Name  Address  Dues  AssignedTo    AssignedBy  CompletionDate", 1, 1);
        
            // data.map((data, i) => {
            //     doc.setFontSize(100)
            //     doc.table(1, 1, `${data.AccountID}\t${data.Name}\t${data.Address}\t${data.Dues}\t${data.AssignedTo}\t${data.AssigneBy}\t${data.CompletionDate}` + "\n")
            // })
            // var doc=new jsPDF({putOnlyUsedFonts:true,orientation:"landscape"});
            data.map((data, i) => {
                doc.setFontSize(10)
                doc.text(1, 1, `${data.AccountID}\t${data.Name}\t${data.Address}\t${data.Dues}\t${data.AssignedTo}\t${data.AssigneBy}\t${data.CompletionDate}\n`)
            })
            // doc.table(1,1, data1,headers,{autoSize:true})
            
     
       
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

